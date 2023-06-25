<script lang="ts">
    import { onMount } from "svelte";
    import { Router, Route, Link } from "svelte-routing";

    import Music from "./pages/Music.svelte";
    import Album from "./pages/Album.svelte";
    import Artist from "./pages/Artist.svelte";
    import Setting from "./pages/Setting.svelte";
    import Now from "./pages/Now.svelte";

    import SiteHeader from "./components/SiteHeader.svelte";

    import Cross from "./icons/Cross.svelte";
    import Pause from "./icons/Pause.svelte";
    import Play from "./icons/Play.svelte";
    import Menu from "./icons/Menu.svelte";

    import { playlist } from "./store/playlist";

    import { socket } from "./modules/socket";
    import { toast } from "./modules/ui/toast";

    import type { Music as MusicModel } from "./models/type";
    import AlbumDetail from "./pages/AlbumDetail.svelte";

    let audioElement: HTMLAudioElement;
    let chunks: Buffer[] = [];
    let playing = false;
    let volume = 0.5;
    let progress = 0;
    let countFlag = false;

    $: {
        if ($playlist.items[$playlist.selected]) {
            document.title = `${$playlist.items[$playlist.selected].name} - ${
                $playlist.items[$playlist.selected].artist.name
            }`;
        }
    }

    $: {
        if (audioElement) {
            audioElement.volume = volume;
        }
    }

    onMount(() => {
        socket.on("audio", async (chunk: Buffer | "end") => {
            if (chunk === "end") {
                audioElement.src = URL.createObjectURL(
                    new Blob(chunks, { type: "audio/mpeg" })
                );
                await audioElement.play();
                playing = true;
                audioElement.onended = playNext;
                return;
            }
            chunks.push(chunk);
        });

        audioElement.addEventListener("timeupdate", () => {
            progress =
                (audioElement.currentTime /
                    $playlist.items[$playlist.selected].duration) *
                100;

            if (progress >= 80 && countFlag) {
                countFlag = false;
                socket.emit("count", $playlist.items[$playlist.selected].id);
            }
        });
    });

    const handleClickMusic = (music: MusicModel) => {
        if (!$playlist.items.map((item) => item.id).includes(music.id)) {
            $playlist.items = [...$playlist.items, music];
            toast("플레이리스트에 추가되었습니다.");
        } else {
            toast("이미 플레이리스트에 추가되어 있습니다.");
        }

        if ($playlist.selected === null) {
            chunks = [];
            countFlag = true;
            $playlist.selected = 0;
            socket.emit("file", $playlist.items[$playlist.selected].filePath);
        }
    };

    const playNext = () => {
        $playlist.selected = $playlist.selected + 1;
        if ($playlist.selected >= $playlist.items.length) {
            $playlist.selected = 0;
        }

        chunks = [];
        countFlag = true;
        socket.emit("file", $playlist.items[$playlist.selected].filePath);
    };

    const playPrev = () => {
        $playlist.selected = $playlist.selected - 1;
        if ($playlist.selected < 0) {
            $playlist.selected = $playlist.items.length - 1;
        }

        chunks = [];
        countFlag = true;
        socket.emit("file", $playlist.items[$playlist.selected].filePath);
    };

    const handleClickPause = () => {
        playing = !playing;
        if (playing) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
    };

    const handleClickStop = () => {
        playing = false;
        countFlag = false;
        audioElement.pause();
        audioElement.currentTime = 0;
    };

    const handleClickPlaylistMusic = (idx: number) => {
        $playlist.selected = idx;
        chunks = [];
        countFlag = true;
        socket.emit("file", $playlist.items[$playlist.selected].filePath);
    };
</script>

<main>
    <Router>
        <SiteHeader dance={playing} />
        <div class="container">
            <Route path="/" onClickMusic={handleClickMusic} component={Music} />
            <Route path="/album" component={Album} />
            <Route
                path="/album/:id"
                onClickMusic={handleClickMusic}
                component={AlbumDetail}
                let:params
            />
            <Route path="/artist" component={Artist} />
            <Route path="/setting" component={Setting} />
            <Route
                path="/now-play"
                onClickMusic={handleClickPlaylistMusic}
                component={Now}
            />
        </div>

        <audio bind:this={audioElement} />

        <div class="audio" class:open={$playlist.items[$playlist.selected]}>
            <div
                class="progress"
                on:keydown={() => {}}
                on:mousemove={(e) => {
                    if (e.buttons === 1) {
                        audioElement.currentTime =
                            (e.clientX / window.innerWidth) *
                            $playlist.items[$playlist.selected].duration;
                    }
                }}
                on:click={(e) => {
                    audioElement.currentTime =
                        (e.clientX / window.innerWidth) *
                        $playlist.items[$playlist.selected].duration;
                }}
            >
                <div class="progress-bar" style={`width: ${progress}%`} />
            </div>
            <div class="player">
                <div class="music">
                    <img
                        class="album-art"
                        src={$playlist.items[$playlist.selected]
                            ? $playlist.items[$playlist.selected].album.cover
                            : ""}
                        alt=""
                    />
                    <div class="info">
                        <div class="title">
                            {$playlist.items[$playlist.selected]
                                ? $playlist.items[$playlist.selected].name
                                : ""}
                        </div>
                        <div class="artist">
                            {$playlist.items[$playlist.selected]
                                ? $playlist.items[$playlist.selected].artist
                                      .name
                                : ""}
                        </div>
                    </div>
                </div>
                <div class="action">
                    <button on:click={handleClickPause}>
                        {#if playing}
                            <Pause />
                        {:else}
                            <Play />
                        {/if}
                    </button>
                    <button on:click={handleClickStop}>
                        <Cross />
                    </button>
                    <input
                        bind:value={volume}
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                    />
                    <Link to="/now-play">
                        <button>
                            <Menu />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    </Router>
</main>

<style lang="scss">
    .audio {
        display: flex;
        flex-direction: column;
        background-color: #111111;
        gap: 0.5rem;
        transition: transform 0.25s ease-in-out;

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
            flex-wrap: wrap;

            .action {
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 0.25rem;

                button {
                    padding: 0.5rem;
                    border-radius: 0.25rem;
                    background-color: transparent;
                    color: white;
                    border: none;
                    cursor: pointer;
                    font-size: 0.8rem;
                    font-weight: bold;
                    text-transform: uppercase;
                    transition: background-color 0.25s ease-in-out;

                    :global(svg) {
                        width: 1rem;
                        height: 1rem;
                    }

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
