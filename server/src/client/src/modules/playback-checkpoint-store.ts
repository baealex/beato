import type { PlaybackSessionCheckpoint } from './playback-session';

const PLAYBACK_CHECKPOINT_DATABASE_NAME = 'ocean-wave-playback';
const PLAYBACK_CHECKPOINT_DATABASE_VERSION = 1;
const PLAYBACK_CHECKPOINT_STORE_NAME = 'playback-checkpoints';

const memoryCheckpointStore = new Map<string, PlaybackSessionCheckpoint>();

const cloneCheckpoint = (checkpoint: PlaybackSessionCheckpoint) => {
    return JSON.parse(JSON.stringify(checkpoint)) as PlaybackSessionCheckpoint;
};

const hasIndexedDb = () => {
    return typeof indexedDB !== 'undefined';
};

const openPlaybackCheckpointDatabase = async () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open(
            PLAYBACK_CHECKPOINT_DATABASE_NAME,
            PLAYBACK_CHECKPOINT_DATABASE_VERSION
        );

        request.onupgradeneeded = () => {
            const database = request.result;

            if (!database.objectStoreNames.contains(PLAYBACK_CHECKPOINT_STORE_NAME)) {
                database.createObjectStore(PLAYBACK_CHECKPOINT_STORE_NAME, { keyPath: 'clientSessionId' });
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(
            request.error ?? new Error('Unable to open playback checkpoint database.')
        );
    });
};

const withPlaybackCheckpointStore = async <T>(
    mode: IDBTransactionMode,
    handler: (store: IDBObjectStore) => IDBRequest<T> | void
) => {
    const database = await openPlaybackCheckpointDatabase();

    try {
        return await new Promise<T | void>((resolve, reject) => {
            const transaction = database.transaction(PLAYBACK_CHECKPOINT_STORE_NAME, mode);
            const store = transaction.objectStore(PLAYBACK_CHECKPOINT_STORE_NAME);
            const request = handler(store);

            transaction.oncomplete = () => resolve(request?.result);
            transaction.onerror = () => reject(
                transaction.error ?? new Error('Playback checkpoint transaction failed.')
            );

            if (request) {
                request.onerror = () => reject(
                    request.error ?? new Error('Playback checkpoint request failed.')
                );
            }
        });
    } finally {
        database.close();
    }
};

export const savePlaybackCheckpoint = async (checkpoint: PlaybackSessionCheckpoint) => {
    if (!hasIndexedDb()) {
        memoryCheckpointStore.set(checkpoint.clientSessionId, cloneCheckpoint(checkpoint));
        return;
    }

    await withPlaybackCheckpointStore('readwrite', (store) => store.put(checkpoint));
};

export const getPlaybackCheckpoint = async (clientSessionId: string) => {
    if (!hasIndexedDb()) {
        const checkpoint = memoryCheckpointStore.get(clientSessionId);

        return checkpoint
            ? cloneCheckpoint(checkpoint)
            : null;
    }

    const checkpoint = await withPlaybackCheckpointStore<PlaybackSessionCheckpoint | undefined>(
        'readonly',
        (store) => store.get(clientSessionId)
    );

    return checkpoint
        ? cloneCheckpoint(checkpoint)
        : null;
};

export const listPlaybackCheckpoints = async () => {
    if (!hasIndexedDb()) {
        return Array.from(memoryCheckpointStore.values())
            .map((checkpoint) => cloneCheckpoint(checkpoint))
            .sort((left, right) => left.updatedAt.localeCompare(right.updatedAt));
    }

    const checkpoints = await withPlaybackCheckpointStore<PlaybackSessionCheckpoint[]>(
        'readonly',
        (store) => store.getAll()
    );

    return (checkpoints ?? [])
        .map((checkpoint) => cloneCheckpoint(checkpoint))
        .sort((left, right) => left.updatedAt.localeCompare(right.updatedAt));
};

export const deletePlaybackCheckpoint = async (clientSessionId: string) => {
    if (!hasIndexedDb()) {
        memoryCheckpointStore.delete(clientSessionId);
        return;
    }

    await withPlaybackCheckpointStore('readwrite', (store) => store.delete(clientSessionId));
};

export const clearPlaybackCheckpoints = async () => {
    if (!hasIndexedDb()) {
        memoryCheckpointStore.clear();
        return;
    }

    await withPlaybackCheckpointStore('readwrite', (store) => store.clear());
};
