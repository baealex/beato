import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '@prisma/client';

const adapter = new PrismaBetterSqlite3({
    url: 'file:test.sqlite3'
});

const mockPrisma = new PrismaClient({
    adapter
});

jest.mock('~/models', () => mockPrisma);

beforeAll(async () => {
    await mockPrisma.$connect();
});

afterAll(async () => {
    await mockPrisma.$disconnect();
});
