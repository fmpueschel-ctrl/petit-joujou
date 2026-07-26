CREATE TABLE `newsletter_subscribers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`signupAt` timestamp NOT NULL DEFAULT (now()),
	`confirmAt` timestamp,
	`ipSignup` varchar(45),
	`ipConfirm` varchar(45),
	`source` varchar(128),
	`token` varchar(64) NOT NULL,
	`status` enum('pending','confirmed','unsubscribed') NOT NULL DEFAULT 'pending',
	CONSTRAINT `newsletter_subscribers_id` PRIMARY KEY(`id`),
	CONSTRAINT `newsletter_subscribers_email_unique` UNIQUE(`email`)
);
