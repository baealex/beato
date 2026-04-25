import Button from '~/components/shared/Button';
import Text from '~/components/shared/Text';

import * as Dialog from '@baejino/react-ui/modal/dialog';
import styles from './TextEntryDialog.module.scss';

interface TextEntryDialogProps {
    open: boolean;
    title: string;
    description?: string;
    value: string;
    placeholder?: string;
    confirmLabel: string;
    cancelLabel?: string;
    onValueChange: (value: string) => void;
    onConfirm: (value: string) => void;
    onClose: () => void;
}

export default function TextEntryDialog({
    open,
    title,
    description,
    value,
    placeholder,
    confirmLabel,
    cancelLabel = 'Cancel',
    onValueChange,
    onConfirm,
    onClose
}: TextEntryDialogProps) {
    const trimmedValue = value.trim();

    return (
        <Dialog.Root
            open={open}
            onOpenChange={(nextOpen) => {
                if (!nextOpen) {
                    onClose();
                }
            }}>
            <Dialog.Portal>
                <Dialog.Overlay className={styles.overlay} />

                <Dialog.Content className={styles.content}>
                    <form
                        className={styles.form}
                        onSubmit={(event) => {
                            event.preventDefault();

                            if (!trimmedValue) {
                                return;
                            }

                            onConfirm(trimmedValue);
                        }}>
                        <div className={styles.header}>
                            <Dialog.Title asChild>
                                <Text as="h2" size="md" weight="semibold" className={styles.title}>
                                    {title}
                                </Text>
                            </Dialog.Title>

                            {description && (
                                <Dialog.Description asChild>
                                    <Text as="p" variant="secondary" size="sm" className={styles.description}>
                                        {description}
                                    </Text>
                                </Dialog.Description>
                            )}
                        </div>

                        <input
                            autoFocus
                            value={value}
                            className={styles.input}
                            placeholder={placeholder}
                            onChange={(event) => onValueChange(event.currentTarget.value)}
                        />

                        <div className={styles.actions}>
                            <Dialog.Close asChild>
                                <Button className={styles.button} variant="secondary">
                                    {cancelLabel}
                                </Button>
                            </Dialog.Close>

                            <Button
                                type="submit"
                                className={styles.button}
                                variant="primary"
                                disabled={!trimmedValue}>
                                {confirmLabel}
                            </Button>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
