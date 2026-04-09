-- AlterTable
ALTER TABLE "Music" ADD COLUMN "contentHash" TEXT;
ALTER TABLE "Music" ADD COLUMN "hashVersion" INTEGER;
ALTER TABLE "Music" ADD COLUMN "lastSeenAt" DATETIME;
ALTER TABLE "Music" ADD COLUMN "missingSinceAt" DATETIME;
ALTER TABLE "Music" ADD COLUMN "syncStatus" TEXT NOT NULL DEFAULT 'active';

-- CreateIndex
CREATE INDEX "Music_contentHash_idx" ON "Music"("contentHash");

-- CreateIndex
CREATE INDEX "Music_syncStatus_missingSinceAt_idx" ON "Music"("syncStatus", "missingSinceAt");
