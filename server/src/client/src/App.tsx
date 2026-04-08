import axios from 'axios';
import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';

import AuthGate from './components/auth/AuthGate';
import { MusicListener, socket } from './socket';

import router from './router';
import { appCopy } from './config/copy';

import {
    getAuthSession,
    loginWithPassword,
    type AuthSession
} from './api';
import { musicStore } from './store/music';
import { artistStore } from './store/artist';
import { albumStore } from './store/album';
import { Providers } from './components/app';

const AUTH_RECOVERY_PATH_PREFIX = '/api/auth/';

export default function App() {
    const [authSession, setAuthSession] = useState<AuthSession | null>(null);
    const [authBootstrapError, setAuthBootstrapError] = useState<string | null>(null);
    const [authErrorMessage, setAuthErrorMessage] = useState<string | null>(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

    const refreshAuthSession = async () => {
        setIsAuthLoading(true);
        setAuthBootstrapError(null);

        try {
            const session = await getAuthSession();

            setAuthSession(session);
            setAuthErrorMessage(null);
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
                    window.location.reload();
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptorId);
        };
    }, []);

    const canAccessApp = Boolean(
        authSession && (!authSession.authRequired || authSession.authenticated)
    );

    useEffect(() => {
        const handleWindowFocus = () => {
            if (!canAccessApp) {
                return;
            }

            if (!socket.connected) {
                socket.connect();
                MusicListener.count();
            }
        };

        const handleBeforeUnload = () => {
            socket.disconnect();
        };

        const handleConnectError = (error: Error) => {
            if (error.message === 'Authentication required') {
                window.location.reload();
            }
        };

        if (!canAccessApp) {
            socket.disconnect();
            return;
        }

        socket.connect();
        socket.on('connect_error', handleConnectError);
        window.addEventListener('focus', handleWindowFocus);
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            socket.off('connect_error', handleConnectError);
            window.removeEventListener('focus', handleWindowFocus);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [canAccessApp]);

    const handlePasswordSubmit = async (password: string) => {
        setIsSubmittingPassword(true);
        setAuthErrorMessage(null);

        try {
            await loginWithPassword(password);
            window.location.reload();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = typeof error.response?.data?.message === 'string'
                    ? error.response.data.message
                    : 'Unable to unlock this session with that password.';

                setAuthErrorMessage(message);
            } else {
                setAuthErrorMessage('Unable to unlock this session right now.');
            }
        } finally {
            setIsSubmittingPassword(false);
        }
    };

    if (isAuthLoading) {
        return <AuthGate state="loading" />;
    }

    if (authBootstrapError || !authSession) {
        return (
            <AuthGate
                state="error"
                errorMessage={authBootstrapError}
                onRetry={refreshAuthSession}
            />
        );
    }

    if (authSession.authRequired && !authSession.authenticated) {
        return (
            <AuthGate
                state="login"
                errorMessage={authErrorMessage}
                isSubmitting={isSubmittingPassword}
                onSubmit={handlePasswordSubmit}
            />
        );
    }

    return (
        <Providers>
            <RouterProvider router={router} />
        </Providers>
    );
}
