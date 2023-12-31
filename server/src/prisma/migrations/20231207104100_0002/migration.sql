-- CreateTable
CREATE TABLE "MusicHate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "musicId" INTEGER NOT NULL,
    CONSTRAINT "MusicHate_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "Music" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
