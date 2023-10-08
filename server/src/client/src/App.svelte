<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { Router, Route } from "svelte-routing";

    import {
        Beato,
        SiteHeader,
        Player,
        MusicSortPanel,
        AlbumSortPanel,
        ArtistSortPanel,
        MusicActionPanel,
        PlaylistActionPanel,
    } from "~/components";
    import {
        MusicList,
        FavoriteMusic,
        AlbumList,
        AlbumDetail,
        ArtistList,
        ArtistDetail,
        QueueHistory,
        Playlist,
        PlaylistDetail,
        Setting,
    } from "~/pages";

    import {
        WebAudioChannel,
        AppAudioChannel,
        type AudioChannel,
        type AudioChannelEventHandler,
    } from "./modules/audio-channel";

    import { musicMap, queue, syncAll } from "./store";

    import * as socketManager from "./socket";

    import type { Music } from "./models/type";

    const audioEventHandler: AudioChannelEventHandler = {
        onPlay: () => {
            playing = true;
        },
        onPause: () => {
            playing = false;
        },
        onStop: () => {
            playing = false;
        },
        onEnded: () => {
            playing = false;
            if ($queue.repeatMode === "one") {
                playAgain();
                return;
            }
            if ($queue.repeatMode === "all") {
                if ($queue.items.length === 1) {
                    playAgain();
                    return;
                }
                playNext();
                return;
            }
            if ($queue.repeatMode === "off") {
                if ($queue.selected === $queue.items.length - 1) {
                    progress = 0;
                    return;
                }
                playNext();
                return;
            }
        },
        onTimeUpdate: (secondPosition) => {
            progress = Number(
                ((secondPosition / currentMusic?.duration) * 100).toFixed(2)
            );

            if (progress >= 80 && shouldCount) {
                shouldCount = false;
                socketManager.socket.emit(socketManager.MUSIC_COUNT, {
                    id: currentMusic?.id,
                });
            }
        },
        onSkipToNext: () => {
            playNext();
        },
        onSkipToPrevious: () => {
            playPrev();
        },
    };

    let playing = false;
    let progress = 0;
    let currentTime = 0;
    let isLoaded = false;
    let playReady = false;
    let shouldCount = false;
    let currentMusic: Music = null;
    let audioChannel: AudioChannel = window.AppChannel
        ? new AppAudioChannel(audioEventHandler)
        : new WebAudioChannel(audioEventHandler);

    $: {
        if (currentMusic) {
            document.title = `${currentMusic.name} - ${currentMusic.artist.name}`;
        }
    }

    $: {
        if (isLoaded) {
            queue.subscribe((value) => {
                if (value.items.length === 0 || value.selected === null) {
                    currentMusic = null;
                    handleClickStop();
                    return;
                }
                if (
                    currentMusic &&
                    currentMusic.id === value.items[value.selected].id
                ) {
                    return;
                }
                currentMusic = $musicMap.get(value.items[value.selected].id);
                requestFile(value.items[value.selected].id);
                playReady ? handleClickPlay() : (playReady = true);
            });
        }
    }

    onMount(() => {
        socketManager.socket.on("resync", () => {
            isLoaded = false;
            syncAll(() => {
                isLoaded = true;
            });
        });
        window.addEventListener("focus", () => {
            socketManager.socket.connect();
        });
        window.addEventListener("beforeunload", () => {
            audioChannel.stop();
        });
        socketManager.musicListener();
        socketManager.playlistListener();
    });

    onDestroy(() => {
        socketManager.socket.off("resync");
        socketManager.musicDisconnection();
        socketManager.playlistDisconnection();
    });

    const requestFile = async (id: string) => {
        shouldCount = true;
        audioChannel.load(currentMusic);
    };

    const playAgain = () => {
        requestFile(currentMusic.id);
        handleClickPlay();
    };

    const playNext = () => {
        queue.update((state) => {
            state.selected = state.selected + 1;
            if (state.selected >= state.items.length) {
                state.selected = 0;
            }
            return state;
        });
    };

    const playPrev = () => {
        if (currentTime > 10) {
            audioChannel.seek(0);
            return;
        }
        queue.update((state) => {
            state.selected = state.selected - 1;
            if (state.selected < 0) {
                state.selected = state.items.length - 1;
            }
            return state;
        });
    };

    const handleClickPlay = () => {
        audioChannel.play();
    };

    const handleClickPause = () => {
        audioChannel.pause();
    };

    const handleClickStop = () => {
        audioChannel.stop();
    };

    const handleClickProgress = (e: MouseEvent | TouchEvent) => {
        const { width, left, right } = (
            e.currentTarget as HTMLDivElement
        ).getBoundingClientRect();

        let x = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
        x = x < left ? left : x > right ? right : x;
        const percent = (x - left) / width;
        const duration = currentMusic.duration;

        audioChannel.seek(duration * percent);
    };

    const handleClickLike = (music: Music) => {
        socketManager.socket.emit(socketManager.MUSIC_LIKE, { id: music.id });
    };

    const handleClickDownload = async (music: Music) => {
        audioChannel.download(music);
    };
</script>

<main>
    <Router>
        <SiteHeader />
        {#if !isLoaded}
            <div class="container">
                <div
                    style="
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        gap: 2rem;
                    "
                >
                    <Beato dance />
                    <div style="color: #ccc;">Loading...</div>
                </div>
            </div>
        {:else}
            <Route path="/">
                <div class="container">
                    <MusicList />
                </div>
            </Route>
            <Route path="/favorite" scrollToTop={true} exact={true}>
                <div class="container">
                    <FavoriteMusic />
                </div>
            </Route>
            <Route path="/album">
                <div class="container">
                    <AlbumList />
                </div>
            </Route>
            <Route path="/album/:id" let:params>
                <div class="container">
                    <AlbumDetail id={params.id} />
                </div>
            </Route>
            <Route path="/artist">
                <div class="container">
                    <ArtistList />
                </div>
            </Route>
            <Route path="/artist/:id" let:params>
                <div class="container">
                    <ArtistDetail id={params.id} />
                </div>
            </Route>
            <Route path="/queue-history">
                <div class="container">
                    <QueueHistory />
                </div>
            </Route>
            <Route path="/playlist">
                <div class="container">
                    <Playlist />
                </div>
            </Route>
            <Route path="/playlist/:id" let:params>
                <div class="container">
                    <PlaylistDetail id={params.id} />
                </div>
            </Route>
            <Route path="/setting">
                <div class="container">
                    <Setting />
                </div>
            </Route>

            <Player
                bind:playing
                bind:progress
                music={currentMusic}
                {currentTime}
                onClickPlay={handleClickPlay}
                onClickPause={handleClickPause}
                onClickNext={playNext}
                onClickPrev={playPrev}
                onClickProgress={handleClickProgress}
            />

            <MusicActionPanel
                onClickLike={handleClickLike}
                onClickDownload={handleClickDownload}
            />
            <PlaylistActionPanel />

            <MusicSortPanel />
            <AlbumSortPanel />
            <ArtistSortPanel />
        {/if}
    </Router>
</main>
