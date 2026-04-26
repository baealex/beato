import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useAppStore as useStore } from '~/store/base-store';
import { RouterProvider } from 'react-router-dom';

import AuthGate from './components/auth/AuthGate';
import SplashScreen from './components/app/SplashScreen/SplashScreen';
import { MusicListener, socket } from './socket';

import router from './router';
import { appCopy } from './config/copy';

import {
    getAuthSession,
    type AuthSession
} from './api';
import { musicStore } from './store/music';
import { artistStore } from './store/artist';
import { albumStore } from './store/album';
import { Providers } from './components/app';

const AUTH_RECOVERY_PATH_PREFIX = '/api/auth/';
const SPLASH_MIN_MS = 2000;
const LOGIN_PATH = '/login';

const buildLoginRedirectUrl = () => {
    const redirectTo = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    return `${LOGIN_PATH}?redirectTo=${encodeURIComponent(redirectTo)}`;
};

const redirectToLogin = () => {
    window.location.assign(buildLoginRedirectUrl());
};

export default function App() {
    const [authSession, setAuthSession] = useState<AuthSession | null>(null);
    const [authBootstrapError, setAuthBootstrapError] = useState<string | null>(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [showSplash, setShowSplash] = useState(true);
    const [splashExiting, setSplashExiting] = useState(false);
    const splashStartTime = useRef(Date.now());

    const canAccessApp = Boolean(
        authSession && (!authSession.authRequired || authSession.authenticated)
    );

    // Watch music store — only meaningful after canAccessApp
    const [{ loaded: musicLoaded }] = useStore(musicStore);

    const refreshAuthSession = async () => {
        setIsAuthLoading(true);
        setAuthBootstrapError(null);

        try {
            const session = await getAuthSession();

            setAuthSession(session);
        } catch (error) {
            setAuthBootstrapError('Unable to verify the current session. Retry once the server is reachable.');
        } finally {
            setIsAuthLoading(false);
        }
    };

    useEffect(() => {
        document.title = appCopy.documentTitle;
        void refreshAuthSession();
    }, []);

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
        const interceptorId = axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const requestUrl = typeof error.config?.url === 'string'
                    ? error.config.url
                    : '';

                if (error.response?.status === 401 && !requestUrl.startsWith(AUTH_RECOVERY_PATH_PREFIX)) {
                    redirectToLogin();
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptorId);
        };
    }, []);

    // Splash exit: auth done + (music loaded OR auth failed) + minimum time
    useEffect(() => {
        if (!showSplash) return;

        const authDone = !isAuthLoading;
        const storesDone = !canAccessApp || musicLoaded;

        if (!authDone || !storesDone) return;

        const elapsed = Date.now() - splashStartTime.current;
        const remaining = Math.max(0, SPLASH_MIN_MS - elapsed);

        const exitTimer = setTimeout(() => {
            setSplashExiting(true);
            setTimeout(() => setShowSplash(false), 440);
        }, remaining);

        return () => clearTimeout(exitTimer);
    }, [isAuthLoading, canAccessApp, musicLoaded, showSplash]);

    useEffect(() => {
        const handleConnect = () => {
            void (async () => {
                await MusicListener.count();
                await MusicListener.recoverPlaybackCheckpoints();
            })();
        };

        const handleWindowFocus = () => {
            if (!canAccessApp) return;

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

        if (!canAccessApp) {
            socket.disconnect();
            return;
        }

        socket.connect();
        socket.on('connect', handleConnect);
        socket.on('connect_error', handleConnectError);
        window.addEventListener('focus', handleWindowFocus);
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            socket.off('connect', handleConnect);
            socket.off('connect_error', handleConnectError);
            window.removeEventListener('focus', handleWindowFocus);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [canAccessApp]);

    useEffect(() => {
        if (isAuthLoading || !authSession) {
            return;
        }

        if (authSession.authRequired && !authSession.authenticated) {
            redirectToLogin();
        }
    }, [authSession, isAuthLoading]);

    const appContent = () => {
        if (authBootstrapError || (!isAuthLoading && !authSession)) {
            return (
                <AuthGate
                    state="error"
                    errorMessage={authBootstrapError}
                    onRetry={refreshAuthSession}
                />
            );
        }

        if (!isAuthLoading && authSession?.authRequired && !authSession.authenticated) {
            return <AuthGate state="loading" />;
        }

        if (canAccessApp) {
            return (
                <Providers>
                    <RouterProvider router={router} />
                </Providers>
            );
        }

        return null;
    };

    return (
        <>
            {showSplash && <SplashScreen isExiting={splashExiting} />}
            {(!showSplash || splashExiting) && appContent()}
        </>
    );
}
