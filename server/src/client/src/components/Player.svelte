<script lang="ts">
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";

    import Queue from "./Queue.svelte";
    import SubPage from "./SubPage.svelte";
    import BottomPanel from "./BottomPanel.svelte";

    import Play from "../icons/Play.svelte";
    import Pause from "../icons/Pause.svelte";
    import Cross from "../icons/Cross.svelte";
    import Menu from "../icons/Menu.svelte";
    import Heart from "../icons/Heart.svelte";

    import type { Music, RepeatMode } from "../models/type";

    import { getImage } from "../modules/image";

    import ArrowRepaet from "../icons/ArrowRepaet.svelte";
    import Infinite from "../icons/Infinite.svelte";
    import RightLeft from "../icons/RightLeft.svelte";

    export let music: Music;
    export let audioElement: HTMLAudioElement;
    export let progress: number;
    export let playing: boolean;
    export let volume: number;
    export let repeatMode: RepeatMode;
    export let onClickPlay: () => void;
    export let onClickNext: () => void;
    export let onClickPrev: () => void;
    export let onClickStop: () => void;
    export let onClickLike: (music: Music) => void;
    export let onClickQueueMusic: (idx: number) => void;
    export let onDeleteQueueMusic: (idx: number) => void;
    export let onClickProgress: (e: MouseEvent | TouchEvent) => void;

    let isOpenDetailPanel = false;
    let isOpenDetail = false;
    let isOpenQueue = false;

    const makePlayTime = (time: number) => {
        return `${Math.floor(time / 60) | 0}:${(
            "0" +
            (Math.round(time) % 60)
        ).slice(-2)}`;
    };

    $: totalTime = makePlayTime(music?.duration);
    $: currentTime = makePlayTime(music?.duration * (progress / 100));

    let randomBorderRadius = "50% 50% 50% 50%";

    onMount(() => {
        const setRandomBorderRadius = () => {
            if (playing) {
                const makeRandom = () => {
                    return Math.floor(Math.random() * 90 + 10) + "%";
                };
                randomBorderRadius = `${makeRandom()} ${makeRandom()} ${makeRandom()} ${makeRandom()}`;
            }
            setTimeout(setRandomBorderRadius, 1000);
        };
        setRandomBorderRadius();
    });

    const handleMoveProgress = (e: MouseEvent | TouchEvent) => {
        if (e instanceof MouseEvent && e.buttons === 1) {
            onClickProgress(e);
            return;
        }

        if (
            window.TouchEvent &&
            e instanceof TouchEvent &&
            e.touches.length === 1
        ) {
            onClickProgress(e);
        }
    };
</script>

