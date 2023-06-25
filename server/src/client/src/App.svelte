<script lang="ts">
    import { Router, Route } from "svelte-routing";
    import SiteHeader from "./components/SiteHeader.svelte";
    import Main from "./pages/Main.svelte";
    import { socket } from "./modules/socket";
    import { afterUpdate, onMount } from "svelte";

    interface Music {
        file: string;
        title: string;
        artist: string;
        album: string;
        picture: {
            data: ArrayBuffer;
        }[];
        genre: string[];
        duration: number;
    }

    let audioElement: HTMLAudioElement;
    let chunks: Buffer[] = [];
    let musics: Music[] = [];
    let selectedMusic: Music = null;
    let playing = false;
    let isRepeat = true;
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
    });

    socket.emit("sync");

    socket.on("files", (files: Music[]) => {
        musics = files;
        console.log(musics);
    });

    const handleClickMusic = (music: Music) => {
        chunks = [];
        playing = true;
        selectedMusic = music;
        socket.emit("file", selectedMusic.file);
    };
</script>

<main>
    <Router>
        <SiteHeader dance={playing} />
        <Route path="/" component={Main} />
        <ul>
            {#each musics as music}
                <li on:click={() => handleClickMusic(music)}>
                    <img
                        class="album-art"
                        src={(() => {
                            const picture = music.picture?.[0];
                            if (!picture) {
                                return "";
                            }
                            const blob = new Blob([picture.data]);
                            return URL.createObjectURL(blob);
                        })()}
                    />
                    <div class="info">
                        <div class="title">
                            {music.title}
                        </div>
                        <div class="artist">
                            {music.artist}
                        </div>
                    </div>
                </li>
            {/each}
        </ul>

        <audio bind:this={audioElement} controls />

        <div class="audio">
            <div
                class="progress"
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
                        src={(() => {
                            const picture = selectedMusic?.picture?.[0];
                            if (!picture) {
                                return "";
                            }
                            const blob = new Blob([picture.data]);
                            return URL.createObjectURL(blob);
                        })()}
                    />
                    <div class="info">
                        <div class="title">
                            {selectedMusic ? selectedMusic.title : ""}
                        </div>
                        <div class="artist">
                            {selectedMusic ? selectedMusic.artist : ""}
                        </div>
                    </div>
                </div>
                <div class="action">
                    <button on:click={() => (isRepeat = !isRepeat)}>
                        {isRepeat ? "Repeat: ON" : "Repeat: OFF"}
                    </button>
                    <button> Shuffle </button>
                    <button> Previous </button>
                    <button on:click={() => (playing = !playing)}>
                        {playing ? "Pause" : "Play"}
                    </button>
                    <button> Next </button>
                    <button> Like </button>
                    <button> Volume </button>
                </div>
            </div>
        </div></Router
    >
</main>

<style lang="scss">
    audio {
        display: none;
    }

    .audio {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        background-color: #1a1a1a;
        gap: 0.5rem;

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

    ul {
        margin: 0;
        padding: 0;
        list-style: none;

        li {
            cursor: pointer;
            padding: 1rem;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.5rem;

            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }
    }

    .album-art {
        width: 45px;
        height: 45px;
        border-radius: 0.25rem;
        object-fit: cover;
    }

    .info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        .title {
            font-size: 1rem;
        }

        .artist {
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.5);
        }
    }
</style>
