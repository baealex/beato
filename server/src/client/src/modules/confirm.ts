import Store from 'badland';

export interface ConfirmOptions {
    title: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    tone?: 'default' | 'danger';
}

export interface ResolvedConfirmOptions {
    title: string;
    description?: string;
    confirmLabel: string;
    cancelLabel: string;
    tone: 'default' | 'danger';
}

interface ConfirmState {
    isOpen: boolean;
    options: ResolvedConfirmOptions | null;
    resolver: ((value: boolean) => void) | null;
}

const DEFAULT_OPTIONS: Pick<ResolvedConfirmOptions, 'confirmLabel' | 'cancelLabel' | 'tone'> = {
    confirmLabel: 'Continue',
    cancelLabel: 'Cancel',
    tone: 'default'
};

export const normalizeConfirmOptions = (input: string | ConfirmOptions): ResolvedConfirmOptions => {
    if (typeof input === 'string') {
        return {
            title: input,
            ...DEFAULT_OPTIONS
        };
    }

    return {
        ...DEFAULT_OPTIONS,
        ...input
    };
};

class ConfirmStore extends Store<ConfirmState> {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            options: null,
            resolver: null
        };
    }

    open(input: string | ConfirmOptions) {
        const options = normalizeConfirmOptions(input);

        if (this.state.resolver) {
            this.state.resolver(false);
        }

        return new Promise<boolean>((resolve) => {
            this.set({
                isOpen: true,
                options,
                resolver: resolve
            });
        });
    }

    resolve(result: boolean) {
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

        this.resolve(false);
    }

    reset() {
        this.set({
            isOpen: false,
            options: null,
            resolver: null
        });
    }
}

export const confirmStore = new ConfirmStore();

export const confirm = (input: string | ConfirmOptions) => confirmStore.open(input);
