import {
    ModalProvider as BaseModalProvider,
    useModal,
    type AlertComponentProps,
    type ConfirmComponentProps
} from '@baejino/react-ui/modal';
import * as AlertDialog from '@baejino/react-ui/modal/alert-dialog';

import { Button, Text } from '~/components/shared';

import styles from './ModalProvider.module.scss';

const AlertModal = ({ open, options, onClose }: AlertComponentProps) => {
    return (
        <AlertDialog.Root
            open={open}
            onOpenChange={(nextOpen) => {
                if (!nextOpen && options.dismissible) {
                    onClose();
                }
            }}>
            <AlertDialog.Portal>
                <AlertDialog.Overlay
                    className={styles.overlay}
                    onClick={() => {
                        if (options.dismissible) {
                            onClose();
                        }
                    }}
                />

                <AlertDialog.Content className={styles.content}>
                    <div className={styles.header}>
                        <AlertDialog.Title asChild>
                            <Text as="h2" size="md" weight="semibold" className={styles.title}>
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
                        <AlertDialog.Action asChild>
                            <Button className={styles.button} variant="primary" onClick={onClose}>
                                {options.confirmLabel}
                            </Button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
};

const ConfirmModal = ({ open, options, onCancel, onConfirm }: ConfirmComponentProps) => {
    return (
        <AlertDialog.Root
            open={open}
            onOpenChange={(nextOpen) => {
                if (!nextOpen && options.dismissible) {
                    onCancel();
                }
            }}>
            <AlertDialog.Portal>
                <AlertDialog.Overlay
                    className={styles.overlay}
                    onClick={() => {
                        if (options.dismissible) {
                            onCancel();
                        }
                    }}
                />

                <AlertDialog.Content className={styles.content}>
                    <div className={styles.header}>
                        <AlertDialog.Title asChild>
                            <Text as="h2" size="md" weight="semibold" className={styles.title}>
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
                            <Button className={styles.button} variant="secondary" onClick={onCancel}>
                                {options.cancelLabel}
                            </Button>
                        </AlertDialog.Cancel>

                        <AlertDialog.Action asChild>
                            <Button
                                className={styles.button}
                                variant={options.tone === 'danger' ? 'danger' : 'primary'}
                                onClick={onConfirm}>
                                {options.confirmLabel}
                            </Button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
};

export { useModal };

export default function ModalProvider({ children }: { children?: React.ReactNode }) {
    return (
        <BaseModalProvider
            components={{
                Alert: AlertModal,
                Confirm: ConfirmModal
            }}>
            {children}
        </BaseModalProvider>
    );
}
