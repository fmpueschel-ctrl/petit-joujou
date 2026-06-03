import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
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

        await notifyOwner({
          title: `🥂 Neue Gesellschaft-Anfrage — ${input.name}`,
          content: lines.join("\n"),
        });

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
