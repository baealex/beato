export type SortKey<T> = keyof T;
export type SortType = 'text' | 'number' | 'date';
export type SortDirection = 'asc' | 'desc';

export const getProperty = <T>(item: T, key: string) => {
    if (key.includes('.')) {
        const keys = key.split('.');
        return keys.reduce((acc, key) => acc[key], item);
    }
    return item[key];
};

export const sortByText = <T>(key: SortKey<T>, direction: SortDirection) =>
    (a: T, b: T) => {
        return direction === "asc"
            ? (getProperty(a, key as string) as string).localeCompare(getProperty(b, key as string) as string)
            : (getProperty(b, key as string) as string).localeCompare(getProperty(a, key as string) as string);
    };

export const sortByNumber = <T>(key: SortKey<T>, direction: SortDirection) =>
    (a: T, b: T) => {
        return direction === "asc"
            ? (getProperty(a, key as string) as number) - (getProperty(b, key as string) as number)
            : (getProperty(b, key as string) as number) - (getProperty(a, key as string) as number);
    }

export const sortByDate = <T>(key: SortKey<T>, direction: SortDirection) =>
    (a: T, b: T) => {
        return direction === "asc"
            ? (getProperty(a, key as string) as Date).getTime() - (getProperty(b, key as string) as Date).getTime()
            : (getProperty(b, key as string) as Date).getTime() - (getProperty(a, key as string) as Date).getTime();
    }

interface SortOptions<T> {
    key: SortKey<T>;
    type: SortType;
    direction: SortDirection;
}

export const sort = <T>({
    key,
    type,
    direction,
}: SortOptions<T>) => {
    return (items: T[]) => {
        if (type === "text") {
            return items.sort(sortByText(key, direction));
        }
        if (type === "date") {
            return items.sort(sortByDate(key, direction));
        }
        return items.sort(sortByNumber(key, direction));
    };
};
