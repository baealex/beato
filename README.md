# beato

Beato is a revolutionary self-hosted music streaming web application designed for music lovers who want complete control over their audio experience. With Beato, you can create your own personal music library and stream your favorite tracks anytime, anywhere. Start your musical journey today!

![](https://github.com/user-attachments/assets/d23e162e-0cd9-406b-9bc3-23b7b30d8d6a)

<br>

## Features

- [x] Sync your music (supported mp3, acc, wav, ogg, flac).
- [x] Categorize your favorite music.
- [x] Sort your music by the number of times you've listened to it.
- [x] Create your playlists.
- [x] Play music in the background on your smartphone. (Download for [Android](https://www.dropbox.com/scl/fo/0mjqlwcj44p7uz999868e/h?rlkey=wyush6qcvbkoss72b18q8gqjg&dl=0))
- [x] Use track mix-in effects (only on the web).
- [ ] Transcode audio.

<br>

## Demo site

[demo-beato.baejino.com](https://demo-beato.baejino.com/)

<br>

## Setup

⚠️ **Warning** This application under development may be unstable.

### use NodeJS

Please place the 'music' folder at the 'server/src' of the project.

```bash
git clone https://github.com/baealex/beato

# LINK YOUR MUSIC
ln -s {YOUR_MUSIC_PATH} beato/server/src/music

# RUN
./beato/start.sh
```

you can connect to `http://localhost:4000`

### use Docker

Please place the 'music' folder at the top level of the project.

```
docker run \
    -v {YOUR_MUSIC_PATH}:/music \
    -v ./cache:/cache \
    -v ./data:/data \
    -p 4000:4000 \
    baealex/beato
```

you can connect to `http://localhost:4000`
