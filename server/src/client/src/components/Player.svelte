<script lang="ts">
    import { onMount } from "svelte";

    import { Queue, SubPage } from "~/components";

    import * as Icon from "~/icons";

    import type { Music } from "~/models/type";

    import { getImage } from "~/modules/image";
    import { makePlayTime } from "~/modules/time";

    import {
        queue,
        player,
        switchRepeatMode,
        shuffleQueue,
        musicActionPanel,
    } from "~/store";

    export let music: Music;
    export let playing: boolean;
    export let progress: number;
    export let currentTime: number;
    export let onClickPlay: () => void;
    export let onClickPause: () => void;
    export let onClickNext: () => void;
    export let onClickPrev: () => void;
    export let onClickProgress: (e: MouseEvent | TouchEvent) => void;

    let isOpenPlayer = false;
    let isOpenQueue = false;
    let randomBorderRadius = "50% 50% 50% 50%";
    let timer: ReturnType<typeof setTimeout>;

    $: totalTimeText = makePlayTime(music?.duration);
    $: currentTimeText = makePlayTime(currentTime);

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
        player.subscribe((state) => {
            if (state.coverAnimation === "bounce") {
                const setRandomBorderRadius = () => {
                    if (playing && isOpenPlayer) {
                        const makeRandom = () => {
                            return Math.floor(Math.random() * 90 + 10) + "%";
                        };
                        randomBorderRadius = `${makeRandom()} ${makeRandom()} ${makeRandom()} ${makeRandom()}`;
                    }
                    timer = setTimeout(setRandomBorderRadius, 1000);
                };
                setRandomBorderRadius();
            }

            if (state.coverAnimation === "rotate") {
                clearTimeout(timer);
                randomBorderRadius = "50% 50% 50% 50%";
            }

            if (state.coverAnimation === "none") {
                clearTimeout(timer);
                randomBorderRadius = "50% 50% 50% 50%";
            }
        });
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
                            <Icon.RightLeft />
                        {:else if $queue.repeatMode === "all"}
                            <Icon.ArrowRepeat />
                        {:else if $queue.repeatMode === "one"}
                            <Icon.Infinite />
                        {/if}
                    </button>
                    <button
                        class="icon-button skip-back"
                        on:click={onClickPrev}
                    >
                        <Icon.Play />
                    </button>
                    <button
                        class="icon-button"
                        on:click={playing ? onClickPause : onClickPlay}
                    >
                        {#if playing}
                            <Icon.Pause />
                        {:else}
                            <Icon.Play />
                        {/if}
                    </button>
                    <button
                        class="icon-button skip-forward"
                        on:click={onClickNext}
                    >
                        <Icon.Play />
                    </button>
                    <button
                        class="icon-button shuffle"
                        class:active={$queue.shuffle}
                        on:click={shuffleQueue}
                    >
                        <Icon.Shuffle />
                    </button>
                    <button
                        class="icon-button"
                        on:click={() => (isOpenQueue = !isOpenQueue)}
                    >
                        <Icon.Menu />
                    </button>
                </div>
            </div>
        {/if}
    </div>
    <SubPage
        isOpen={isOpenPlayer}
        onClose={() => (isOpenPlayer = false)}
        animationDirection="BottomToTop"
    >
        <div class="detail">
            <div
                class="album-art"
                class:cd-shape={$player.coverAnimation === "rotate"}
            >
                <img
                    class="background"
                    style={`border-radius: ${randomBorderRadius}`}
                    src={getImage(music.album.cover)}
                    alt={music.album.name}
                />
                <div class="foreground-wrapper">
                    <img
                        class="foreground"
                        class:playing
                        class:rotate={$player.coverAnimation === "rotate"}
                        style={`border-radius: ${randomBorderRadius}`}
                        src={getImage(
                            music.album.cover.replace("/resized", "")
                        )}
                        alt={music.album.name}
                    />
                </div>
            </div>
            <div class="title-info">
                <button
                    class="clickable title"
                    on:click={() =>
                        musicActionPanel.update(() => ({
                            music,
                            isOpen: true,
                            onPageMove: () => (isOpenPlayer = false),
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
                    {currentTimeText}
                </div>
                <div class="total-time">
                    {totalTimeText}
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
                        <Icon.RightLeft />
                    {:else if $queue.repeatMode === "all"}
                        <Icon.ArrowRepeat />
                    {:else if $queue.repeatMode === "one"}
                        <Icon.Infinite />
                    {/if}
                </button>
                <div class="playback">
                    <button
                        class="icon-button skip-back"
                        on:click={onClickPrev}
                    >
                        <Icon.Play />
                    </button>
                    <button
                        class="icon-button"
                        on:click={playing ? onClickPause : onClickPlay}
                    >
                        {#if playing}
                            <Icon.Pause />
                        {:else}
                            <Icon.Play />
                        {/if}
                    </button>
                    <button
                        class="icon-button skip-forward"
                        on:click={onClickNext}
                    >
                        <Icon.Play />
                    </button>
                </div>
                <button
                    class="icon-button shuffle"
                    class:active={$queue.shuffle}
                    on:click={shuffleQueue}
                >
                    <Icon.Shuffle />
                </button>
            </div>
        </div>
    </SubPage>
{/if}

<Queue bind:isOpen={isOpenQueue} />

<style lang="scss">
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
                .skip-back {
                    @media (max-width: 768px) {
                        display: none;
                    }
                }

                .shuffle.active {
                    color: #a076f1;
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
        padding: 1rem;

        .album-art {
            position: relative;
            max-width: 100%;
            width: 300px;
            height: 300px;

            @media (max-width: 332px) {
                height: calc(100vw - 2rem);
            }

            &.cd-shape {
                box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.18);
                border-radius: 50%;

                &::before,
                &::after {
                    content: "";
                    position: absolute;
                    z-index: 1;
                    top: 50%;
                    left: 50%;
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    width: 48px;
                    height: 48px;
                    background-color: rgba(255, 255, 255, 0.18);
                }

                &::after {
                    width: 32px;
                    height: 32px;
                    background-color: #000000;
                }
            }

            .foreground-wrapper {
                overflow: hidden;
                aspect-ratio: 1/1;
            }

            .foreground {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 50%;
                transition: border-radius 1s
                    cubic-bezier(0.175, 0.885, 0.32, 1.275);

                @keyframes rotate {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }

                &.rotate {
                    animation: rotate 3s linear infinite;
                    animation-play-state: paused;
                }

                &.rotate.playing {
                    animation-play-state: running;
                }
            }

            .background {
                position: absolute;
                top: 48px;
                left: 0;
                width: 100%;
                height: 100%;
                transform: scale(0.88);
                object-fit: cover;
                border-radius: 50%;
                opacity: 0.5;
                z-index: -1;
                filter: blur(48px);
                transition: border-radius 1s
                    cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
        }

        .title-info {
            margin-top: 3rem;
            width: 500px;
            max-width: 100%;

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
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: space-between;

            .playback {
                display: flex;
                justify-content: space-between;
            }

            .shuffle.active {
                :global(svg) {
                    color: #a076f1;
                }
            }

            @media (max-width: 400px) {
                .playback {
                    width: 100%;
                    order: -1;
                    margin-bottom: 1rem;
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
