ALTER TABLE "PlaybackEvent" ADD COLUMN "clientSessionId" TEXT;

CREATE UNIQUE INDEX "PlaybackEvent_clientSessionId_key" ON "PlaybackEvent"("clientSessionId");
