-- AlterTable
ALTER TABLE "Music" ADD COLUMN "lastPlayedAt" DATETIME;
ALTER TABLE "Music" ADD COLUMN "totalPlayedMs" REAL NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "PlaybackEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" DATETIME NOT NULL,
    "endedAt" DATETIME NOT NULL,
    "playedMs" REAL NOT NULL,
    "completionRate" REAL NOT NULL,
    "countedAsPlay" BOOLEAN NOT NULL DEFAULT false,
    "source" TEXT NOT NULL,
    "connectorId" TEXT,
    "musicId" INTEGER NOT NULL,
    CONSTRAINT "PlaybackEvent_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "Music" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "PlaybackEvent_musicId_endedAt_idx" ON "PlaybackEvent"("musicId", "endedAt");
