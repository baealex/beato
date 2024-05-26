import Store from 'badland';

interface PanelStoreState {
    title: string;
    isOpen: boolean;
    content: React.ReactNode;
}

class PanelStore extends Store<PanelStoreState> {
    constructor() {
        super();
        this.state = {
            title: '',
            isOpen: false,
            content: null
        };
    }

    open({ title, content }: { title?: string; content: React.ReactNode }) {
        this.set({
            title: title || '',
            isOpen: true,
            content
        });
    }

    close() {
        this.set({
            title: '',
            isOpen: false,
            content: null
        });
    }
}

export const panel = new PanelStore();
