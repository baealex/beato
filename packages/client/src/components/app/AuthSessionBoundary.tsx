import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import AuthGate from '~/components/auth/AuthGate';
import SplashScreen from '~/components/app/SplashScreen/SplashScreen';
import { getAuthSession } from '~/api';
import { queryKeys } from '~/api/query-keys';
import {
    redirectToLogin,
    shouldRedirectToLogin
} from '~/modules/auth-redirect';
import { useAppStore as useStore } from '~/store/base-store';
import { musicStore } from '~/store/music';

const SPLASH_MIN_MS = 2000;

interface AuthSessionBoundaryProps {
    children: React.ReactNode;
}

export default function AuthSessionBoundary({
    children
}: AuthSessionBoundaryProps) {
    const [showSplash, setShowSplash] = useState(true);
    const [splashExiting, setSplashExiting] = useState(false);
    const splashStartTime = useRef(Date.now());
    const [{ loaded: musicLoaded }] = useStore(musicStore);

    const authSessionQuery = useQuery({
        queryKey: queryKeys.auth.session(),
        queryFn: getAuthSession,
        staleTime: 30_000
    });

    const authSession = authSessionQuery.data;
    const isAuthLoading = authSessionQuery.isLoading || authSessionQuery.isFetching;
    const canAccessApp = Boolean(
        authSession && (!authSession.authRequired || authSession.authenticated)
    );

    useEffect(() => {
        const interceptorId = axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (shouldRedirectToLogin(error)) {
                    redirectToLogin();
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptorId);
        };
    }, []);

    useEffect(() => {
        if (isAuthLoading || !authSession) {
            return;
        }

        if (authSession.authRequired && !authSession.authenticated) {
            redirectToLogin();
        }
    }, [authSession, isAuthLoading]);

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

    const boundaryContent = () => {
        if (!isAuthLoading && !authSession) {
            return (
                <AuthGate
                    state="error"
                    errorMessage="Unable to verify the current session. Retry once the server is reachable."
                    onRetry={() => {
                        void authSessionQuery.refetch();
                    }}
                />
            );
        }

        if (!isAuthLoading && authSession?.authRequired && !authSession.authenticated) {
            return <AuthGate state="loading" />;
        }

        if (canAccessApp) {
            return children;
        }

        return null;
    };

    return (
        <>
            {showSplash && <SplashScreen isExiting={splashExiting} />}
            {(!showSplash || splashExiting) && boundaryContent()}
        </>
    );
}
