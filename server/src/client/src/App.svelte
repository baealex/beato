<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { Router, Route } from "svelte-routing";

    import SiteHeader from "./components/SiteHeader.svelte";
    import Player from "./components/Player.svelte";
    import Loading from "./components/Loading.svelte";
    import MusicSortPanel from "./components/MusicSortPanel.svelte";
    import AlbumSortPanel from "./components/AlbumSortPanel.svelte";
    import ArtistSortPanel from "./components/ArtistSortPanel.svelte";
    import MusicActionPanel from "./components/MusicActionPanel.svelte";

    import Music from "./pages/Music.svelte";
    import FavoriteMusic from "./pages/FavoriteMusic.svelte";
    import Album from "./pages/Album.svelte";
    import AlbumDetail from "./pages/AlbumDetail.svelte";
    import Artist from "./pages/Artist.svelte";
    import ArtistDetail from "./pages/ArtistDetail.svelte";
    import Setting from "./pages/Setting.svelte";

    import { downloadFile } from "./modules/download";
    import { getAudio } from "./api";

    import {
        musics,
        queue,
        syncAll,
        musicSortPanel,
        musicActionPanel,
    } from "./store";

    import { socket } from "./modules/socket";
    import { toast } from "./modules/ui/toast";

    import type { Music as MusicModel, RepeatMode } from "./models/type";

    let audioElement: HTMLAudioElement;
    let playing = false;
    let volume = 1;
    let progress = 0;
    let isLoading = false;
    let shouldCount = false;
    let repeatMode: RepeatMode = "no";
    let nowPlayMusic: MusicModel = null;

    $: {
        if ($queue.items[$queue.selected]) {
            document.title = `${$queue.items[$queue.selected].name} - ${
                $queue.items[$queue.selected].artist.name
            }`;
        }
    }

    $: {
        if (audioElement) {
            audioElement.volume = volume;
        }
    }

    onMount(() => {
        isLoading = true;
        syncAll(() => (isLoading = false));

        socket.on(
            "like",
            ({ id, isLiked }: { id: string; isLiked: boolean }) => {
                const switchLike = (music: MusicModel) => {
                    if (music.id === id) {
                        music.isLiked = isLiked;
                    }
                    return music;
                };
                $musics = $musics.map(switchLike);
                $queue.items = $queue.items.map(switchLike);
                $musicActionPanel.music.isLiked = isLiked;
            }
        );

        socket.on(
            "count",
            ({ id, playCount }: { id: string; playCount: number }) => {
                if ($musicSortPanel.latestSort === "playCountAsc") {
                    musics.update((prevMusics) =>
                        prevMusics
                            .map((music) => {
                                if (music.id === id) {
                                    music.playCount = playCount;
                                }
                                return music;
                            })
                            .sort((a, b) => b.playCount - a.playCount)
                    );
                }
            }
        );

        socket.on("resync", () => {
            isLoading = true;
            syncAll(() => {
                isLoading = false;
            });
        });

        audioElement.addEventListener("timeupdate", () => {
            progress = Number(
                (
                    (audioElement.currentTime /
                        $queue.items[$queue.selected]?.duration) *
                    100
                ).toFixed(2)
            );

            if (progress >= 80 && shouldCount) {
                shouldCount = false;
                socket.emit("count", $queue.items[$queue.selected]?.id);
            }
        });

        audioElement.addEventListener("ended", () => {
            if (repeatMode === "one") {
                playAgain();
                return;
            }
            if (repeatMode === "all") {
                playNext();
                return;
            }
            if (repeatMode === "no") {
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

        audioElement.addEventListener("volumechange", () => {
            volume = audioElement.volume;
        });

        queue.subscribe((value) => {
            if (value.items.length === 0 || value.selected === null) {
                nowPlayMusic = null;
                handleClickStop();
                return;
            }
            if (
                nowPlayMusic &&
                nowPlayMusic.id === value.items[value.selected].id
            ) {
                return;
            }
            nowPlayMusic = value.items[value.selected];
            requestFile(value.items[value.selected].id);
        });
    });

    onDestroy(() => {
        socket.off("like");
        socket.off("count");
        socket.off("resync");
    });

    const requestFile = async (id: string) => {
        audioElement.currentTime = 0;
        audioElement.pause();
        shouldCount = true;

        const audioResouce = "/api/audio/" + id;
        audioElement.src = audioResouce;
        audioElement.load();
        await audioElement.play();
    };

    const playAgain = () => {
        requestFile($queue.items[$queue.selected].id);
    };

    const playNext = () => {
        $queue.selected = $queue.selected + 1;
        if ($queue.selected >= $queue.items.length) {
            $queue.selected = 0;
        }
        requestFile($queue.items[$queue.selected].id);
    };

    const playPrev = () => {
        if (audioElement.currentTime > 10) {
            audioElement.currentTime = 0;
            return;
        }
        $queue.selected = $queue.selected - 1;
        if ($queue.selected < 0) {
            $queue.selected = $queue.items.length - 1;
        }
        requestFile($queue.items[$queue.selected].id);
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
        const duration = $queue.items[$queue.selected].duration;
        audioElement.currentTime = duration * percent;
    };

    const handleClickLike = (music: MusicModel) => {
        socket.emit("like", music.id);
    };

    const handleClickDownload = (music: MusicModel) => {
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
        <Loading {isLoading} message="Loading..." />
        <Route path="/" scrollToTop={true} exact={true}>
            <div class="container fade-in">
                <Music />
            </div>
        </Route>
        <Route path="/favorite">
            <div class="container fade-in">
                <FavoriteMusic />
            </div>
        </Route>
        <Route path="/album">
            <div class="container fade-in">
                <Album />
            </div>
        </Route>
        <Route path="/album/:id" let:params>
            <div class="container fade-in">
                <AlbumDetail id={params.id} />
            </div>
        </Route>
        <Route path="/artist">
            <div class="container fade-in">
                <Artist />
            </div>
        </Route>
        <Route path="/artist/:id" let:params>
            <div class="container fade-in">
                <ArtistDetail id={params.id} />
            </div>
        </Route>
        <Route path="/setting">
            <div class="container fade-in">
                <Setting />
            </div>
        </Route>

        <Player
            bind:audioElement
            bind:playing
            bind:volume
            bind:progress
            bind:repeatMode
            music={$queue.items[$queue.selected]}
            onClickPlay={handleClickPlay}
            onClickStop={handleClickStop}
            onClickNext={playNext}
            onClickPrev={playPrev}
            onClickLike={handleClickLike}
            onClickProgress={handleClickProgress}
        />

        <MusicActionPanel
            onClickLike={handleClickLike}
            onClickDownload={handleClickDownload}
        />

        <MusicSortPanel />
        <AlbumSortPanel />
        <ArtistSortPanel />
    </Router>
</main>
