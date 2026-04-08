import React from 'react';
import { QueryClientProvider } from 'react-query';

import queryClient from './configs/query-client';
import PanelProvider from '../PanelProvider';
import ToastProvider from '../ToastProvider';

interface ProvidersProps {
    children?: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            <PanelProvider>
                {children}
            </PanelProvider>
            <ToastProvider />
        </QueryClientProvider>
    );
};

export default Providers;
