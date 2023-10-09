export interface Listener {
    connect: (eventHandler: never) => void;
    disconnect: () => void;
}