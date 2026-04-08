import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { useStore } from 'badland-react';

import { confirmStore } from '~/modules/confirm';

import styles from './ConfirmProvider.module.scss';

export default function ConfirmProvider() {
    const [{ isOpen, options }] = useStore(confirmStore);

    if (!isOpen || !options) {
        return null;
    }

    return (
        <AlertDialog.Root
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) {
                    confirmStore.cancelIfOpen();
                }
            }}>
            <AlertDialog.Portal>
                <AlertDialog.Overlay
                    className={styles.overlay}
                    onClick={() => {
                        if (options.tone !== 'danger') {
                            confirmStore.cancelIfOpen();
                        }
                    }}
                />

                <AlertDialog.Content className={styles.content}>
                    <div className={styles.header}>
                        <AlertDialog.Title className={styles.title}>
                            {options.title}
                        </AlertDialog.Title>

                        {options.description && (
                            <AlertDialog.Description className={styles.description}>
                                {options.description}
                            </AlertDialog.Description>
                        )}
                    </div>

                    <div className={styles.actions}>
                        <AlertDialog.Cancel asChild>
                            <button
                                type="button"
                                className={`${styles.button} ${styles.secondary}`}
                                onClick={() => confirmStore.resolve(false)}>
                                {options.cancelLabel}
                            </button>
                        </AlertDialog.Cancel>

                        <AlertDialog.Action asChild>
                            <button
                                type="button"
                                className={`${styles.button} ${styles.primary} ${options.tone === 'danger' ? styles.danger : ''}`}
                                onClick={() => confirmStore.resolve(true)}>
                                {options.confirmLabel}
                            </button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
}
