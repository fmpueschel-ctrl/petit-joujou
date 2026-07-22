import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// TODO: Add your tables here

export const reservations = mysqlTable("reservations", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 32 }),
  date: varchar("date", { length: 16 }).notNull(), // YYYY-MM-DD
  time: varchar("time", { length: 8 }).notNull(),  // HH:MM
  guests: int("guests").notNull(),
  location: mysqlEnum("location", ["scheune", "garten"]).notNull().default("scheune"),
  message: text("message"),
  status: mysqlEnum("status", ["pending", "confirmed", "cancelled"]).notNull().default("pending"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Reservation = typeof reservations.$inferSelect;
export type InsertReservation = typeof reservations.$inferInsert;

// ── Events ────────────────────────────────────────────────────
export const events = mysqlTable("events", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  subtitle: varchar("subtitle", { length: 512 }),
  date: varchar("date", { length: 64 }).notNull(), // z.B. "Sa, 08. August" oder "11.06. · 16.07. · 13.08.2026"
  time: varchar("time", { length: 64 }), // z.B. "16:00–22:00 Uhr"
  description: text("description"),
  price: varchar("price", { length: 128 }), // z.B. "59 € p.P." oder "Eintritt frei"
  ticketUrl: text("ticketUrl"),
  imageUrl: text("imageUrl"), // Pfad zum hochgeladenen Bild
  imageAlt: varchar("imageAlt", { length: 256 }),
  badge: varchar("badge", { length: 128 }), // z.B. "Joujou After Work · ab 18:00 Uhr"
  sortOrder: int("sortOrder").notNull().default(0),
  isActive: int("isActive").notNull().default(1), // 1 = sichtbar, 0 = versteckt
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Event = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;

// ── Karten (Speisekarte, Weinkarte, etc.) ─────────────────────
export const menus = mysqlTable("menus", {
  id: int("id").autoincrement().primaryKey(),
  type: mysqlEnum("type", ["speisekarte", "weinkarte", "getraenkekarte"]).notNull(),
  label: varchar("label", { length: 128 }).notNull(), // Anzeigename z.B. "Speisekarte Sommer 2026"
  fileUrl: text("fileUrl").notNull(), // S3-URL zum PDF
  isActive: int("isActive").notNull().default(1), // 1 = aktuelle Version
  uploadedAt: timestamp("uploadedAt").defaultNow().notNull(),
});

export type Menu = typeof menus.$inferSelect;
export type InsertMenu = typeof menus.$inferInsert;