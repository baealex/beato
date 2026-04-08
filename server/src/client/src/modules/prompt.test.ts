import { afterEach, describe, expect, it } from 'vitest';

import {
    normalizePromptOptions,
    prompt,
    promptStore
} from './prompt';

describe('prompt wrapper', () => {
    afterEach(() => {
        promptStore.reset();
    });

    it('normalizes string input with a provided default value', () => {
        expect(normalizePromptOptions('Rename playlist', 'Focus Mix')).toEqual({
            title: 'Rename playlist',
            defaultValue: 'Focus Mix',
            confirmLabel: 'Save',
            cancelLabel: 'Cancel'
        });
    });

    it('opens a prompt request and resolves the entered value', async () => {
        const resultPromise = prompt({
            title: 'Create playlist',
            defaultValue: 'Night Swim',
            confirmLabel: 'Create'
        });

        expect(promptStore.state).toMatchObject({
            isOpen: true,
            options: {
                title: 'Create playlist',
                defaultValue: 'Night Swim',
                confirmLabel: 'Create',
                cancelLabel: 'Cancel'
            }
        });

        promptStore.resolve('Late Tide');

        await expect(resultPromise).resolves.toBe('Late Tide');
    });

    it('cancels the previous request when a new prompt opens', async () => {
        const firstPromise = prompt('Create playlist');
        const secondPromise = prompt('Rename playlist', 'Focus Mix');

        await expect(firstPromise).resolves.toBeNull();

        promptStore.resolve(null);

        await expect(secondPromise).resolves.toBeNull();
    });
});
