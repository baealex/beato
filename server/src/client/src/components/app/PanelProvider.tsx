import { useStore } from 'badland-react'

import BottomPanel from '~/components/shared/BottomPanel'

import { panel } from '~/modules/panel'

interface PanelProviderProps {
    children: React.ReactNode
}

export default function PanelProvider({ children }: PanelProviderProps) {
    const [{ isOpen, title, content }, setState] = useStore(panel)

    return (
        <>
            {children}
            <BottomPanel title={title} isOpen={isOpen} onClose={() => setState({ isOpen: false })}>
                {content}
            </BottomPanel>
        </>
    )
}
