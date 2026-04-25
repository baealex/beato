import * as SelectPrimitive from '@baejino/react-ui/select';

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
        <SelectPrimitive.Root
            value={selected ? toInternalValue(selected.value) : undefined}
            onValueChange={(value) => onChange(fromInternalValue(value))}>
            <SelectPrimitive.Trigger className={styles.trigger}>
                <SelectPrimitive.Value placeholder="Select an option" />
                <SelectPrimitive.Icon className={styles.triggerIcon}>
                    <Icon.ChevronDown />
                </SelectPrimitive.Icon>
            </SelectPrimitive.Trigger>

            <SelectPrimitive.Portal>
                <SelectPrimitive.Content
                    className={styles.content}
                    position="popper"
                    sideOffset={8}>
                    <SelectPrimitive.Viewport className={styles.viewport}>
                        {options.map((option) => (
                            <SelectPrimitive.Item
                                key={option.value || EMPTY_OPTION_VALUE}
                                value={toInternalValue(option.value)}
                                className={styles.item}>
                                <SelectPrimitive.ItemText>
                                    {option.label}
                                </SelectPrimitive.ItemText>
                                <SelectPrimitive.ItemIndicator className={styles.itemIndicator}>
                                    <Icon.Check />
                                </SelectPrimitive.ItemIndicator>
                            </SelectPrimitive.Item>
                        ))}
                    </SelectPrimitive.Viewport>
                </SelectPrimitive.Content>
            </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
    );
}
