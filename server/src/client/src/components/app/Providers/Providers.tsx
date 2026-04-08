import React from 'react';
import { QueryClientProvider } from 'react-query';

import queryClient from './configs/query-client';
import ConfirmProvider from '../ConfirmProvider';
import PanelProvider from '../PanelProvider';
import PromptProvider from '../PromptProvider';
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
            <ConfirmProvider />
            <PromptProvider />
            <ToastProvider />
        </QueryClientProvider>
    );
};

export default Providers;
