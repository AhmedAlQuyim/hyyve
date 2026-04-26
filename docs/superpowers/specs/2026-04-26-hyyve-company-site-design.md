# Hyyve Company Site — Design Spec

**Date:** 2026-04-26
**Source:** `hyyve-design/hyyve/` handoff bundle from Claude Design

## Goal

Implement the Hyyve company website (4 pages) with a small backend for content management and an agent-assisted contact wizard. Match the prototype's visual design pixel-perfectly, but rebuild it in production-grade Next.js rather than the prototype's CDN-React structure.

## Stack

- **Framework:** Next.js 15 (App Router) + TypeScript + React 19
- **Styling:** Tailwind CSS v4 with prototype design tokens (`--ink`, `--paper`, `--amber`, Fraunces / Inter Tight / JetBrains Mono) defined as CSS variables in `globals.css`
- **Database:** Postgres (Railway-managed) via Drizzle ORM + `drizzle-kit` migrations
- **Email:** Resend (transactional)
- **LLM:** OpenRouter via the `openai` npm package pointed at `https://openrouter.ai/api/v1`. Model is configurable via env var (default `anthropic/claude-sonnet-4.6`).
- **Auth (admin):** Single shared password from env var. Custom signed-cookie session — no NextAuth needed.
- **Hosting:** Railway (Next.js service + Postgres plugin)
- **Package manager:** pnpm
- **Testing:** Vitest + Testing Library (unit/integration), Playwright (E2E happy paths)

## Pages in scope

Replicate from the prototype:

| Page | Prototype source | Notes |
|---|---|---|
| Homepage | `Hyyve Homepage.html` + `homepage/home-c.jsx` | Direction C ("Conversational") only |
| Solutions | `Hyyve Solutions.html` + `homepage/solutions.jsx` | |
| About | `Hyyve About.html` + `homepage/about.jsx` | |
| Admin | `Hyyve Admin.html` + `homepage/admin.jsx` + `homepage/content-store.jsx` | Login-gated CMS |

**Not shipped:** the 3 alternative homepage directions (A/B/C exploration), `tweaks-panel.jsx` (design-tool only), `Hyyve Homepage Directions.html`. These are kept for reference only and excluded from the build.

## Route & file structure

```
app/
  layout.tsx                  # global fonts, CSS tokens, <html>/<body>
  page.tsx                    # Homepage (Direction C)
  solutions/page.tsx
  about/page.tsx
  admin/
    login/page.tsx            # password form
    page.tsx                  # CMS — replicates prototype's admin.jsx exactly
  api/
    brief/route.ts            # POST: brief wizard submission → OpenRouter → DB + Resend email
    admin/
      login/route.ts          # POST: check password, set session cookie
      logout/route.ts         # POST: clear cookie
      content/route.ts        # GET/PUT: read/write site content (admin-only)
middleware.ts                 # gates /admin/* (except /admin/login)
components/
  Nav.tsx, Footer.tsx, BriefWizard.tsx, ...
  home/  solutions/  about/  admin/
lib/
  db.ts                       # drizzle client
  schema.ts                   # drizzle tables
  session.ts                  # cookie sign/verify (HMAC)
  email.ts                    # Resend wrapper
  llm.ts                      # OpenRouter client + brief generation
  content.ts                  # getContent() / updateContent()
  rate-limit.ts               # in-memory IP token bucket
db/
  seed.ts                     # populates site_content from content-store.jsx defaults
```

Public pages read site content from the DB at request time. Admin edits the same rows. Brief wizard submits to `/api/brief`.

## Data model

```ts
// site_content — key/value singleton store the admin CMS edits
site_content (
  key         text primary key,        // e.g. "home.hero.title", "about.story"
  value       jsonb not null,          // string | string[] | structured object
  updated_at  timestamptz default now()
)

// briefs — submissions from the Brief Wizard
briefs (
  id            uuid primary key default gen_random_uuid(),
  payload       jsonb not null,        // full wizard answers (5 keys: process, tools, team, outcome, contact)
  brief_output  jsonb,                 // generated scoped brief (nullable if generation failed)
  email         text,                  // extracted from contact answer for quick scanning
  name          text,
  company       text,
  created_at    timestamptz default now(),
  email_sent    boolean default false,
  email_error   text                   // populated if Resend failed
)
```

Exact `site_content` keys are derived by reading `homepage/content-store.jsx` end-to-end during implementation and seeded via `db/seed.ts` on first deploy.

## Brief Wizard flow

