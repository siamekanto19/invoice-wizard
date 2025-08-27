let PrismaClient: any;
try {
  // Try to require @prisma/client at runtime. This keeps the dev environment
  // flexible if the package isn't installed (e.g., playground without DB).
  // TypeScript may still need the types during full development with Prisma.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  PrismaClient = require("@prisma/client").PrismaClient;
} catch (e) {
  PrismaClient = undefined;
}

const globalForPrisma = globalThis as unknown as {
  prisma: any | undefined;
};

export const db =
  globalForPrisma.prisma ??
  (PrismaClient ? new PrismaClient({ log: ["query"] }) : ({} as any));

if (process.env.NODE_ENV !== "production" && PrismaClient)
  globalForPrisma.prisma = db;
