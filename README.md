# Ocean Wave

Ocean Wave is a self-hosted music streaming app for your private library. It is built for listening on your own terms: sync music from storage you control, keep your playlists and favorites close, and stream across desktop and mobile without handing your collection to a third-party service.

![](https://github.com/user-attachments/assets/d23e162e-0cd9-406b-9bc3-23b7b30d8d6a)

<br>

## Features

- [x] Sync your music (supported mp3, aac, wav, ogg, flac).
- [x] Categorize your favorite music.
- [x] Sort your music by the number of times you've listened to it.
- [x] Create your playlists.
- [x] Play music in the background on your smartphone. (Download for [Android](https://www.dropbox.com/scl/fo/0mjqlwcj44p7uz999868e/h?rlkey=wyush6qcvbkoss72b18q8gqjg&dl=0))
- [x] Use audio mix-in effects (web only).
- [x] Use audio equalizer (web only).
- [x] Use audio visualizer (web only).
- [x] Transcode audio.

<br>

## Setup

⚠️ **Warning** This application under development may be unstable.

Ocean Wave uses port `44100` by default, matching the 44.1kHz audio sample rate.

### Use Node.js

Link your music directory into `server/src/music`.

```bash
git clone <repository-url> ocean-wave
cd ocean-wave
ln -s {YOUR_MUSIC_PATH} server/src/music
npm install
npm start
```

Then open `http://localhost:44100`.

### Use Docker

Bind your music directory to `/music` inside the container.

```bash
docker run \
    -v {YOUR_MUSIC_PATH}:/music \
    -v ./cache:/cache \
    -v ./data:/data \
    -p 44100:44100 \
    baealex/ocean-wave
```

Then open `http://localhost:44100`.

### Password Mode

Ocean Wave fails closed when auth mode is not configured. Use password mode for normal deployments.

Password mode requires both values:

- `OCEAN_WAVE_AUTH_PASSWORD`: shared password for unlocking the app.
- `OCEAN_WAVE_SESSION_SECRET`: dedicated signing secret for the session cookie.

Ocean Wave does not fall back to the password as the session secret.

Node.js:

```bash
OCEAN_WAVE_AUTH_PASSWORD=listen-safe \
OCEAN_WAVE_SESSION_SECRET=replace-this-secret \
npm start
```

Docker:

```bash
docker run \
    -e OCEAN_WAVE_AUTH_PASSWORD=listen-safe \
    -e OCEAN_WAVE_SESSION_SECRET=replace-this-secret \
    -v {YOUR_MUSIC_PATH}:/music \
    -v ./cache:/cache \
    -v ./data:/data \
    -p 44100:44100 \
    baealex/ocean-wave
```

### Explicit Open Mode

Open mode is only allowed when you explicitly accept no-auth access:

```bash
OCEAN_WAVE_ALLOW_INSECURE_NO_AUTH=true npm start
```

Do not set `OCEAN_WAVE_ALLOW_INSECURE_NO_AUTH=true` together with `OCEAN_WAVE_AUTH_PASSWORD`.
