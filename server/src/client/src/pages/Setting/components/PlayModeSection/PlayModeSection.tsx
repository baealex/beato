import { useStore } from 'badland-react';

import { Select } from '~/components/shared';
import { queueStore } from '~/store/queue';

const PLAY_MODES = [
    {
        value: 'immediately',
        label: 'Play immediately'
    },
    {
        value: 'later',
        label: 'Play later'
    }
];

const INSERT_MODES = [
    {
        value: 'first',
        label: 'Add to the top of the queue'
    },
    {
        value: 'last',
        label: 'Add to the bottom of the queue'
    },
    {
        value: 'after',
        label: 'Add to the next of the current music'
    }
];

export const PlayModeSection = () => {
    const [{ playMode, insertMode }] = useStore(queueStore);

    return (
        <section>
            <h3>Play Mode</h3>
            <p>When you add a music to the queue, It will...</p>
            <Select
                selected={PLAY_MODES.find(({ value }) => value === playMode)}
                options={PLAY_MODES}
                onChange={(value) => queueStore.setPlayMode(value as typeof playMode)}
            />
            <Select
                selected={INSERT_MODES.find(({ value }) => value === insertMode)}
                options={INSERT_MODES}
                onChange={(value) => queueStore.setInsertMode(value as typeof insertMode)}
            />
        </section>
    );
};
