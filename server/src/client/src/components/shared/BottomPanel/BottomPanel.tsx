import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useRef } from 'react';

import styles from './BottomPanel.module.scss';

interface BottomPanelProps {
    title?: string;
    isOpen: boolean;
    onClose?: () => void;
    children: React.ReactNode;
}

const DEFAULT_TITLE = 'Action panel';

export default function BottomPanel({
    title,
    isOpen,
    onClose,
    children
}: BottomPanelProps) {
    const hasPush = useRef(false);

    useEffect(() => {
        if (!isOpen) {
            if (hasPush.current) {
                hasPush.current = false;
                history.back();
            }
            return;
        }

        if (!hasPush.current) {
            hasPush.current = true;
            history.pushState(null, '');
        }

        const handlePopState = () => {
            hasPush.current = false;
            onClose?.();
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [isOpen, onClose]);

    return (
        <Dialog.Root
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) {
                    onClose?.();
                }
            }}>
            <Dialog.Portal>
                <Dialog.Overlay className={styles.overlay} />

                <Dialog.Content className={styles.content}>
                    <div className={styles.handle} aria-hidden="true" />

                    <Dialog.Title className={title ? styles.title : styles.visuallyHidden}>
                        {title || DEFAULT_TITLE}
                    </Dialog.Title>

                    <div className={styles.body}>
                        {children}
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
