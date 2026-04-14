import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// ✅ Safety check (important in JS)
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

// Global object for hot-reload (Next.js fix)
const globalForPrisma = globalThis;

// Create adapter
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

// Reuse instance in dev
const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ["query", "info", "warn", "error"],
  });

// Prevent multiple instances in development
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
};

export default db;
