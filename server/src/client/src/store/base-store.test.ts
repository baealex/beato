import { describe, expect, it, vi } from 'vitest';

import { BaseStore } from './base-store';

interface TestState {
    count: number;
    label: string;
}

class TestStore extends BaseStore<TestState> {
    changes: Array<{
        state: TestState;
        previousState: TestState;
    }> = [];

    afterStateChange(state: TestState, previousState: TestState) {
        this.changes.push({ state, previousState });
    }
}

const createTestStore = () => {
    const store = new TestStore();

    store.state = {
        count: 0,
        label: 'ready'
    };
    return store;
};

describe('BaseStore', () => {
    it('sets the initial state without running change side effects', () => {
        const store = createTestStore();

        expect(store.state).toEqual({
            count: 0,
            label: 'ready'
        });
        expect(store.changes).toEqual([]);
    });

    it('merges partial updates and reports the previous state', () => {
        const store = createTestStore();
        const previousState = store.state;
        const nextState = store.set({ count: 1 });

        expect(nextState).toEqual({
            count: 1,
            label: 'ready'
        });
        expect(store.changes).toEqual([{
            state: nextState,
            previousState
        }]);
    });

    it('supports functional updates and unsubscribe handles', () => {
        const store = createTestStore();
        const listener = vi.fn();
        const unsubscribe = store.subscribe(listener);

        store.set((state) => ({
            label: `${state.label}!`
        }));
        store.unsubscribe(unsubscribe);
        store.set({ count: 2 });

        expect(listener).toHaveBeenCalledTimes(1);
        expect(listener).toHaveBeenCalledWith({
            count: 0,
            label: 'ready!'
        }, {
            count: 0,
            label: 'ready'
        });
        expect(store.state).toEqual({
            count: 2,
            label: 'ready!'
        });
    });
});
