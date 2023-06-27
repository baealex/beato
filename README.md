
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

![_1](https://github.com/baealex/beato/assets/35596687/ce4cd1a3-4e2d-41b3-9ea8-5fcf3122d2f9)

![_2](https://github.com/baealex/beato/assets/35596687/69ab72d6-96a3-433d-a88f-145acd1148af)

![_3](https://github.com/baealex/beato/assets/35596687/f658b973-cb68-41ff-a95d-2f20d1a08591)

![_4](https://github.com/baealex/beato/assets/35596687/20b3745c-c039-4b5a-a947-6457de3177ef)

![_5](https://github.com/baealex/beato/assets/35596687/1a79091d-b02a-4bf2-8458-b7b3d6e4fdb0)

<br>

## Features

- [x] Organize information about music (supported mp3, acc, wav, ogg, flac)
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
