
<p align="center">
    <a href="https://github.com/baealex/Cally/">
        <img width="200px" src="https://github.com/baealex/beato/assets/35596687/59c7b5fd-abb3-4bfc-aec1-961c3b19f4e6">
    </a>
</p>

<p align="center">
    <strong>Focus on what you love</strong>
</p>

<br>

# beato

Self host music streaming platform

![_1](https://github.com/baealex/beato/assets/35596687/e04d3616-12cb-4884-af01-421b005ea1d9)

![_2](https://github.com/baealex/beato/assets/35596687/9154d8e3-3604-42c3-ac1b-e26e21347a6b)

![_3](https://github.com/baealex/beato/assets/35596687/ede40321-ada2-4a87-98cb-028e4a3f16d6)

![_4](https://github.com/baealex/beato/assets/35596687/467eac84-0222-4a37-9b44-6870924fab8f)

<br>

## Features

- [x] Organize information about music (supported mp3, wav, flac)
- [x] Count the number of times music is listened to
- [ ] Make your own playlist
- [ ] Audio transcoding
- [ ] Mobile-friendly (Preparing app for background playback)

<br>

## Self-host

⚠️ **Warning** This application under development may be unstable.

### use NodeJS

Please place the 'music' folder at the 'server/src' of the project.

```
git clone https://github.com/baealex/beato
cd beato/server/src
ln -s YOUR_MUSIC_PATH music
git pull && npm i && npm run build:client && npm run start
```

you can connect to `http://localhost:4000`

### use Docker

Please place the 'music' folder at the top level of the project.

```
git clone https://github.com/baealex/beato
cd beato
ln -s YOUR_MUSIC_PATH music
git pull && docker-compose pull && docker-compose up -d
```

you can connect to `http://localhost:4000`
