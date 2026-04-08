import styles from './SearchField.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

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
    return (
        <label className={cx('SearchField')}>
            <Icon.Search className={cx('icon')} />
            <input
                value={value}
                className={cx('input')}
                placeholder={placeholder}
                aria-label={ariaLabel}
                onChange={(event) => onChange(event.currentTarget.value)}
                onKeyDown={(event) => {
                    if (event.key === 'Escape' && value) {
                        event.preventDefault();
                        onChange('');
                    }
                }}
            />
            {value && (
                <button
                    type="button"
                    className={cx('clearButton')}
                    aria-label="Clear search"
                    onClick={() => onChange('')}>
                    <Icon.Close />
                </button>
            )}
        </label>
    );
}
