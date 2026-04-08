import * as Dialog from '@radix-ui/react-dialog';
import { useStore } from 'badland-react';
import { useEffect, useRef, useState } from 'react';

import { Button, Text } from '~/components/shared';
import { promptStore } from '~/modules/prompt';

import styles from './PromptProvider.module.scss';

export default function PromptProvider() {
    const [{ isOpen, options }] = useStore(promptStore);
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setValue(options?.defaultValue ?? '');
    }, [options]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        window.setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        }, 0);
    }, [isOpen]);

    if (!isOpen || !options) {
        return null;
    }

    return (
        <Dialog.Root
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) {
                    promptStore.cancelIfOpen();
                }
            }}>
            <Dialog.Portal>
                <Dialog.Overlay className={styles.overlay} />

                <Dialog.Content className={styles.content}>
                    <form
                        className={styles.form}
                        onSubmit={(event) => {
                            event.preventDefault();
                            promptStore.resolve(value.trim());
                        }}>
                        <div className={styles.header}>
                            <Dialog.Title asChild>
                                <Text as="h2" size="base" weight="semibold" className={styles.title}>
                                    {options.title}
                                </Text>
                            </Dialog.Title>

                            {options.description && (
                                <Dialog.Description asChild>
                                    <Text as="p" variant="secondary" size="sm" className={styles.description}>
                                        {options.description}
                                    </Text>
                                </Dialog.Description>
                            )}
                        </div>

                        <input
                            ref={inputRef}
                            value={value}
                            className={styles.input}
                            placeholder={options.placeholder}
                            onChange={(event) => setValue(event.currentTarget.value)}
                        />

                        <div className={styles.actions}>
                            <Dialog.Close asChild>
                                <Button
                                    className={styles.button}
                                    variant="secondary"
                                    onClick={() => promptStore.resolve(null)}>
                                    {options.cancelLabel}
                                </Button>
                            </Dialog.Close>

                            <Button
                                type="submit"
                                className={styles.button}
                                variant="primary">
                                {options.confirmLabel}
                            </Button>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
