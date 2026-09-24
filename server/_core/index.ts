import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // 4.2: Redirect non-www to www in production
  if (process.env.NODE_ENV === "production") {
    app.use((req, res, next) => {
      const host = req.headers.host || "";
      if (host === "petit-joujou.de") {
        return res.redirect(301, `https://www.petit-joujou.de${req.originalUrl}`);
      }
      next();
    });
  }

  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  registerStorageProxy(app);
  registerOAuthRoutes(app);

  // Newsletter confirm endpoint (GET link from email)
  app.get("/api/newsletter/confirm", async (req, res) => {
    const token = req.query.token as string;
    if (!token) return res.redirect("/?newsletter=invalid");
    try {
      const { getDb } = await import("../db");
      const { newsletterSubscribers } = await import("../../drizzle/schema");
      const { eq } = await import("drizzle-orm");
      const db = await getDb();
      if (!db) return res.redirect("/?newsletter=error");
      const [sub] = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.token, token)).limit(1);
      if (!sub) return res.redirect("/?newsletter=invalid");
      if (sub.status !== "confirmed") {
        const ip = (req.headers["x-forwarded-for"]?.toString().split(",")[0]) || req.socket.remoteAddress || "";
        await db.update(newsletterSubscribers)
          .set({ status: "confirmed", confirmAt: new Date(), ipConfirm: ip })
          .where(eq(newsletterSubscribers.id, sub.id));
      }
      return res.redirect("/?newsletter=confirmed");
    } catch {
      return res.redirect("/?newsletter=error");
    }
  });

  // Dynamic sitemap.xml with real Shopify product handles
  app.get("/sitemap.xml", async (_req, res) => {
    try {
      const { listProducts } = await import("./shopify");
      const products = await listProducts({ first: 50 });
      const today = new Date().toISOString().split("T")[0];
      const staticPages = [
        { loc: "/", priority: "1.0", freq: "weekly" },
        { loc: "/shop", priority: "0.9", freq: "weekly" },
        { loc: "/flaschenfreunde", priority: "0.8", freq: "weekly" },
        { loc: "/versand", priority: "0.4", freq: "monthly" },
        { loc: "/impressum", priority: "0.3", freq: "monthly" },
        { loc: "/datenschutz", priority: "0.3", freq: "monthly" },
        { loc: "/agb", priority: "0.3", freq: "monthly" },
        { loc: "/widerruf", priority: "0.3", freq: "monthly" },
      ];
      const urls = staticPages.map(p => `  <url>\n    <loc>https://www.petit-joujou.de${p.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.freq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`);
      for (const product of products) {
        urls.push(`  <url>\n    <loc>https://www.petit-joujou.de/shop/${product.handle}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`);
      }
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
      res.setHeader("Content-Type", "application/xml");
      res.send(xml);
    } catch (e) {
      console.error("Sitemap generation failed:", e);
      res.status(500).send("Sitemap generation failed");
    }
  });

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
