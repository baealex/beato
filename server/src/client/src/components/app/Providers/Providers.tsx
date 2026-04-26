import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import queryClient from './configs/query-client';
import ModalProvider from '../ModalProvider';
import PanelProvider from '../PanelProvider';
import ToastProvider from '../ToastProvider';

interface ProvidersProps {
    children?: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            <ModalProvider>
                <PanelProvider>
                    {children}
                </PanelProvider>
                <ToastProvider />
            </ModalProvider>
        </QueryClientProvider>
    );
};

export default Providers;
