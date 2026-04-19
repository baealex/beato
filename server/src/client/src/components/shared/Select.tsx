import * as RadixSelect from '@radix-ui/react-select';

import * as Icon from '~/icon';

import styles from './Select.module.scss';

interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    selected?: Option;
    options: Option[];
    onChange: (value: string) => void;
}

const EMPTY_OPTION_VALUE = '__ocean-wave-empty-option__';

const toInternalValue = (value: string) => (value === '' ? EMPTY_OPTION_VALUE : value);
const fromInternalValue = (value: string) => (value === EMPTY_OPTION_VALUE ? '' : value);

export default function Select({ selected, options, onChange }: SelectProps) {
    return (
        <RadixSelect.Root
            value={selected ? toInternalValue(selected.value) : undefined}
            onValueChange={(value) => onChange(fromInternalValue(value))}>
            <RadixSelect.Trigger className={styles.trigger}>
                <RadixSelect.Value placeholder="Select an option" />
                <RadixSelect.Icon className={styles.triggerIcon}>
                    <Icon.ChevronDown />
                </RadixSelect.Icon>
            </RadixSelect.Trigger>

            <RadixSelect.Portal>
                <RadixSelect.Content
                    className={styles.content}
                    position="popper"
                    sideOffset={8}>
                    <RadixSelect.Viewport className={styles.viewport}>
                        {options.map((option) => (
                            <RadixSelect.Item
                                key={option.value || EMPTY_OPTION_VALUE}
                                value={toInternalValue(option.value)}
                                className={styles.item}>
                                <RadixSelect.ItemText>
                                    {option.label}
                                </RadixSelect.ItemText>
                                <RadixSelect.ItemIndicator className={styles.itemIndicator}>
                                    <Icon.Check />
                                </RadixSelect.ItemIndicator>
                            </RadixSelect.Item>
                        ))}
                    </RadixSelect.Viewport>
                </RadixSelect.Content>
            </RadixSelect.Portal>
        </RadixSelect.Root>
    );
}
