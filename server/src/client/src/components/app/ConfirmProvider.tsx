import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { useStore } from 'badland-react';

import { Button, Text } from '~/components/shared';
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
                        <AlertDialog.Title asChild>
                            <Text as="h2" size="base" weight="semibold" className={styles.title}>
                                {options.title}
                            </Text>
                        </AlertDialog.Title>

                        {options.description && (
                            <AlertDialog.Description asChild>
                                <Text as="p" variant="secondary" size="sm" className={styles.description}>
                                    {options.description}
                                </Text>
                            </AlertDialog.Description>
                        )}
                    </div>

                    <div className={styles.actions}>
                        <AlertDialog.Cancel asChild>
                            <Button
                                className={styles.button}
                                variant="secondary"
                                onClick={() => confirmStore.resolve(false)}>
                                {options.cancelLabel}
                            </Button>
                        </AlertDialog.Cancel>

                        <AlertDialog.Action asChild>
                            <Button
                                className={styles.button}
                                variant={options.tone === 'danger' ? 'danger' : 'primary'}
                                onClick={() => confirmStore.resolve(true)}>
                                {options.confirmLabel}
                            </Button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
}
