import { useEffect } from 'react';

import { redirectToLogin } from '~/modules/auth-redirect';
import { albumStore } from '~/store/album';
import { artistStore } from '~/store/artist';
import { musicStore } from '~/store/music';
import { MusicListener, socket } from '~/socket';

interface AuthenticatedAppRuntimeProps {
    children: React.ReactNode;
}

export default function AuthenticatedAppRuntime({
    children
}: AuthenticatedAppRuntimeProps) {
    useEffect(() => {
        const handleResync = () => {
            musicStore.init = false;
            artistStore.init = false;
            albumStore.init = false;
        };

        socket.on('resync', handleResync);

        return () => {
            socket.off('resync', handleResync);
        };
    }, []);

    useEffect(() => {
        const handleConnect = () => {
            void (async () => {
                await MusicListener.count();
                await MusicListener.recoverPlaybackCheckpoints();
            })();
        };

        const handleWindowFocus = () => {
            if (!socket.connected) {
                socket.connect();
            }
        };

        const handleBeforeUnload = () => {
            socket.disconnect();
        };

        const handleConnectError = (error: Error) => {
            if (error.message === 'Authentication required') {
                redirectToLogin();
            }
        };

        socket.connect();
        socket.on('connect', handleConnect);
        socket.on('connect_error', handleConnectError);
        window.addEventListener('focus', handleWindowFocus);
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            socket.disconnect();
            socket.off('connect', handleConnect);
            socket.off('connect_error', handleConnectError);
            window.removeEventListener('focus', handleWindowFocus);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return children;
}
