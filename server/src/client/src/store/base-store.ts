import { useStore as useZustandStore } from 'zustand';
import { createStore, type StoreApi } from 'zustand/vanilla';

type StoreStateUpdater<T extends object> = T | Partial<T> | ((state: T) => T | Partial<T>);
type StoreSubscriber<T extends object> = (state: T, previousState: T) => void;

export class BaseStore<T extends object> {
    readonly api: StoreApi<T>;
    private hasInitialState = false;

    constructor() {
        this.api = createStore<T>()(() => ({} as T));
    }

    get state() {
        return this.api.getState();
    }

    set state(state: T) {
        const previousState = this.api.getState();

        this.api.setState(state, true);
        if (this.hasInitialState) {
            this.afterStateChange(this.api.getState(), previousState);
            return;
        }
        this.hasInitialState = true;
    }

    set = (partial: StoreStateUpdater<T>) => {
        const previousState = this.api.getState();

        this.api.setState(partial);
        this.afterStateChange(this.api.getState(), previousState);
        return this.api.getState();
    };

    setState = (partial: StoreStateUpdater<T>) => {
        return this.set(partial);
    };

    subscribe(listener: StoreSubscriber<T>) {
        return this.api.subscribe(listener);
    }

    unsubscribe(unsubscribe: () => void) {
        unsubscribe();
    }

    afterStateChange(_state: T, _previousState: T) {}
}

export function useAppStore<T extends object>(store: BaseStore<T>) {
    void store.state;
    return [useZustandStore(store.api), store.setState] as const;
}

export function useAppStoreValue<T extends object, K extends keyof T>(
    store: BaseStore<T>,
    name: K
) {
    void store.state;
    return [useZustandStore(store.api, (state) => state[name]), store.setState] as const;
}
