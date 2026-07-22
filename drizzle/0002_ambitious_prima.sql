CREATE TABLE `events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(256) NOT NULL,
	`subtitle` varchar(512),
	`date` varchar(64) NOT NULL,
	`time` varchar(64),
	`description` text,
	`price` varchar(128),
	`ticketUrl` text,
	`imageUrl` text,
	`imageAlt` varchar(256),
	`badge` varchar(128),
	`sortOrder` int NOT NULL DEFAULT 0,
	`isActive` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `menus` (
	`id` int AUTO_INCREMENT NOT NULL,
	`type` enum('speisekarte','weinkarte','getraenkekarte') NOT NULL,
	`label` varchar(128) NOT NULL,
	`fileUrl` text NOT NULL,
	`isActive` int NOT NULL DEFAULT 1,
	`uploadedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `menus_id` PRIMARY KEY(`id`)
);
