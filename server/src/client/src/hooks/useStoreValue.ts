import { type BaseStore, useAppStoreValue } from '~/store/base-store';

export default function useStoreValue<T extends object, K extends keyof T>(
    store: BaseStore<T>,
    name: K
) {
    return useAppStoreValue(store, name);
}
