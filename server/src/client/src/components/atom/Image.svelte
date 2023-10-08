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
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NQV1f/DwACYwF11mMyYQAAAABJRU5ErkJggg=="
        {alt}
        {style}
    />
{:else}
    <img src={getImage(src)} {alt} class={className} {style} />
{/if}
