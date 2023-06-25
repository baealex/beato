<script lang="ts">
    import { onMount } from "svelte";
    import { Link } from "svelte-routing";

    import type { Album } from "../models/type";
    import { getImage } from "../modules/image";
    import { graphQLRequest } from "../api";

    let albums: Album[] = [];

    onMount(async () => {
        const { data } = await graphQLRequest<"allAlbums", Album[]>(`
            query {
                allAlbums {
                    id
                    name
                    cover
                    artist {
                        id
                        name
                    }
                }
            }
        `);

        albums = data.allAlbums;
    });
</script>

<div class="grid">
    {#each albums as album}
        <Link to={`/album/${album.id}`}>
            <div class="item">
                <img
                    class="album-cover"
                    src={getImage(album.cover)}
                    alt=""
                    loading="lazy"
                />
                <div class="album-title">
                    {album.name}
                </div>
                <div class="album-artist">
                    {album.artist.name}
                </div>
            </div>
        </Link>
    {/each}
</div>

<style lang="scss">
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: 1rem;
        list-style: none;
        padding: 1rem;

        :global(a) {
            text-decoration: none;
            color: inherit;
        }

        .item {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            border-radius: 0.5rem;
            background-color: #111111;
            transition: background-color 0.2s ease-in-out;
            overflow: hidden;
            padding-bottom: 0.5rem;

            &:hover {
                background-color: #222222;
            }

            .album-cover {
                width: 100%;
                height: auto;
                border-radius: 0.5rem;
                padding-bottom: 0.5rem;
            }

            .album-title {
                padding: 0 0.5rem;
                font-size: 1.2rem;
                font-weight: bold;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .album-artist {
                padding: 0 0.5rem;
                font-size: 1rem;
                color: #aaaaaa;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
</style>
