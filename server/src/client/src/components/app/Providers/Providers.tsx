import React from 'react'
import { QueryClientProvider } from 'react-query'

import queryClient from './configs/query-client'
import PanelProvider from '../PanelProvider'

interface ProvidersProps {
    children?: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            <PanelProvider>
                {children}
            </PanelProvider>
        </QueryClientProvider>
    )
}

export default Providers
