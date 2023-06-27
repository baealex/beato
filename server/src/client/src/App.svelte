<script lang="ts">
    import { onMount } from "svelte";
    import { Router, Route } from "svelte-routing";

    import SiteHeader from "./components/SiteHeader.svelte";
    import Player from "./components/Player.svelte";
    import Loading from "./components/Loading.svelte";
    import Music from "./pages/Music.svelte";
    import Album from "./pages/Album.svelte";
    import AlbumDetail from "./pages/AlbumDetail.svelte";
    import Artist from "./pages/Artist.svelte";
    import ArtistDetail from "./pages/ArtistDetail.svelte";
    import Setting from "./pages/Setting.svelte";

    import { musics, playlist, syncData } from "./store";

    import { socket } from "./modules/socket";
    import { toast } from "./modules/ui/toast";

    import type { Music as MusicModel } from "./models/type";

    let audioElement: HTMLAudioElement;
    let savedChunk: {
        [key: string]: Buffer[];
    } = {};
    let playing = false;
    let volume = 0.5;
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
            async ({ id, chunk }: { id: string; chunk: Buffer | "end" }) => {
                if (chunk === "end") {
                    if ($playlist.items[$playlist.selected].id === id) {
                        setAndPlayAudio(savedChunk[id]);
                    }
                    return;
                }
                if (!savedChunk?.[id]) {
                    savedChunk[id] = [];
                }
                savedChunk[id].push(chunk);
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

    const handleClickMusic = (music: MusicModel) => {
        if (!$playlist.items.map((item) => item.id).includes(music.id)) {
            $playlist.items = [...$playlist.items, music];
            toast("Added to end of playlist");
        } else {
            toast("Already added to playlist");
        }

        if ($playlist.selected === null) {
            $playlist.selected = 0;
            requestFile($playlist.items[$playlist.selected].id);
        }
    };

    const handleClickPlayAll = () => {
        $playlist.selected = 0;
        $playlist.items = [...$musics];
        handleClickPlaylistMusic(0);
    };

    const handleClickPlayShuffle = () => {
        const copyMusics = [...$musics];
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

        toast("Deleted from playlist");
    };
</script>

<main>
    <Router>
        <SiteHeader />
        <Loading {isLoading} message="데이터 불러오는 중..." />
        <div class="container">
            <Route
                path="/"
                component={Music}
                onClickMusic={handleClickMusic}
                onClickPlayAll={handleClickPlayAll}
                onClickPlayShuffle={handleClickPlayShuffle}
            />
            <Route
                path="/album"
                component={Album}
                onClickMusic={handleClickMusic}
            />
            <Route
                path="/album/:id"
                component={AlbumDetail}
                onClickMusic={handleClickMusic}
            />
            <Route
                path="/artist"
                component={Artist}
                onClickMusic={handleClickMusic}
            />
            <Route
                path="/artist/:id"
                component={ArtistDetail}
                onClickMusic={handleClickMusic}
            />
            <Route path="/setting" component={Setting} />
        </div>

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
            onClickProgress={handleClickProgress}
            onClickNowMusic={handleClickPlaylistMusic}
            onDeleteNowMusic={handleDeletePlaylistMusic}
        />
    </Router>
</main>
