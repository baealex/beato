
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

![1](https://github.com/baealex/beato/assets/35596687/fcffe497-26f3-4ff0-9b3f-abfde64501ce)

![4](https://github.com/baealex/beato/assets/35596687/f697c8ff-d796-49e5-ace0-b660d13c1494)

![2](https://github.com/baealex/beato/assets/35596687/7673578a-51a9-41d3-a514-9a63520d2671)

![3](https://github.com/baealex/beato/assets/35596687/526e4069-2e80-4f1e-823a-34e31680f7c5)

<br>

## Features

- [x] Organize information about music (Supported mp3, acc, wav, ogg, flac)
- [x] Count the number of times music is listened to
- [x] Make your own playlist
- [x] Background playable mobile apps available (Download for [Android](https://www.dropbox.com/scl/fo/0mjqlwcj44p7uz999868e/h?rlkey=wyush6qcvbkoss72b18q8gqjg&dl=0))
- [ ] Audio transcoding

<br>

## Demo site

[demo-beato.baejino.com](https://demo-beato.baejino.com/)

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
