<script lang="ts">
    import { afterUpdate, onDestroy, onMount } from "svelte";

    import { getImage } from "../../modules/image";

    let imageRef: HTMLImageElement;
    export let src: string;
    export let alt: string;
    export let style: string = "";
    let className: string = "";
    export { className as class };
    export let loading: "lazy" | "eager" = "lazy";

    let loadded: boolean = false;
    let observer: IntersectionObserver = null;

    const lazyLoading = () => {
        if (loading === "lazy") {
            observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        imageRef.src = getImage(src);
                        imageRef.onload = () => {
                            loadded = true;
                        };
                        observer.unobserve(imageRef);
                    }
                });
            });
            observer.observe(imageRef);
        }
    };

    onMount(() => {
        lazyLoading();
    });

    afterUpdate(() => {
        const prevSrc = imageRef.src.replace(location.origin, "");
        if (loading === "lazy" && loadded && prevSrc !== getImage(src)) {
            loadded = false;
            lazyLoading();
        }
    });

    onDestroy(() => {
        if (observer) {
            observer.unobserve(imageRef);
        }
    });
</script>

{#if loading === "lazy"}
    <img
        bind:this={imageRef}
        class={className}
        class:lazy={true}
        class:load={loadded}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NgYGD4DwABBAEAwS2OUAAAAABJRU5ErkJggg=="
        {alt}
        {style}
    />
{:else}
    <img src={getImage(src)} {alt} class={className} {style} />
{/if}

<style lang="scss">
    img.lazy {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }

    img.load {
        opacity: 1;
    }
</style>
