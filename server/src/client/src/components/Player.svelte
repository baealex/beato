<script lang="ts">
    import { onMount } from "svelte";

    import Queue from "./Queue.svelte";
    import SubPage from "./SubPage.svelte";

    import Play from "../icons/Play.svelte";
    import Pause from "../icons/Pause.svelte";
    import Menu from "../icons/Menu.svelte";
    import ArrowRepaet from "../icons/ArrowRepaet.svelte";
    import Infinite from "../icons/Infinite.svelte";
    import RightLeft from "../icons/RightLeft.svelte";
    import Shuffle from "../icons/Shuffle.svelte";

    import type { Music } from "../models/type";

    import { getImage } from "../modules/image";
    import { makePlayTime } from "../modules/time";

    import {
        queue,
        switchRepeatMode,
        shuffleQueue,
        musicActionPanel,
    } from "../store";

    export let music: Music;
    export let volume: number;
    export let playing: boolean;
    export let progress: number;
    export let onClickPlay: () => void;
    export let onClickNext: () => void;
    export let onClickPrev: () => void;
    export let onClickProgress: (e: MouseEvent | TouchEvent) => void;

    let isOpenPlayer = false;
    let isOpenQueue = false;
    let randomBorderRadius = "50% 50% 50% 50%";

    $: totalTime = makePlayTime(music?.duration);
    $: currentTime = makePlayTime(music?.duration * (progress / 100));

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

    onMount(() => {
        const setRandomBorderRadius = () => {
            if (playing && isOpenPlayer) {
                const makeRandom = () => {
                    return Math.floor(Math.random() * 90 + 10) + "%";
                };
                randomBorderRadius = `${makeRandom()} ${makeRandom()} ${makeRandom()} ${makeRandom()}`;
            }
            setTimeout(setRandomBorderRadius, 1000);
        };
        setRandomBorderRadius();
    });
</script>

{#if music}
    <div class="audio" class:open={music}>
        {#if !isOpenPlayer}
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
                    on:click={() => (isOpenPlayer = true)}
                    on:keydown={() => (isOpenPlayer = true)}
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
                    <button
                        class="icon-button mode"
                        on:click={() => switchRepeatMode()}
                    >
                        {#if $queue.repeatMode === "off"}
                            <RightLeft />
                        {:else if $queue.repeatMode === "all"}
                            <ArrowRepaet />
                        {:else if $queue.repeatMode === "one"}
                            <Infinite />
                        {/if}
                    </button>
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
                    <button
                        class="icon-button shuffle"
                        class:active={$queue.shuffle}
                        on:click={shuffleQueue}
                    >
                        <Shuffle />
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
        {/if}
    </div>
    <SubPage isOpen={isOpenPlayer} onClose={() => (isOpenPlayer = false)}>
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
                    src={getImage(music.album.cover.replace("/resized", ""))}
                    alt={music.album.name}
                />
            </div>
            <div class="title-info">
                <button
                    class="clickable title"
                    on:click={() =>
                        musicActionPanel.update(() => ({
                            music,
                            isOpen: true,
                            onClose: () => (isOpenPlayer = false),
                        }))}
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
            {#if isOpenPlayer}
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
            {/if}
            <div class="action">
                <button
                    class="icon-button mode"
                    on:click={() => switchRepeatMode()}
                >
                    {#if $queue.repeatMode === "off"}
                        <RightLeft />
                    {:else if $queue.repeatMode === "all"}
                        <ArrowRepaet />
                    {:else if $queue.repeatMode === "one"}
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
                    class="icon-button shuffle"
                    class:active={$queue.shuffle}
                    on:click={shuffleQueue}
                >
                    <Shuffle />
                </button>
            </div>
        </div>
    </SubPage>
{/if}

<Queue bind:isOpen={isOpenQueue} />

<style lang="scss">
    .cross {
        :global(svg) {
            width: 1.125rem;
            height: 1.125rem;
        }
    }

    .mode,
    .shuffle,
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
        background-color: #111;
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

                .mode,
                .shuffle,
                .cross,
                .volume,
                .skip-back {
                    @media (max-width: 768px) {
                        display: none;
                    }
                }

                .shuffle.active {
                    color: #a076f1;
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

            .mode,
            .shuffle {
                :global(svg) {
                    width: 1.25rem;
                    height: 1.25rem;
                }
            }

            .shuffle.active {
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
</style>
