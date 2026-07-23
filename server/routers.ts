import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { sendMail } from "./_core/mailer";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { reservations, events, menus } from "../drizzle/schema";
import { eq, asc, desc } from "drizzle-orm";
import { storagePut } from "./storage";
import { commerceRouter } from "./routers/commerce";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  commerce: commerceRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  reservation: router({
    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          email: z.string().email(),
          phone: z.string().optional(),
          date: z.string().min(1),
          time: z.string().min(1),
          guests: z.number().int().min(2).max(60),
          location: z.enum(["scheune", "garten"]),
          message: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        await db.insert(reservations).values({
          name: input.name,
          email: input.email,
          phone: input.phone,
          date: input.date,
          time: input.time,
          guests: input.guests,
          location: input.location,
          message: input.message,
          status: "pending",
        });

        const locationLabel = input.location === "scheune" ? "Scheune" : "Garten";
        await notifyOwner({
          title: `Neue Tischreservierung — ${input.name}`,
          content: [
            `Name: ${input.name}`,
            `E-Mail: ${input.email}`,
            input.phone ? `Telefon: ${input.phone}` : null,
            `Datum: ${input.date} um ${input.time} Uhr`,
            `Personen: ${input.guests}`,
            `Bereich: ${locationLabel}`,
            input.message ? `Nachricht: ${input.message}` : null,
          ].filter(Boolean).join("\n"),
        });

        return { success: true };
      }),
  }),

  // ── Events (public read + admin CRUD) ──────────────────────
  events: router({
    // Public: alle aktiven Events für die Startseite
    list: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(events).where(eq(events.isActive, 1)).orderBy(asc(events.sortOrder));
    }),

    // Admin: alle Events (inkl. inaktive)
    listAll: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(events).orderBy(asc(events.sortOrder));
    }),

    // Admin: Event erstellen
    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        subtitle: z.string().optional(),
        date: z.string().min(1),
        time: z.string().optional(),
        description: z.string().optional(),
        price: z.string().optional(),
        ticketUrl: z.string().optional(),
        imageUrl: z.string().optional(),
        imageAlt: z.string().optional(),
        badge: z.string().optional(),
        sortOrder: z.number().int().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        await db.insert(events).values({
          title: input.title,
          subtitle: input.subtitle ?? null,
          date: input.date,
          time: input.time ?? null,
          description: input.description ?? null,
          price: input.price ?? null,
          ticketUrl: input.ticketUrl ?? null,
          imageUrl: input.imageUrl ?? null,
          imageAlt: input.imageAlt ?? null,
          badge: input.badge ?? null,
          sortOrder: input.sortOrder ?? 0,
          isActive: 1,
        });
        return { success: true };
      }),

    // Admin: Event aktualisieren
    update: adminProcedure
      .input(z.object({
        id: z.number().int(),
        title: z.string().min(1).optional(),
        subtitle: z.string().nullable().optional(),
        date: z.string().min(1).optional(),
        time: z.string().nullable().optional(),
        description: z.string().nullable().optional(),
        price: z.string().nullable().optional(),
        ticketUrl: z.string().nullable().optional(),
        imageUrl: z.string().nullable().optional(),
        imageAlt: z.string().nullable().optional(),
        badge: z.string().nullable().optional(),
        sortOrder: z.number().int().optional(),
        isActive: z.number().int().min(0).max(1).optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        const { id, ...data } = input;
        const updateSet: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(data)) {
          if (value !== undefined) updateSet[key] = value;
        }
        if (Object.keys(updateSet).length === 0) return { success: true };
        await db.update(events).set(updateSet).where(eq(events.id, id));
        return { success: true };
      }),

    // Admin: Event löschen
    delete: adminProcedure
      .input(z.object({ id: z.number().int() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        await db.delete(events).where(eq(events.id, input.id));
        return { success: true };
      }),
  }),

  // ── Menus/Karten (public read + admin CRUD) ────────────────
  menus: router({
    // Public: aktive Karten
    list: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(menus).where(eq(menus.isActive, 1)).orderBy(desc(menus.uploadedAt));
    }),

    // Admin: alle Karten
    listAll: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(menus).orderBy(desc(menus.uploadedAt));
    }),

    // Admin: Karte hochladen (Base64-encoded PDF)
    upload: adminProcedure
      .input(z.object({
        type: z.enum(["speisekarte", "weinkarte", "getraenkekarte"]),
        label: z.string().min(1),
        fileBase64: z.string().min(1),
        fileName: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        // Upload zu S3
        const buffer = Buffer.from(input.fileBase64, "base64");
        const key = `menus/${input.type}/${input.fileName}`;
        const { url } = await storagePut(key, buffer, "application/pdf");

        // Alte aktive Karten dieses Typs deaktivieren
        await db.update(menus).set({ isActive: 0 }).where(eq(menus.type, input.type));

        // Neue Karte einfügen
        await db.insert(menus).values({
          type: input.type,
          label: input.label,
          fileUrl: url,
          isActive: 1,
        });

        return { success: true, url };
      }),

    // Admin: Karte löschen
    delete: adminProcedure
      .input(z.object({ id: z.number().int() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        await db.delete(menus).where(eq(menus.id, input.id));
        return { success: true };
      }),
  }),

  // ── Bild-Upload für Events (Admin) ─────────────────────────
  upload: router({
    eventImage: adminProcedure
      .input(z.object({
        fileBase64: z.string().min(1),
        fileName: z.string().min(1),
        contentType: z.string().default("image/jpeg"),
      }))
      .mutation(async ({ input }) => {
        const buffer = Buffer.from(input.fileBase64, "base64");
        const key = `events/${input.fileName}`;
        const { url } = await storagePut(key, buffer, input.contentType);
        return { url };
      }),
  }),

  gesellschaft: router({
    anfrage: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          email: z.string().email(),
          phone: z.string().optional(),
          anlass: z.string().optional(),
          gaeste: z.string().optional(),
          datum: z.string().optional(),
          nachricht: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const lines = [
          `Name: ${input.name}`,
          `E-Mail: ${input.email}`,
          input.phone ? `Telefon: ${input.phone}` : null,
          input.anlass ? `Anlass: ${input.anlass}` : null,
          input.gaeste ? `Gäste: ${input.gaeste}` : null,
          input.datum ? `Wunschdatum: ${input.datum}` : null,
          input.nachricht ? `\nNachricht:\n${input.nachricht}` : null,
        ].filter(Boolean);

        const mailBody = lines.join("\n");

        // Manus-interne Benachrichtigung
        await notifyOwner({
          title: `🥂 Neue Gesellschaft-Anfrage — ${input.name}`,
          content: mailBody,
        });

        // E-Mail direkt an hallo@joujou-pfalz.de
        await sendMail({
          to: "hallo@joujou-pfalz.de",
          subject: `Neue Anfrage von ${input.name}${input.anlass ? ` — ${input.anlass}` : ""}`,
          text: `Neue Gesellschaft-Anfrage über die Website:\n\n${mailBody}\n\n---\nGesendet von petit-joujou.de`,
        });

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
