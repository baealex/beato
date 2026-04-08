import { afterEach, describe, expect, it } from 'vitest';

import {
    confirm,
    confirmStore,
    normalizeConfirmOptions
} from './confirm';

describe('confirm wrapper', () => {
    afterEach(() => {
        confirmStore.reset();
    });

    it('normalizes string input with default labels', () => {
        expect(normalizeConfirmOptions('Reset queue?')).toEqual({
            title: 'Reset queue?',
            confirmLabel: 'Continue',
            cancelLabel: 'Cancel',
            tone: 'default'
        });
    });

    it('opens a confirmation request and resolves it', async () => {
        const resultPromise = confirm({
            title: 'Delete playlist?',
            confirmLabel: 'Delete',
            tone: 'danger'
        });

        expect(confirmStore.state).toMatchObject({
            isOpen: true,
            options: {
                title: 'Delete playlist?',
                confirmLabel: 'Delete',
                cancelLabel: 'Cancel',
                tone: 'danger'
            }
        });

        confirmStore.resolve(true);

        await expect(resultPromise).resolves.toBe(true);
    });

    it('cancels the previous request when a new confirm opens', async () => {
        const firstPromise = confirm('Reset queue?');
        const secondPromise = confirm('Delete preset?');

        await expect(firstPromise).resolves.toBe(false);

        confirmStore.resolve(false);

        await expect(secondPromise).resolves.toBe(false);
    });
});
