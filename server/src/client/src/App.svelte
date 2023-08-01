<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { Router, Route } from "svelte-routing";
    import { toast } from "@baejino/ui";

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
    import { getAudio } from "./api";

    import { musicMap, queue, syncAll } from "./store";

    import * as socketManager from "./socket";

    import type { Music } from "./models/type";

    let audioElement: HTMLAudioElement;
    let playing = false;
    let volume = 1;
    let progress = 0;
    let isLoading = true;
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

    onMount(() => {
        isLoading = true;
        syncAll(() => {
            isLoading = false;
            currentMusic = $musicMap.get($queue.items[$queue.selected].id);
        });

        socketManager.socket.on("resync", () => {
            isLoading = true;
            syncAll(() => (isLoading = false));
        });
        socketManager.musicListener();
        socketManager.playlistListener();

        audioElement.addEventListener("timeupdate", () => {
            progress = Number(
                (
                    (audioElement.currentTime / currentMusic?.duration) *
                    100
                ).toFixed(2)
            );

            if (progress >= 80 && shouldCount) {
                shouldCount = false;
                socketManager.socket.emit(socketManager.MUSIC_COUNT, {
                    id: currentMusic?.id,
                });
            }
        });

        audioElement.addEventListener("ended", () => {
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
                    audioElement.currentTime = 0;
                    return;
                }
                playNext();
                return;
            }
        });

        audioElement.addEventListener("error", () => {
            toast("Failed to load audio");
        });

        audioElement.addEventListener("play", () => {
            playing = true;
        });

        audioElement.addEventListener("pause", () => {
            playing = false;
        });

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
        });
    });

    onDestroy(() => {
        socketManager.socket.off("resync");
        socketManager.musicDisconnection();
        socketManager.playlistDisconnection();
    });

    const requestFile = async (id: string) => {
        audioElement.pause();
        shouldCount = true;

        const audioResouce = "/api/audio/" + id;
        audioElement.src = audioResouce;
        audioElement.load();
        await audioElement.play();
    };

    const playAgain = () => {
        requestFile(currentMusic.id);
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
        if (audioElement.currentTime > 10) {
            audioElement.currentTime = 0;
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
        if (!playing) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
    };

    const handleClickStop = () => {
        playing = false;
        audioElement.pause();
        audioElement.currentTime = 0;
    };

    const handleClickProgress = (e: MouseEvent | TouchEvent) => {
        const rect = (
            e.currentTarget as HTMLDivElement
        ).getBoundingClientRect();
        const x = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
        const width = rect.width;
        const percent = (x - rect.left) / width;
        const duration = currentMusic.duration;
        audioElement.currentTime = duration * percent;
    };

    const handleClickLike = (music: Music) => {
        socketManager.socket.emit(socketManager.MUSIC_LIKE, { id: music.id });
    };

    const handleClickDownload = (music: Music) => {
        getAudio(music.id).then((res) => {
            if (res.data) {
                const fileName = music.filePath.split("/").pop();
                downloadFile(fileName, URL.createObjectURL(res.data));
            }
        });
    };
</script>

<main>
    <Router>
        <SiteHeader />
        {#if isLoading}
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
                onClickPlay={handleClickPlay}
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
