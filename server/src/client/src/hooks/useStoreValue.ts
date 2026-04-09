import type Store from 'badland';
import { useValue } from 'badland-react';

export default function useStoreValue<T, K extends keyof T>(store: Store<T>, name: K) {
    return useValue(store, name) as unknown as [T[K], (value: T[K]) => Promise<T>];
}
