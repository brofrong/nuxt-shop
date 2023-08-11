CREATE TABLE `images` (
	`id` integer PRIMARY KEY NOT NULL,
	`product_id` integer NOT NULL,
	`url` text NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`price` real NOT NULL,
	`discountPercentage` real,
	`rating` real,
	`stock` integer NOT NULL,
	`brand` text NOT NULL,
	`category` text NOT NULL,
	`thumbnail` text NOT NULL
);
