
<p align="center">
    <a href="https://github.com/baealex/Cally/">
        <img width="200px" src="https://github.com/baealex/beato/assets/35596687/c96552c6-8a32-416c-a7be-274ee83a176d">
    </a>
</p>

<p align="center">
    <strong>Focus on what you love</strong>
</p>

<br>

# beato

Self host music streaming platform

![_1](https://github.com/baealex/beato/assets/35596687/c3a87af0-7d18-4dbc-93b1-364836c334fc)

![_2](https://github.com/baealex/beato/assets/35596687/141232fd-f81d-4d2c-8bce-8c94c40bbd30)

![_3](https://github.com/baealex/beato/assets/35596687/204d6a24-d0a5-45a3-91fd-3adebf887a10)

![_4](https://github.com/baealex/beato/assets/35596687/71c3c687-d003-48be-a632-8d6561b3e118)

<br>

## Features

- [x] Organize information about music (supported mp3, acc, wav, ogg, flac)
- [x] Count the number of times music is listened to
- [x] Make your own playlist
- [ ] Audio transcoding
- [ ] Mobile-friendly (Preparing app for background playback)

<br>

## Demo site

[beato-demo.baejino.com](https://beato-demo.baejino.com/)

<br>

## Self-host

⚠️ **Warning** This application under development may be unstable.

### use NodeJS

Please place the 'music' folder at the 'server/src' of the project.

```
git clone https://github.com/baealex/beato
cd beato/server/src
ln -s YOUR_MUSIC_PATH music
npm i && npm run build:client && npm run start
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