{#if music}
    <div class="audio" class:open={music}>
        <div
            class="progress"
            role="slider"
            tabindex="0"
            aria-valuenow={progress}
            on:click={onClickProgress}
            on:keydown={() => {}}
            on:mousemove={handleMoveProgress}
            on:touchmove={handleMoveProgress}
        >
            <div
                class="bar"
                style={`transform: translate(-${100 - progress}%, 0)`}
            />
        </div>
        <div class="player">
            <div
                class="music"
                role="button"
                tabindex="0"
                on:click={() => (isOpenDetail = true)}
                on:keydown={() => (isOpenDetail = true)}
            >
                <img
                    class="album-art"
                    alt={music.album.name}
                    src={getImage(music.album.cover)}
                />
                <div class="info">
                    <div class="title">
                        {music.name}
                    </div>
                    <div class="artist">
                        {music.artist.name}
                    </div>
                </div>
            </div>
            <div class="action">
                <button class="icon-button skip-back" on:click={onClickPrev}>
                    <Play />
                </button>
                <button class="icon-button" on:click={onClickPlay}>
                    {#if playing}
                        <Pause />
                    {:else}
                        <Play />
                    {/if}
                </button>
                <button class="icon-button skip-forward" on:click={onClickNext}>
                    <Play />
                </button>
                <button class="icon-button cross" on:click={onClickStop}>
                    <Cross />
                </button>
                <input
                    bind:value={volume}
                    class="volume"
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                />
                <button
                    class="icon-button"
                    on:click={() => (isOpenQueue = !isOpenQueue)}
                >
                    <Menu />
                </button>
            </div>
        </div>
    </div>
{/if}

<Queue
    isOpen={isOpenQueue}
    onClose={() => {
        isOpenQueue = false;
    }}
    onClickMusic={onClickQueueMusic}
    onDeleteMusic={onDeleteQueueMusic}
/>

{#if music}
    <SubPage isOpen={isOpenDetail} onClose={() => (isOpenDetail = false)}>
        <div class="detail">
            <div class="album-art">
                <img
                    class="background"
                    style={`border-radius: ${randomBorderRadius}`}
                    src={getImage(music.album.cover)}
                    alt={music.album.name}
                />
                <img
                    class="foreground"
                    style={`border-radius: ${randomBorderRadius}`}
                    src={getImage(music.album.cover)}
                    alt={music.album.name}
                />
            </div>
            <div class="title-info">
                <button
                    class="clickable title"
                    on:click={() => (isOpenDetailPanel = true)}
                >
                    <div class="name">
                        {music.name}
                    </div>
                    <div class="artist">
                        {music.artist.name}
                    </div>
                </button>
            </div>
            <div class="time-info">
                <div class="current-time">
                    {currentTime}
                </div>
                <div class="total-time">
                    {totalTime}
                </div>
            </div>
            <div
                class="progress"
                role="slider"
                tabindex="0"
                aria-valuenow={progress}
                on:click={onClickProgress}
                on:keydown={() => {}}
                on:mousemove={handleMoveProgress}
                on:touchmove={handleMoveProgress}
            >
                <div
                    class="bar"
                    style="transform: translate(-{100 - progress}%);"
                />
            </div>
            <div class="action">
                <button
                    class="icon-button fill"
                    on:click={() => {
                        switch (repeatMode) {
                            case "no":
                                repeatMode = "all";
                                break;
                            case "all":
                                repeatMode = "one";
                                break;
                            case "one":
                                repeatMode = "no";
                                break;
                        }
                    }}
                >
                    {#if repeatMode === "no"}
                        <RightLeft />
                    {:else if repeatMode === "all"}
                        <ArrowRepaet />
                    {:else if repeatMode === "one"}
                        <Infinite />
                    {/if}
                </button>
                <div>
                    <button
                        class="icon-button skip-back"
                        on:click={onClickPrev}
                    >
                        <Play />
                    </button>
                    <button class="icon-button" on:click={onClickPlay}>
                        {#if playing}
                            <Pause />
                        {:else}
                            <Play />
                        {/if}
                    </button>
                    <button
                        class="icon-button skip-forward"
                        on:click={onClickNext}
                    >
                        <Play />
                    </button>
                </div>
                <button
                    class="icon-button heart"
                    class:like={music.isLiked}
                    on:click={() => onClickLike(music)}
                >
                    <Heart />
                </button>
            </div>
        </div>
    </SubPage>

    <BottomPanel bind:isOpen={isOpenDetailPanel}>
        <div class="panel-content">
            <div class="panel-title">Related to this music</div>
            <button
                class="clickable linkable panel-album"
                on:click={() => {
                    isOpenDetailPanel = false;
                    isOpenDetail = false;
                    navigate(`/album/${music.album.id}`);
                }}
            >
                <img src={getImage(music.album.cover)} alt={music.album.name} />
                <div>
                    <div class="panel-sub-title">Album</div>
                    <div class="panel-sub-content">
                        {music.album.name}
                    </div>
                </div>
            </button>
            <button
                class="clickable linkable panel-artist"
                on:click={() => {
                    isOpenDetailPanel = false;
                    isOpenDetail = false;
                    navigate(`/artist/${music.artist.id}`);
                }}
            >
                <div class="panel-sub-title">Artist</div>
                <div class="panel-sub-content">
                    {music.artist.name}
                </div>
            </button>
        </div>
    </BottomPanel>
{/if}

<audio bind:this={audioElement} />

<style lang="scss">
    .cross {
        :global(svg) {
            width: 1.125rem;
            height: 1.125rem;
        }
    }

    .skip-back,
    .skip-forward {
        :global(svg) {
            width: 1rem;
            height: 1rem;
        }
    }

    .skip-back,
    .skip-forward {
        :global(svg) {
            transform: translate(-70%, -50%);
        }

        &::after {
            content: "";
            position: absolute;
            display: block;
            top: 50%;
            right: calc(50% - 0.5rem);
            transform: translate(-50%, -50%);
            width: 0.1rem;
            height: 0.75rem;
            background-color: #fff;
        }
    }

    .skip-back {
        transform: scaleX(-1);
    }

    .audio {
        display: flex;
        flex-direction: column;
        background-color: #111111;
        transition: transform 0.25s ease-in-out;

        .progress {
            width: 100%;
            height: 0.25rem;
            background-color: rgba(255, 255, 255, 0.1);
            transition: height 0.25s ease-in-out;

            @media (min-width: 1024px) {
                &:hover {
                    cursor: pointer;
                    height: 0.5rem;
                }
            }

            .bar {
                height: 100%;
                width: 100%;
                transform: translate(-100%, 0);
                background-color: #a076f1;
            }
        }

        .player {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem;

            .music {
                cursor: pointer;
                flex: 1 1 auto;
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 0.5rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .info {
                width: calc(100% - 45px - 0.5rem);

                .title {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }

            .action {
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 0.25rem;

                .cross,
                .volume,
                .skip-back {
                    @media (max-width: 768px) {
                        display: none;
                    }
                }

                .volume {
                    -webkit-appearance: none;
                    appearance: none;
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

                    @media (min-width: 1024px) {
                        &:hover {
                            background-color: rgba(255, 255, 255, 0.2);
                        }
                    }
                }
            }
        }
    }

    .detail {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;

        .album-art {
            position: relative;
            width: 300px;
            height: 300px;

            .foreground {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 50%;
                transition: border-radius 1s
                    cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }

            .background {
                position: absolute;
                top: 64px;
                left: 0;
                width: 90%;
                height: 90%;
                transform: translate(5%, 5%);
                object-fit: cover;
                border-radius: 50%;
                opacity: 0.45;
                z-index: -1;
                filter: blur(50px);
                transition: border-radius 1s
                    cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
        }

        .title-info {
            margin-top: 2.5rem;
            width: 500px;
            max-width: 90%;

            .title {
                .name {
                    margin-bottom: 0.5rem;
                    font-weight: bold;
                }

                .artist {
                    font-size: 0.875rem;
                    color: #888;
                }
            }
        }

        .time-info {
            margin-top: 3rem;
            display: flex;
            justify-content: space-between;
            width: 500px;
            max-width: 90%;
            margin-bottom: 0.5rem;
        }

        .progress {
            width: 500px;
            max-width: 90%;
            height: 20px;
            background-color: #333;
            border-radius: 5px;
            overflow: hidden;

            .bar {
                width: 100%;
                height: 100%;
                transform: translateX(-100%);
                background-color: #a076f1;
                animation: progress 3s infinite ease-in-out;
            }
        }

        .action {
            margin-top: 2rem;
            width: 500px;
            max-width: 90%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .fill,
            .heart {
                :global(svg) {
                    width: 1.25rem;
                    height: 1.25rem;
                }
            }

            .heart.like {
                :global(svg) {
                    fill: #a076f1;
                    color: #a076f1;
                }
            }

            button {
                width: 4rem;
                height: 4rem;
                border-radius: 50%;
                background-color: transparent;
                border: none;
                cursor: pointer;
                transition: background-color 0.25s ease-in-out;

                @media (min-width: 1024px) {
                    &:hover {
                        background-color: rgba(255, 255, 255, 0.2);
                    }
                }
            }
        }
    }

    .panel-title {
        font-size: 0.875rem;
        color: #888;
    }

    .panel-content {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .panel-album {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;

        img {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 5px;
            transition: border-radius 0.25s ease-in-out;
        }
    }

    .panel-artist {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .panel-sub-title {
        font-size: 0.875rem;
        color: #888;
    }

    .panel-sub-content {
        font-weight: bold;
    }
</style>
