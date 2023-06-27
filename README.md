
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

![_1](https://github.com/baealex/beato/assets/35596687/e23594e3-5d0d-41f8-9f4a-6b503136e418)

![_2](https://github.com/baealex/beato/assets/35596687/13bdd8e1-bbab-4a6e-88a8-9a13151d8ed7)

![_3](https://github.com/baealex/beato/assets/35596687/5588ee54-e140-48b9-9a03-c19d4cbd8e75)

![_4](https://github.com/baealex/beato/assets/35596687/6c5e9a04-86ff-4761-bd22-ef27a4e02034)

![_5](https://github.com/baealex/beato/assets/35596687/63d3462e-dc9e-4397-a7f6-6c130165f8c5)


<br>

## Features

- [x] Organize information about music (supported mp3, acc, wav, ogg, flac)
- [x] Count the number of times music is listened to
- [ ] Make your own playlist
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
