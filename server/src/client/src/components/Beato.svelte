<script>
    import { Link } from "svelte-routing";

    export let dance = false;
    export let spin = false;
    export let hasSpeechBubble = false;
</script>

<div
    class:speech-bubble={hasSpeechBubble}
    class:animate-dance={dance}
    class:animate-dance--paused={!dance}
    class:animate-spin={spin}
    class:animate-spin--paused={!spin}
>
    {`(㇏(•̀ᵥᵥ•́)ノ)`}
</div>

<style lang="scss">
    @keyframes dance {
        0% {
            transform: rotate(0deg) scale(1);
        }
        25% {
            transform: rotate(5deg);
        }
        50% {
            transform: rotate(0deg) scale(1.2);
        }
        75% {
            transform: rotate(-5deg);
        }
        100% {
            transform: rotate(0deg) scale(1);
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(-360deg);
        }
    }

    div {
        margin: 0;
        font-size: 1rem;
        transform: translateX(-50%);

        &.speech-bubble:hover {
            &::after {
                content: "노래... 들으셔야죠?";
                position: absolute;
                bottom: -70px;
                left: 50%;
                transform: translateX(-50%);
                padding: 1rem;
                text-align: center;
                width: 200px;
                color: #ccc;
                background-color: #222;
                border-radius: 10px;
                z-index: 1;
            }

            &::before {
                content: "";
                position: absolute;
                bottom: -20px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border: 10px solid transparent;
                border-bottom-color: #222;
                z-index: 1;
            }
        }

        &.animate-dance {
            animation: dance 1s infinite;
            &:hover {
                &.speech-bubble::after {
                    content: "몸이 멈추지 않아 ㅠ";
                }
            }
        }

        &.animate-dance--paused {
            animation-play-state: paused;
        }

        &.animate-spin {
            animation: spin 1s ease-in-out infinite;
        }

        &.animate-spin--paused {
            animation-play-state: paused;
        }
    }
</style>
