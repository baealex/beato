interface SetMediaItemAction {
    actionType: "setMediaItem";
    mediaItem: {
        id: string;
        title: string;
        artist: string;
        album: string;
        duration: number;
        artUri: string;
    };
}

interface PlayAction {
    actionType: "play";
}

interface PauseAction {
    actionType: "pause";
}

interface StopAction {
    actionType: "stop";
}

interface SeekAction {
    actionType: "setPosition";
    position: number;
}

export const PostMessageWrapper = (
    action:
        | SetMediaItemAction
        | PlayAction
        | PauseAction
        | StopAction
        | SeekAction
) => {
    return JSON.stringify(action);
};