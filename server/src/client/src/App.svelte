<script lang="ts">
    import { afterUpdate, onMount } from "svelte";
    import { Router, Route } from "svelte-routing";

    import Album from "./pages/Album.svelte";
    import Artist from "./pages/Artist.svelte";
    import Setting from "./pages/Setting.svelte";

    import SiteHeader from "./components/SiteHeader.svelte";
    import Main from "./pages/Music.svelte";
    import { socket } from "./modules/socket";

    import type { Music } from "./models/type";

    let audioElement: HTMLAudioElement;
    let chunks: Buffer[] = [];
    let selectedMusic: Music = null;
    let playing = false;
    let isRepeat = true;
    let volume = 0.5;
    let progress = 0;

    socket.on("audio", (chunk: Buffer | null) => {
        if (!chunk) {
            return;
        }

        chunks.push(chunk);

        if (chunks.length < 2) {
            return;
        }

        audioElement.src = URL.createObjectURL(new Blob(chunks));
        if (audioElement.paused) {
            audioElement.play();
        }
    });

    onMount(() => {
        audioElement.addEventListener("timeupdate", () => {
            progress =
                (audioElement.currentTime / selectedMusic.duration) * 100;
        });
    });

    afterUpdate(() => {
        audioElement.onended = () => {
            playing = false;
            if (isRepeat) {
                handleClickMusic(selectedMusic);
            }
        };

        if (playing) {
            audioElement.play();
        } else {
            audioElement.pause();
        }

        audioElement.volume = volume;
    });

    const handleClickMusic = (music: Music) => {
        chunks = [];
        playing = true;
        selectedMusic = music;
        socket.emit("file", selectedMusic.filePath);
    };
</script>

<main>
    <Router>
        <SiteHeader dance={playing} />
        <Route path="/" onClickMusic={handleClickMusic} component={Main} />
        <Route path="/album" component={Album} />
        <Route path="/artist" component={Artist} />
        <Route path="/setting" component={Setting} />

        <audio bind:this={audioElement} controls />

        <div class="audio" class:open={selectedMusic}>
            <div
                class="progress"
                on:keydown={() => {}}
                on:mousemove={(e) => {
                    if (e.buttons === 1) {
                        audioElement.currentTime =
                            (e.clientX / window.innerWidth) *
                            selectedMusic.duration;
                    }
                }}
                on:click={(e) => {
                    audioElement.currentTime =
                        (e.clientX / window.innerWidth) *
                        selectedMusic.duration;
                }}
            >
                <div class="progress-bar" style={`width: ${progress}%`} />
            </div>
            <div class="player">
                <div class="music">
                    <img
                        class="album-art"
                        src={selectedMusic ? selectedMusic.album.cover : ""}
                        alt=""
                    />
                    <div class="info">
                        <div class="title">
                            {selectedMusic ? selectedMusic.name : ""}
                        </div>
                        <div class="artist">
                            {selectedMusic ? selectedMusic.artist.name : ""}
                        </div>
                    </div>
                </div>
                <div class="action">
                    <button on:click={() => (isRepeat = !isRepeat)}>
                        {isRepeat ? "Repeat: ON" : "Repeat: OFF"}
                    </button>
                    <button
                        on:click={() => {
                            selectedMusic = null;
                            playing = false;
                        }}
                    >
                        Stop
                    </button>
                    <button on:click={() => (playing = !playing)}>
                        {playing ? "Pause" : "Play"}
                    </button>
                    <input
                        type="range"
                        bind:value={volume}
                        min="0"
                        max="1"
                        step="0.01"
                    />
                </div>
            </div>
        </div>
    </Router>
</main>

<style lang="scss">
    audio {
        display: none;
    }

    .audio {
        position: fixed;
        transform: translateY(100%);
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        background-color: #1a1a1a;
        gap: 0.5rem;
        transition: transform 0.25s ease-in-out;

        &.open {
            transform: translateY(0%);
        }

        .music {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.5rem;
        }

        .player {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem;

            .action {
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 0.25rem;

                button {
                    padding: 0.5rem;
                    border-radius: 0.25rem;
                    background-color: rgba(255, 255, 255, 0.1);
                    color: white;
                    border: none;
                    cursor: pointer;
                    font-size: 0.8rem;
                    font-weight: bold;
                    text-transform: uppercase;
                    transition: background-color 0.25s ease-in-out;

                    &:hover {
                        background-color: rgba(255, 255, 255, 0.2);
                    }
                }

                input[type="range"] {
                    -webkit-appearance: none;
                    width: 100px;
                    height: 0.25rem;
                    background-color: rgba(255, 255, 255, 0.1);
                    border-radius: 0.25rem;
                    outline: none;
                    transition: background-color 0.25s ease-in-out;

                    &::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        appearance: none;
                        width: 0.75rem;
                        height: 0.75rem;
                        background-color: #a076f1;
                        border-radius: 50%;
                        cursor: pointer;
                    }

                    &:hover {
                        background-color: rgba(255, 255, 255, 0.2);
                    }
                }
            }
        }

        .progress {
            width: 100%;
            height: 0.25rem;
            background-color: rgba(255, 255, 255, 0.1);
            transition: height 0.25s ease-in-out;

            .progress-bar {
                height: 100%;
                background-color: #a076f1;
            }

            &:hover {
                cursor: pointer;
                height: 0.5rem;
            }
        }
    }
</style>
