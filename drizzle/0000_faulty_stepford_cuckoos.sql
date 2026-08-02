CREATE TABLE "analytics_events" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"path" text NOT NULL,
	"slug" text,
	"tier" text,
	"referrer_host" text,
	"country" text,
	"device" text,
	"session_hash" text,
	"meta" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "components" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"dependencies" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"cli" text,
	"fullscreen" boolean DEFAULT false NOT NULL,
	"is_new" boolean DEFAULT false NOT NULL,
	"nav_section_name" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"demo_source_path" text,
	"github_files" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"props" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"deploy_status" text DEFAULT 'draft' NOT NULL,
	"deploy_commit_sha" text,
	"deploy_error" text,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "nav_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"section_id" uuid NOT NULL,
	"name" text NOT NULL,
	"href" text NOT NULL,
	"is_new" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "nav_sections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"key" text PRIMARY KEY NOT NULL,
	"value" jsonb,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "templates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"tier" text DEFAULT 'free' NOT NULL,
	"stack" text DEFAULT 'html' NOT NULL,
	"tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"thumbnail" text NOT NULL,
	"preview_type" text DEFAULT 'live' NOT NULL,
	"preview_url" text,
	"preview_video_url" text,
	"preview_root" text,
	"fullscreen_preview" boolean DEFAULT false NOT NULL,
	"zip_blob_url" text,
	"zip_file_name" text,
	"zip_size_bytes" integer,
	"coming_soon" boolean DEFAULT false NOT NULL,
	"is_new" boolean DEFAULT false NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "nav_items" ADD CONSTRAINT "nav_items_section_id_nav_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."nav_sections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "analytics_created_idx" ON "analytics_events" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "analytics_type_created_idx" ON "analytics_events" USING btree ("type","created_at");--> statement-breakpoint
CREATE INDEX "analytics_slug_idx" ON "analytics_events" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "components_slug_idx" ON "components" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "nav_items_section_idx" ON "nav_items" USING btree ("section_id","sort_order");--> statement-breakpoint
CREATE INDEX "nav_sections_sort_idx" ON "nav_sections" USING btree ("sort_order");--> statement-breakpoint
CREATE UNIQUE INDEX "templates_slug_idx" ON "templates" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "templates_sort_idx" ON "templates" USING btree ("sort_order");