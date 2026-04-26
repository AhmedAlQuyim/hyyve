import { pgTable, text, jsonb, timestamp, uuid, boolean } from "drizzle-orm/pg-core";

export const siteContent = pgTable("site_content", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const briefs = pgTable("briefs", {
  id: uuid("id").primaryKey().defaultRandom(),
  payload: jsonb("payload").notNull(),
  briefOutput: jsonb("brief_output"),
  email: text("email"),
  name: text("name"),
  company: text("company"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  emailSent: boolean("email_sent").notNull().default(false),
  emailError: text("email_error"),
});

export type SiteContentRow = typeof siteContent.$inferSelect;
export type BriefRow = typeof briefs.$inferSelect;
