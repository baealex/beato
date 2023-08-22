<script lang="ts">
    import { Select } from "~/components";

    import { player } from "~/store";

    import type { CoverAnimation } from "~/store";

    const handleChangePlayMode = (value: CoverAnimation) => {
        player.update((state) => ({
            ...state,
            coverAnimation: value,
        }));
    };
</script>

<p>Album cover animation type</p>
<Select
    title="Album cover animation type"
    value={$player.coverAnimation}
    onChange={handleChangePlayMode}
    options={[
        { value: "bounce", label: "Bounce around" },
        { value: "rotate", label: "CD Player" },
        { value: "none", label: "None" },
    ]}
/>

<style>
    .buttons {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
</style>
