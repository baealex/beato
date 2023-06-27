<script lang="ts">
    import { onMount } from "svelte";
    import { Router, Route } from "svelte-routing";

    import Music from "./pages/Music.svelte";
    import Album from "./pages/Album.svelte";
    import Artist from "./pages/Artist.svelte";
    import Setting from "./pages/Setting.svelte";

    import SiteHeader from "./components/SiteHeader.svelte";

    import { musics } from "./store/musics";
    import { playlist } from "./store/playlist";

    import { socket } from "./modules/socket";
    import { toast } from "./modules/ui/toast";

    import type { Music as MusicModel } from "./models/type";
    import AlbumDetail from "./pages/AlbumDetail.svelte";
    import ArtistDetail from "./pages/ArtistDetail.svelte";
    import Player from "./components/Player.svelte";

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
            progress = Number(
                (
                    (audioElement.currentTime /
                        $playlist.items[$playlist.selected].duration) *
                    100
                ).toFixed(2)
            );

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

    const handleClickPlayAll = () => {
        $playlist.selected = 0;
        $playlist.items = [...$musics];
        handleClickPlaylistMusic(0);
    };

    const handleClickPlayShuffle = () => {
        const shuffleMusics = [...$musics].sort(() => Math.random() - 0.5);
        $playlist.selected = 0;
        $playlist.items = shuffleMusics;
        handleClickPlaylistMusic(0);
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
        chunks = [];
        countFlag = true;
        socket.emit("file", $playlist.items[$playlist.selected].filePath);
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

        toast("플레이리스트에서 삭제되었습니다.");
    };
</script>

<main>
    <Router>
        <SiteHeader />
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
