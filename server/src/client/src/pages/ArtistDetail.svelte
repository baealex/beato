<script lang="ts">
    import { onMount } from "svelte";

    import Image from "../components/Image.svelte";
    import SubPage from "../components/SubPage.svelte";
    import AlbumDetail from "./AlbumDetail.svelte";

    import type { Artist, Music } from "../models/type";

    import { graphQLRequest } from "../api";

    export let id = "";
    let artist: Artist = null;
    let selectedId: string | null = null;
    let isOpenDetail = false;
    export let onClickMusic: (music: Music) => void = () => {};

    onMount(async () => {
        if (!id) {
            return;
        }

        const { data } = await graphQLRequest<"artist", Artist>(`
            query {
                artist(id: "${id}") {
                    id name
                    latestAlbum {
                        cover
                    }
                    albums {
                        id name cover
                    }
                    musics {
                        id name filePath duration trackNumber
                        artist {
                            name
                        }
                        album {
                            name cover
                        }
                    }
                }
            }
        `);

        artist = data.artist;
    });
</script>

<section>
    {#if artist}
        <div class="artist-name">
            <Image src={artist.latestAlbum.cover} alt={artist.name} />
            {artist.name}
        </div>

        <div class="section-title">Albums ({artist.albums.length})</div>
        <div class="artist-albums">
            <ul>
                {#each artist.albums as album}
                    <li>
                        <button
                            class="clickable"
                            on:click={() => {
                                selectedId = album.id;
                                isOpenDetail = true;
                            }}
                        >
                            <Image src={album.cover} alt={album.name} />
                            <div class="info">
                                <div class="name">
                                    {album.name}
                                </div>
                            </div>
                        </button>
                    </li>
                {/each}
            </ul>
        </div>

        <div class="section-title">Songs ({artist.musics.length})</div>
        <div class="artist-musics">
            <ul>
                {#each artist.musics as music}
                    <li>
                        <button
                            class="clickable"
                            on:click={() => onClickMusic(music)}
                        >
                            <Image
                                class="album-art"
                                src={music.album.cover}
                                alt={music.album.name}
                            />
                            <div class="info">
                                <div class="title">
                                    {music.name}
                                </div>
                                <div class="artist">
                                    {music.album.name}
                                </div>
                            </div>
                        </button>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</section>

<SubPage
    isOpen={isOpenDetail}
    onClose={() => {
        selectedId = null;
        isOpenDetail = false;
    }}
>
    {#if selectedId}
        <AlbumDetail id={String(selectedId)} {onClickMusic} />
    {/if}
</SubPage>

<style lang="scss">
    section {
        .artist-name {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 1.25rem;
            font-weight: bold;
            margin: 3rem 0;

            :global(img) {
                width: 5rem;
                height: 5rem;
                object-fit: cover;
                border-radius: 50%;
                margin-bottom: 1rem;
            }
        }

        .section-title {
            padding: 1rem;
            font-size: 1.25rem;
            font-weight: bold;
            border-bottom: 1px solid #222;
        }

        .artist-albums {
            padding: 0 1rem 1rem 1rem;
            margin-bottom: 3rem;

            ul {
                list-style: none;
                padding: 0;
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                grid-gap: 1rem;

                li {
                    :global(img) {
                        width: 100%;
                        max-height: 100%;
                        object-fit: cover;
                    }

                    .info {
                        margin-top: 0.5rem;
                    }
                }
            }
        }

        .artist-musics {
            ul {
                margin: 0;
                padding: 0;
                list-style: none;

                li button {
                    padding: 1rem;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 0.5rem;

                    &:hover {
                        background-color: rgba(255, 255, 255, 0.1);
                    }
                }
            }
        }
    }
</style>
