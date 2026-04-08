import * as Dialog from '@radix-ui/react-dialog';
import { useStore } from 'badland-react';
import { useEffect, useRef, useState } from 'react';

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
                            <Dialog.Title className={styles.title}>
                                {options.title}
                            </Dialog.Title>

                            {options.description && (
                                <Dialog.Description className={styles.description}>
                                    {options.description}
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
                                <button
                                    type="button"
                                    className={`${styles.button} ${styles.secondary}`}
                                    onClick={() => promptStore.resolve(null)}>
                                    {options.cancelLabel}
                                </button>
                            </Dialog.Close>

                            <button
                                type="submit"
                                className={`${styles.button} ${styles.primary}`}>
                                {options.confirmLabel}
                            </button>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
