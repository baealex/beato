<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { Router, Route } from "svelte-routing";
    import { alert, toast } from "@baejino/ui";

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

    import MusicList from "./pages/MusicList.svelte";
    import FavoriteMusic from "./pages/FavoriteMusic.svelte";
    import AlbumList from "./pages/AlbumList.svelte";
    import AlbumDetail from "./pages/AlbumDetail.svelte";
    import ArtistList from "./pages/ArtistList.svelte";
    import ArtistDetail from "./pages/ArtistDetail.svelte";
    import PlaylistDetail from "./pages/PlaylistDetail.svelte";
    import QueueHistory from "./pages/QueueHistory.svelte";
    import Playlist from "./pages/Playlist.svelte";
    import Setting from "./pages/Setting.svelte";

    import { downloadFile } from "./modules/download";
    import { PostMessageWrapper } from "./modules/app-channel";
    import { convertToMillisecond, convertToSecond } from "./modules/time";
    import { getAudio } from "./api";

    import { musicMap, queue, syncAll } from "./store";

    import * as socketManager from "./socket";

    import type { Music } from "./models/type";

    let audioElement: HTMLAudioElement;
    let playing = false;
    let volume = 1;
    let progress = 0;
    let currentTime = 0;
    let isLoaded = false;
    let playReady = false;
    let shouldCount = false;
    let currentMusic: Music = null;

    $: {
        if (currentMusic) {
            document.title = `${currentMusic.name} - ${currentMusic.artist.name}`;
        }
    }

    $: {
        if (audioElement) {
            audioElement.volume = volume;
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
        socketManager.musicListener();
        socketManager.playlistListener();

        const handlePlay = () => {
            playing = true;
        };

        const handlePause = () => {
            playing = false;
        };

        const handleEnd = (onLast: Function) => {
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
                    onLast();
                    return;
                }
                playNext();
                return;
            }
        };

        const handleSetPosition = (secondPosition: number) => {
            progress = Number(
                ((secondPosition / currentMusic?.duration) * 100).toFixed(2)
            );

            if (progress >= 80 && shouldCount) {
                shouldCount = false;
                socketManager.socket.emit(socketManager.MUSIC_COUNT, {
                    id: currentMusic?.id,
                });
            }
        };

        if (window.AppChannel) {
            window.AppChannel.receiveMessage = (message) => {
                if (message.actionType === "play") {
                    handlePlay();
                }
                if (message.actionType === "pause") {
                    handlePause();
                }
                if (message.actionType === "stop") {
                    window.AppChannel.postMessage(
                        PostMessageWrapper({
                            actionType: "setPosition",
                            position: 0,
                        })
                    );
                    playing = false;
                }
                if (message.actionType === "skipToNext") {
                    playNext();
                }
                if (message.actionType === "skipToPrevious") {
                    playPrev();
                }
                if (message.actionType === "end") {
                    handleEnd(() => {
                        window.AppChannel.postMessage(
                            PostMessageWrapper({
                                actionType: "stop",
                            })
                        );
                        progress = 0;
                    });
                }
                if (message.actionType === "setPosition") {
                    currentTime = convertToSecond(message.position);
                    handleSetPosition(currentTime);
                }
            };
        } else {
            audioElement.addEventListener("play", () => {
                handlePlay();
            });

            audioElement.addEventListener("pause", () => {
                handlePause();
            });

            audioElement.addEventListener("ended", () => {
                handleEnd(() => {
                    audioElement.currentTime = 0;
                    progress = 0;
                });
            });

            audioElement.addEventListener("timeupdate", () => {
                currentTime = audioElement.currentTime;
                handleSetPosition(currentTime);
            });

            audioElement.addEventListener("error", () => {
                toast("Failed to load audio");
            });
        }
    });

    onDestroy(() => {
        socketManager.socket.off("resync");
        socketManager.musicDisconnection();
        socketManager.playlistDisconnection();
    });

    const requestFile = async (id: string) => {
        shouldCount = true;

        if (window.AppChannel) {
            window.AppChannel.postMessage(
                PostMessageWrapper({
                    actionType: "setMediaItem",
                    mediaItem: {
                        id: location.origin + "/api/audio/" + id,
                        album: currentMusic.album.name,
                        title: currentMusic.name,
                        artist: currentMusic.artist.name,
                        duration: convertToMillisecond(currentMusic.duration),
                        artUri: location.origin + currentMusic.album.cover,
                    },
                })
            );
        } else {
            const audioResource = "/api/audio/" + id;
            audioElement.pause();
            audioElement.src = audioResource;
            audioElement.currentTime = 0;
            audioElement.load();
        }
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
        if (!window.AppChannel) {
            if (audioElement.currentTime > 10) {
                audioElement.currentTime = 0;
                return;
            }
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
        if (window.AppChannel) {
            window.AppChannel.postMessage(
                PostMessageWrapper({
                    actionType: "play",
                })
            );
        } else {
            audioElement.play();
        }
    };

    const handleClickPause = () => {
        if (window.AppChannel) {
            window.AppChannel.postMessage(
                PostMessageWrapper({
                    actionType: "pause",
                })
            );
        } else {
            audioElement.pause();
        }
    };

    const handleClickStop = () => {
        playing = false;

        if (window.AppChannel) {
            window.AppChannel.postMessage(
                PostMessageWrapper({
                    actionType: "stop",
                })
            );
        } else {
            audioElement.pause();
            audioElement.currentTime = 0;
        }
    };

    const handleClickProgress = (e: MouseEvent | TouchEvent) => {
        const { width, left, right } = (
            e.currentTarget as HTMLDivElement
        ).getBoundingClientRect();

        let x = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
        x = x < left ? left : x > right ? right : x;
        const percent = (x - left) / width;
        const duration = currentMusic.duration;

        if (window.AppChannel) {
            window.AppChannel.postMessage(
                PostMessageWrapper({
                    actionType: "setPosition",
                    position: convertToMillisecond(duration * percent),
                })
            );
        } else {
            audioElement.currentTime = duration * percent;
        }
    };

    const handleClickLike = (music: Music) => {
        socketManager.socket.emit(socketManager.MUSIC_LIKE, { id: music.id });
    };

    const handleClickDownload = async (music: Music) => {
        if (window.AppChannel) {
            await alert("Not yet supported");
        } else {
            const { data } = await getAudio(music.id);
            const fileName = music.filePath.split("/").pop();
            downloadFile(fileName, URL.createObjectURL(data));
        }
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
                bind:volume
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

<audio bind:this={audioElement} />
