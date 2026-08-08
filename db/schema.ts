import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const leadRequests = sqliteTable("lead_requests", {
  id: text("id").primaryKey(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  status: text("status").notNull().default("quick"),
  audience: text("audience").notNull(),
  name: text("name").notNull().default(""),
  contact: text("contact").notNull(),
  identity: text("identity").notNull(),
  primaryGoal: text("primary_goal").notNull(),
  currentStorage: text("current_storage").notNull(),
  teamNeed: text("team_need").notNull(),
  sourceUrl: text("source_url").notNull().default(""),
  consentAt: text("consent_at").notNull(),
  deepAnswers: text("deep_answers"),
  resultLabel: text("result_label"),
  resultMaturity: text("result_maturity"),
  resultService: text("result_service"),
});
