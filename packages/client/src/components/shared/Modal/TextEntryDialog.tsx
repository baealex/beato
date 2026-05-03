import Button from '~/components/shared/Button';
import Input from '~/components/shared/Input';
import Text from '~/components/shared/Text';

import * as Dialog from '@baejino/react-ui/modal/dialog';

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
                <Dialog.Overlay className={'ow-text-entry-dialog-overlay'} />

                <Dialog.Content className={'ow-text-entry-dialog-content'}>
                    <form
                        className={'ow-text-entry-dialog-form'}
                        onSubmit={(event) => {
                            event.preventDefault();

                            if (!trimmedValue) {
                                return;
                            }

                            onConfirm(trimmedValue);
                        }}>
                        <div className={'ow-text-entry-dialog-header'}>
                            <Dialog.Title asChild>
                                <Text as="h2" size="md" weight="semibold" className={'ow-text-entry-dialog-title'}>
                                    {title}
                                </Text>
                            </Dialog.Title>

                            {description && (
                                <Dialog.Description asChild>
                                    <Text as="p" variant="secondary" size="sm" className={'ow-text-entry-dialog-description'}>
                                        {description}
                                    </Text>
                                </Dialog.Description>
                            )}
                        </div>

                        <Input
                            autoFocus
                            value={value}
                            inputSize="lg"
                            placeholder={placeholder}
                            onChange={(event) => onValueChange(event.currentTarget.value)}
                        />

                        <div className={'ow-text-entry-dialog-actions'}>
                            <Dialog.Close asChild>
                                <Button className={'ow-text-entry-dialog-button'} variant="secondary">
                                    {cancelLabel}
                                </Button>
                            </Dialog.Close>

                            <Button
                                type="submit"
                                className={'ow-text-entry-dialog-button'}
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
