import Store from 'badland';

export interface PromptOptions {
    title: string;
    description?: string;
    placeholder?: string;
    defaultValue?: string;
    confirmLabel?: string;
    cancelLabel?: string;
}

export interface ResolvedPromptOptions {
    title: string;
    description?: string;
    placeholder?: string;
    defaultValue: string;
    confirmLabel: string;
    cancelLabel: string;
}

interface PromptState {
    isOpen: boolean;
    options: ResolvedPromptOptions | null;
    resolver: ((value: string | null) => void) | null;
}

const DEFAULT_OPTIONS: Pick<ResolvedPromptOptions, 'defaultValue' | 'confirmLabel' | 'cancelLabel'> = {
    defaultValue: '',
    confirmLabel: 'Save',
    cancelLabel: 'Cancel'
};

export const normalizePromptOptions = (
    input: string | PromptOptions,
    defaultValue?: string
): ResolvedPromptOptions => {
    if (typeof input === 'string') {
        return {
            title: input,
            ...DEFAULT_OPTIONS,
            defaultValue: defaultValue ?? ''
        };
    }

    return {
        ...DEFAULT_OPTIONS,
        ...input,
        defaultValue: input.defaultValue ?? defaultValue ?? ''
    };
};

class PromptStore extends Store<PromptState> {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            options: null,
            resolver: null
        };
    }

    open(input: string | PromptOptions, defaultValue?: string) {
        const options = normalizePromptOptions(input, defaultValue);

        if (this.state.resolver) {
            this.state.resolver(null);
        }

        return new Promise<string | null>((resolve) => {
            this.set({
                isOpen: true,
                options,
                resolver: resolve
            });
        });
    }

    resolve(result: string | null) {
        const { resolver } = this.state;

        this.set({
            isOpen: false,
            options: null,
            resolver: null
        });

        resolver?.(result);
    }

    cancelIfOpen() {
        if (!this.state.isOpen) {
            return;
        }

        this.resolve(null);
    }

    reset() {
        this.set({
            isOpen: false,
            options: null,
            resolver: null
        });
    }
}

export const promptStore = new PromptStore();

export const prompt = (input: string | PromptOptions, defaultValue?: string) => promptStore.open(input, defaultValue);
