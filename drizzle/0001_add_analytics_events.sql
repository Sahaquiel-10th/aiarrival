CREATE TABLE `analytics_events` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`visitor_id` text NOT NULL,
	`session_id` text NOT NULL,
	`event_type` text NOT NULL,
	`pathname` text NOT NULL,
	`title` text DEFAULT '' NOT NULL,
	`referrer` text DEFAULT '' NOT NULL,
	`source` text DEFAULT '' NOT NULL,
	`campaign` text DEFAULT '' NOT NULL,
	`content` text DEFAULT '' NOT NULL,
	`audience` text DEFAULT '' NOT NULL,
	`device` text DEFAULT '' NOT NULL,
	`label` text DEFAULT '' NOT NULL,
	`target` text DEFAULT '' NOT NULL,
	`duration_ms` text DEFAULT '0' NOT NULL
);
CREATE INDEX `idx_analytics_events_created_at` ON `analytics_events` (`created_at`);
CREATE INDEX `idx_analytics_events_visitor_id` ON `analytics_events` (`visitor_id`);
CREATE INDEX `idx_analytics_events_pathname` ON `analytics_events` (`pathname`);
