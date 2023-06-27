<script lang="ts">
    import { onMount } from "svelte";

    import { getImage } from "../modules/image";

    let imageRef: HTMLImageElement;
    export let src: string;
    export let alt: string;
    export let style: string = "";
    let className: string = "";
    export { className as class };
    export let loading: "lazy" | "eager" = "lazy";

    onMount(() => {
        if (loading === "lazy") {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        imageRef.src = getImage(src);
                        observer.unobserve(imageRef);
                    }
                });
            });
            observer.observe(imageRef);
        }
    });
</script>

{#if loading === "lazy"}
    <img
        bind:this={imageRef}
        class={className}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NgYGD4DwABBAEAwS2OUAAAAABJRU5ErkJggg=="
        {style}
    />
{:else}
    <img src={getImage(src)} {alt} class={className} {style} />
{/if}
