import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '@prisma/client';

const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL ?? 'file:./prisma/data/db.sqlite3'
});

const prisma = new PrismaClient({
    adapter
});

export default prisma;
export * from '@prisma/client';
