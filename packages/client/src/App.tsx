import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import router from './router';
import { appCopy } from './config/copy';
import {
    AuthenticatedAppRuntime,
    AuthSessionBoundary,
    Providers
} from './components/app';

export default function App() {
    useEffect(() => {
        document.title = appCopy.documentTitle;
    }, []);

    return (
        <Providers>
            <AuthSessionBoundary>
                <AuthenticatedAppRuntime>
                    <RouterProvider router={router} />
                </AuthenticatedAppRuntime>
            </AuthSessionBoundary>
        </Providers>
    );
}
