CREATE TABLE `lead_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`status` text DEFAULT 'quick' NOT NULL,
	`audience` text NOT NULL,
	`name` text DEFAULT '' NOT NULL,
	`contact` text NOT NULL,
	`identity` text NOT NULL,
	`primary_goal` text NOT NULL,
	`current_storage` text NOT NULL,
	`team_need` text NOT NULL,
	`source_url` text DEFAULT '' NOT NULL,
	`consent_at` text NOT NULL,
	`deep_answers` text,
	`result_label` text,
	`result_maturity` text,
	`result_service` text
);
