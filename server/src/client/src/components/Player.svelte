<script lang="ts">
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";

    import Image from "./Image.svelte";
    import SubPage from "./SubPage.svelte";
    import Now from "./Now.svelte";
    import Play from "../icons/Play.svelte";
    import Pause from "../icons/Pause.svelte";
    import Cross from "../icons/Cross.svelte";
    import Menu from "../icons/Menu.svelte";

    import type { Music } from "../models/type";

    export let music: Music;
    export let audioElement: HTMLAudioElement;
    export let progress: number;
    export let playing: boolean;
    export let volume: number;
    export let onClickPlay: () => void;
    export let onClickNext: () => void;
    export let onClickPrev: () => void;
    export let onClickStop: () => void;
    export let onClickNowMusic: (idx: number) => void;
    export let onDeleteNowMusic: (idx: number) => void;
    export let onClickProgress: (e: MouseEvent | TouchEvent) => void;

    let isOpenDetail = false;
    let isOpenNow = false;

    $: totalTime = `${Math.floor(music?.duration / 60) | 0}:${(
        "0" +
        (Math.round(music?.duration) % 60)
    ).slice(-2)}`;
    $: currentTime = `${
        (Math.floor(music?.duration * (progress / 100)) / 60) | 0
    }:${("0" + (Math.floor(music?.duration * (progress / 100)) % 60)).slice(
        -2
    )}`;

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
</script>

{#if music}
    <div class="audio" class:open={music}>
        <div
            class="progress"
            on:keydown={() => {}}
            on:mousemove={(e) => {
                if (e.buttons === 1) {
                    onClickProgress(e);
                }
            }}
            on:touchmove={(e) => {
                if (e.touches.length === 1) {
                    onClickProgress(e);
                }
            }}
            on:click={onClickProgress}
        >
            <div
                class="bar"
                style={`transform: translate(-${100 - progress}%, 0)`}
            />
        </div>
        <div class="player">
            <div class="music" on:click={() => (isOpenDetail = true)}>
                <Image
                    class="album-art"
                    alt={music.album.name}
                    src={music.album.cover}
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
                <button class="skip-back" on:click={onClickPrev}>
                    <Play />
                </button>
                <button on:click={onClickPlay}>
                    {#if playing}
                        <Pause />
                    {:else}
                        <Play />
                    {/if}
                </button>
                <button class="skip-forward" on:click={onClickNext}>
                    <Play />
                </button>
                <button class="cross" on:click={onClickStop}>
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
                <button on:click={() => (isOpenNow = !isOpenNow)}>
                    <Menu />
                </button>
            </div>
        </div>
    </div>
{/if}

<Now
    isOpen={isOpenNow}
    onClose={() => {
        isOpenNow = false;
    }}
    onClickMusic={onClickNowMusic}
    onDeleteMusic={onDeleteNowMusic}
/>

{#if music}
    <SubPage isOpen={isOpenDetail} onClose={() => (isOpenDetail = false)}>
        <div class="detail">
            <div class="album-art">
                <Image
                    class="background"
                    style={`border-radius: ${randomBorderRadius}`}
                    src={music.album.cover}
                    alt={music.album.name}
                />
                <Image
                    class="foreground"
                    style={`border-radius: ${randomBorderRadius}`}
                    src={music.album.cover}
                    alt={music.album.name}
                />
            </div>
            <div class="title">
                <div class="name">{music.name}</div>
                <div class="artist">
                    <a
                        href={`/artist/${music.artist.id}`}
                        on:click={(e) => {
                            e.preventDefault();
                            isOpenDetail = false;
                            navigate(`/artist/${music.artist.id}`);
                        }}
                    >
                        {music.artist.name}
                    </a>
                </div>
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
                on:mousemove={(e) => {
                    if (e.buttons === 1) {
                        onClickProgress(e);
                    }
                }}
                on:touchmove={(e) => {
                    if (e.touches.length === 1) {
                        onClickProgress(e);
                    }
                }}
                on:click={onClickProgress}
            >
                <div
                    class="bar"
                    style="transform: translate(-{100 - progress}%);"
                />
            </div>
            <div class="action">
                <button class="skip-back" on:click={onClickPrev}>
                    <Play />
                </button>
                <button on:click={onClickPlay}>
                    {#if playing}
                        <Pause />
                    {:else}
                        <Play />
                    {/if}
                </button>
                <button class="skip-forward" on:click={onClickNext}>
                    <Play />
                </button>
            </div>
        </div>
    </SubPage>
{/if}

<audio bind:this={audioElement} />

<style lang="scss">
    button {
        position: relative;
        width: 3rem;
        height: 3rem;
        border-radius: 0.25rem;
        background-color: transparent;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 0.8rem;
        font-weight: bold;
        text-transform: uppercase;
        transition: background-color 0.25s ease-in-out;

        :global(svg) {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 1.5rem;
            height: 1.5rem;
        }

        &:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }
    }

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
        gap: 0.5rem;
        transition: transform 0.25s ease-in-out;

        .progress {
            width: 100%;
            height: 0.25rem;
            background-color: rgba(255, 255, 255, 0.1);
            transition: height 0.25s ease-in-out;

            .bar {
                height: 100%;
                width: 100%;
                transform: translate(-100%, 0);
                transition: transform 0.25s;
                background-color: #a076f1;
            }

            &:hover {
                cursor: pointer;
                height: 0.5rem;
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

            .action {
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 0.25rem;

                .cross,
                .skip-back,
                .volume {
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

                    &:hover {
                        background-color: rgba(255, 255, 255, 0.2);
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

            :global(.foreground) {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 50%;
                transition: border-radius 1s
                    cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }

            :global(.background) {
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

        .title {
            margin-top: 2.5rem;

            .name {
                font-size: 1.25rem;
                margin-bottom: 0.5rem;
                font-weight: bold;
            }

            .artist {
                font-size: 0.875rem;
                color: #888;
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

            button {
                width: 4rem;
                height: 4rem;
                border-radius: 50%;
                background-color: transparent;
                border: none;
                cursor: pointer;
                transition: background-color 0.25s ease-in-out;

                &:hover {
                    background-color: rgba(255, 255, 255, 0.2);
                }
            }
        }
    }
</style>