The wizard is a full-screen chat-style modal with 5 fixed scripted questions, then one Claude call at the end to synthesize a structured project brief.

**Client (replicated from `brief-wizard.jsx`):**
1. Modal opens. Agent asks Q1 (process). User types answer. Brief "thinking" indicator (700ms timeout) → agent asks Q2. Repeat through Q5.
2. Questions, in order: `process`, `tools`, `team`, `outcome`, `contact` — exact prompts from `QUESTIONS` array in the prototype.
3. After Q5 submit, client POSTs `{ answers: {...}, honeypot: "" }` to `/api/brief`.
4. While server processes: chat shows agent message "Thank you. Drafting your brief now…"
5. On 200: render `BriefResultCard` with the returned brief (download-as-`.txt` + "Book partner call" CTA — the latter just `alert()`s for now, matching the prototype).
6. On error: render the prototype's fallback message ("Hmm — I had trouble drafting the brief just now. Could you email hello@hyyve.co…").

**Server (`POST /api/brief`):**
1. Validate payload with Zod. Reject if honeypot field present. Apply rate limit (10/hr/IP).
2. Insert raw answers into `briefs` (returns `id`). **This is the durability point.**
3. Call OpenRouter via the `openai` SDK with the prototype's exact `SYSTEM_PROMPT` + formatted user payload. Use `OPENROUTER_MODEL` from env. Request JSON-shaped output.
4. Parse response: try `JSON.parse` directly, fall back to extracting the first `{...}` block (matching the prototype's regex fallback).
5. On parse success: update row with `brief_output`, fire Resend email containing both raw inputs and generated brief, set `email_sent`/`email_error` based on result. Return `{ ok: true, brief }`.
6. On parse/LLM failure: still fire Resend email with raw inputs (so the team can follow up manually), return `{ ok: false }` so client shows fallback.
7. On DB failure (rare): return 500.

**Spam:** hidden honeypot field (`website_url`) on the form. No CAPTCHA in v1.
**Rate limit:** in-memory IP token bucket — Railway is single-instance so this works. Swap for Redis if scaled horizontally later.

## Admin auth flow

- `GET /admin/*` → middleware checks `hyyve_admin` cookie. If missing/invalid → redirect to `/admin/login`.
- Cookie format: HMAC(secret, `${expiresAt}`)`.${expiresAt}`. httpOnly + Secure + SameSite=Lax + 7-day expiry.
- `POST /api/admin/login` → constant-time compare against `ADMIN_PASSWORD`, set cookie.
- `POST /api/admin/logout` → clear cookie.
- All `/api/admin/*` mutating routes re-verify the cookie (defense in depth).

## Responsive strategy

Three breakpoints: mobile ≤640px, tablet 641–1023px, desktop ≥1024px.

- Above 1024px: design ratios from the 1440 frame scale fluidly.
- Below 1024px: nav collapses to hamburger drawer; hero typography drops in size; multi-column grids stack; Solutions cards 3-up → 2-up → 1-up; admin table → card list on mobile (admin is desktop-first); brief wizard goes full-screen.

Visual language (paper background, amber accents, generous whitespace, Fraunces display) preserved at every size.

## Environment variables

```
DATABASE_URL=                 # Railway Postgres connection string
OPENROUTER_API_KEY=
OPENROUTER_MODEL=anthropic/claude-sonnet-4.6
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1   # optional override
RESEND_API_KEY=
BRIEF_NOTIFICATION_EMAIL=     # where brief submissions are sent
ADMIN_PASSWORD=               # shared password for admin access
ADMIN_SESSION_SECRET=         # HMAC key for session cookie
```

A committed `.env.example` lists all vars with placeholder values.

## Testing

- **Unit/integration (Vitest):** route handlers (`/api/brief`, `/api/admin/*`), `lib/llm.ts` brief parsing (with mocked OpenRouter), `lib/session.ts` HMAC round-trip.
- **E2E (Playwright):** homepage renders + key sections present; brief wizard happy path (mock `/api/brief`); admin login → edit content → save → public page reflects change.
- A test Postgres instance via Docker Compose for integration tests.

## Out of scope (v1)

- Mobile-first redesign (we adapt the desktop design responsively, not redesign for mobile)
- Calendar booking integration on "Book partner call" — stays as `alert()` placeholder per prototype
- Multi-admin user accounts — single shared password only
- Brief submissions inbox in admin UI — DB record + email is enough for v1
- CAPTCHA, Redis-backed rate limiting
- Visual regression testing
- Internationalization
