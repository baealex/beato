import { useAppStore as useStore } from '~/store/base-store';

import BottomPanel from '~/components/shared/BottomPanel';

import { panel } from '~/modules/panel';

interface PanelProviderProps {
    children: React.ReactNode;
}

export default function PanelProvider({ children }: PanelProviderProps) {
    const [{ isOpen, title, content }] = useStore(panel);

    return (
        <>
            {children}
            <BottomPanel
                title={title}
                isOpen={isOpen}
                onClose={() => panel.close()}>
                {content}
            </BottomPanel>
        </>
    );
}
