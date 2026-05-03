import classNames from 'classnames';
const cx = classNames;

import { useEffect, useState } from 'react';

import * as Icon from '~/icon';

interface SearchFieldProps {
    value: string;
    placeholder?: string;
    ariaLabel?: string;
    onChange: (value: string) => void;
}

export default function SearchField({
    value,
    placeholder = 'Search',
    ariaLabel = 'Search',
    onChange
}: SearchFieldProps) {
    const [draftValue, setDraftValue] = useState(value);
    const [isComposing, setIsComposing] = useState(false);

    useEffect(() => {
        if (!isComposing) {
            setDraftValue(value);
        }
    }, [isComposing, value]);

    const handleChange = (nextValue: string) => {
        setDraftValue(nextValue);

        if (!isComposing) {
            onChange(nextValue);
        }
    };

    const handleClear = () => {
        setDraftValue('');
        onChange('');
    };

    return (
        <label className={cx('ow-search-field-SearchField')}>
            <Icon.Search className={cx('ow-search-field-icon')} />
            <input
                value={draftValue}
                className={cx('ow-search-field-input')}
                placeholder={placeholder}
                aria-label={ariaLabel}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={(event) => {
                    setIsComposing(false);
                    handleChange(event.currentTarget.value);
                    onChange(event.currentTarget.value);
                }}
                onChange={(event) => handleChange(event.currentTarget.value)}
                onKeyDown={(event) => {
                    if (event.key === 'Escape' && draftValue) {
                        event.preventDefault();
                        handleClear();
                    }
                }}
            />
            {draftValue && (
                <button
                    type="button"
                    className={cx('ow-search-field-clearButton')}
                    aria-label="Clear search"
                    onClick={handleClear}>
                    <Icon.Close />
                </button>
            )}
        </label>
    );
}
