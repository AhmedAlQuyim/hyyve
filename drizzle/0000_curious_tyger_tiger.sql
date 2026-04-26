CREATE TABLE "briefs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"payload" jsonb NOT NULL,
	"brief_output" jsonb,
	"email" text,
	"name" text,
	"company" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"email_sent" boolean DEFAULT false NOT NULL,
	"email_error" text
);
--> statement-breakpoint
CREATE TABLE "site_content" (
	"key" text PRIMARY KEY NOT NULL,
	"value" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
