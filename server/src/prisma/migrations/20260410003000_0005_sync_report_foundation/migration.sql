CREATE TABLE "SyncReport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "startedAt" DATETIME NOT NULL,
    "completedAt" DATETIME,
    "status" TEXT NOT NULL,
    "force" BOOLEAN NOT NULL DEFAULT false,
    "scannedFiles" INTEGER NOT NULL DEFAULT 0,
    "indexedFiles" INTEGER NOT NULL DEFAULT 0,
    "createdCount" INTEGER NOT NULL DEFAULT 0,
    "movedCount" INTEGER NOT NULL DEFAULT 0,
    "duplicateCount" INTEGER NOT NULL DEFAULT 0,
    "missingCount" INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE "SyncReportItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "kind" TEXT NOT NULL,
    "musicId" INTEGER,
    "musicName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "previousFilePath" TEXT,
    "syncReportId" INTEGER NOT NULL,
    CONSTRAINT "SyncReportItem_syncReportId_fkey" FOREIGN KEY ("syncReportId") REFERENCES "SyncReport" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "SyncReport_createdAt_idx" ON "SyncReport"("createdAt");
CREATE INDEX "SyncReport_status_createdAt_idx" ON "SyncReport"("status", "createdAt");
CREATE INDEX "SyncReportItem_syncReportId_kind_idx" ON "SyncReportItem"("syncReportId", "kind");
