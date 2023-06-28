<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { Router, Route } from "svelte-routing";

    import SiteHeader from "./components/SiteHeader.svelte";
    import Player from "./components/Player.svelte";
    import Loading from "./components/Loading.svelte";
    import MusicDetailPanel from "./components/MusicDetailPanel.svelte";
    import Music from "./pages/Music.svelte";
    import FavoriteMusic from "./pages/FavoriteMusic.svelte";
    import Album from "./pages/Album.svelte";
    import AlbumDetail from "./pages/AlbumDetail.svelte";
    import Artist from "./pages/Artist.svelte";
    import ArtistDetail from "./pages/ArtistDetail.svelte";
    import Setting from "./pages/Setting.svelte";

    import { musics, playlist, musicDetailPanel, syncData } from "./store";

    import { socket } from "./modules/socket";
    import { toast } from "./modules/ui/toast";

    import type { Music as MusicModel } from "./models/type";

    let audioElement: HTMLAudioElement;
    let savedChunk: {
        [key: string]: Buffer[];
    } = {};
    let playing = false;
    let volume = 1;
    let progress = 0;
    let countFlag = false;
    let isLoading = false;

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

    const setAndPlayAudio = async (chunks: Buffer[]) => {
        audioElement.src = URL.createObjectURL(
            new Blob(chunks, { type: "audio/mpeg" })
        );
        playing = true;
        countFlag = true;
        await audioElement.play();
        audioElement.onended = playNext;
    };

    const requestFile = async (id: string) => {
        progress = 0;
        audioElement.pause();

        if (savedChunk?.[id]) {
            setAndPlayAudio(savedChunk[id]);
            return;
        }
        socket.emit("file", id);
    };

    onMount(() => {
        isLoading = true;
        syncData(() => {
            isLoading = false;
        });

        socket.on(
            "audio",
            async ({
                id,
                part,
                chunk,
            }: {
                id: string;
                part: number;
                chunk: Buffer | "end";
            }) => {
                if (chunk === "end") {
                    if ($playlist.items[$playlist.selected].id === id) {
                        setAndPlayAudio(savedChunk[id]);
                    }
                    return;
                }
                if (!savedChunk?.[id]) {
                    savedChunk[id] = [];
                }
                savedChunk[id][part] = chunk;
            }
        );

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
                $playlist.items = $playlist.items.map(switchLike);
                $musicDetailPanel.music.isLiked = isLiked;
            }
        );

        audioElement.addEventListener("timeupdate", () => {
            progress = Number(
                (
                    (audioElement.currentTime /
                        $playlist.items[$playlist.selected].duration) *
                    100
                ).toFixed(2)
            );

            if (progress >= 80 && countFlag) {
                countFlag = false;
                $musics = $musics
                    .map((music) => {
                        if (
                            music.id === $playlist.items[$playlist.selected].id
                        ) {
                            music.playCount += 1;
                        }
                        return music;
                    })
                    .sort((a, b) => b.playCount - a.playCount);
                socket.emit("count", $playlist.items[$playlist.selected].id);
            }
        });
    });

    onDestroy(() => {
        socket.off("audio");
        socket.off("like");
    });

    const handleClickMusic = (music: MusicModel) => {
        if (!$playlist.items.map((item) => item.id).includes(music.id)) {
            $playlist.items = [...$playlist.items, music];
            toast("Added to queue");
        } else {
            toast("Already added to queue");
        }

        if ($playlist.selected === null) {
            $playlist.selected = 0;
            requestFile($playlist.items[$playlist.selected].id);
        }
    };

    const handleClickPlayAll = (musics: MusicModel[]) => {
        $playlist.selected = 0;
        $playlist.items = [...musics];
        handleClickPlaylistMusic(0);
    };

    const handleClickPlayShuffle = (musics: MusicModel[]) => {
        const copyMusics = [...musics];
        const shuffleMusics = [];
        while (copyMusics.length > 0) {
            const randomIndex = Math.floor(Math.random() * copyMusics.length);
            shuffleMusics.push(copyMusics[randomIndex]);
            copyMusics.splice(randomIndex, 1);
        }

        $playlist.selected = 0;
        $playlist.items = shuffleMusics;
        handleClickPlaylistMusic(0);
    };

    const playNext = () => {
        $playlist.selected = $playlist.selected + 1;
        if ($playlist.selected >= $playlist.items.length) {
            $playlist.selected = 0;
        }
        requestFile($playlist.items[$playlist.selected].id);
    };

    const playPrev = () => {
        $playlist.selected = $playlist.selected - 1;
        if ($playlist.selected < 0) {
            $playlist.selected = $playlist.items.length - 1;
        }
        requestFile($playlist.items[$playlist.selected].id);
    };

    const handleClickPlay = () => {
        playing = !playing;

        if (playing) {
            if (!audioElement.src) {
                handleClickPlaylistMusic($playlist.selected);
                return;
            }

            audioElement.play();
            return;
        }

        audioElement.pause();
    };

    const handleClickStop = () => {
        playing = false;
        countFlag = false;
        audioElement.pause();
        audioElement.currentTime = 0;
    };

    const handleClickPlaylistMusic = (idx: number) => {
        $playlist.selected = idx;
        requestFile($playlist.items[$playlist.selected].id);
    };

    const handleClickProgress = (e: MouseEvent | TouchEvent) => {
        const rect = (
            e.currentTarget as HTMLDivElement
        ).getBoundingClientRect();
        const x = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
        const width = rect.width;
        const percent = (x - rect.left) / width;
        const duration = $playlist.items[$playlist.selected].duration;
        audioElement.currentTime = duration * percent;
    };

    const handleDeletePlaylistMusic = (idx: number) => {
        $playlist.items = $playlist.items.filter((_, i) => i !== idx);

        if ($playlist.selected === idx) {
            handleClickPlaylistMusic(0);
        }

        if ($playlist.selected > idx) {
            playPrev();
        }

        if ($playlist.items.length === 0) {
            handleClickStop();
        }
    };

    const handleClickLike = (music: MusicModel) => {
        socket.emit("like", music.id);
    };
