<script lang="ts">
    import { onMount } from "svelte";
    import { Link } from "svelte-routing";

    import type { Artist } from "../models/type";
    import { getImage } from "../modules/image";

    import { graphQLRequest } from "../api";

    import { artists } from "../store";

    onMount(async () => {
        const { data } = await graphQLRequest<"allArtists", Artist[]>(`
            query {
                allArtists {
                    id
                    name
                    latestAlbum {
                        cover
                    }
                    albumCount
                    musicCount
                }
            }
        `);

        $artists = data.allArtists;
    });
</script>

<ul>
    {#each $artists as artist}
        <Link to={`/artist/${artist.id}`}>
            <li>
                <img
                    loading="lazy"
                    src={getImage(artist.latestAlbum.cover)}
                    alt={artist.name}
                />
                <div class="info">
                    <div class="name">
                        {artist.name}
                    </div>
                    <div class="count">
                        <div class="album">
                            {artist.albumCount}개의 앨범
                        </div>
                        <span> / </span>
                        <div class="music">
                            {artist.musicCount}개의 음악
                        </div>
                    </div>
                </div>
            </li>
        </Link>
    {/each}
</ul>

<style lang="scss">
    :global(a) {
        text-decoration: none;
        color: inherit;
    }

    ul {
        margin: 0;
        padding: 0;
        list-style: none;

        li {
            cursor: pointer;
            padding: 1rem;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.75rem;

            img {
                width: 4rem;
                height: 4rem;
                object-fit: cover;
                border-radius: 100%;
            }

            .info {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
            }

            .count {
                display: flex;
                gap: 0.25rem;
                font-size: 0.75rem;
                color: rgba(255, 255, 255, 0.5);
            }

            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }
    }
</style>