</script>

<main>
    <Router>
        <SiteHeader />
        <Loading {isLoading} message="Loading..." />
        <Route path="/" scrollToTop={true} exact={true}>
            <div class="container">
                <Music
                    onClickMusic={handleClickMusic}
                    onClickPlayAll={handleClickPlayAll}
                    onClickPlayShuffle={handleClickPlayShuffle}
                />
            </div>
        </Route>
        <Route path="/favorite">
            <div class="container">
                <FavoriteMusic
                    onClickMusic={handleClickMusic}
                    onClickPlayAll={handleClickPlayAll}
                    onClickPlayShuffle={handleClickPlayShuffle}
                />
            </div>
        </Route>
        <Route path="/album">
            <div class="container">
                <Album onClickMusic={handleClickMusic} />
            </div>
        </Route>
        <Route path="/album/:id" let:params>
            <div class="container">
                <AlbumDetail id={params.id} onClickMusic={handleClickMusic} />
            </div>
        </Route>
        <Route path="/artist">
            <div class="container">
                <Artist onClickMusic={handleClickMusic} />
            </div>
        </Route>
        <Route path="/artist/:id" let:params>
            <div class="container">
                <ArtistDetail id={params.id} onClickMusic={handleClickMusic} />
            </div>
        </Route>
        <Route path="/setting">
            <div class="container">
                <Setting />
            </div>
        </Route>

        <Player
            bind:audioElement
            bind:playing
            bind:volume
            bind:progress
            music={$playlist.items[$playlist.selected]}
            onClickPlay={handleClickPlay}
            onClickStop={handleClickStop}
            onClickNext={playNext}
            onClickPrev={playPrev}
            onClickLike={handleClickLike}
            onClickProgress={handleClickProgress}
            onClickNowMusic={handleClickPlaylistMusic}
            onDeleteNowMusic={handleDeletePlaylistMusic}
        />

        <MusicDetailPanel
            onClickLike={handleClickLike}
            onClickAddToQueue={handleClickMusic}
        />
    </Router>
</main>
