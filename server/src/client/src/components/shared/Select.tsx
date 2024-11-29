import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { Menu } from '~/icon';

interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    selected?: Option;
    options: Option[];
    onChange: (value: string) => void;
}

const Styles = styled.div`
    @keyframes slide-down {
        0% {
            opacity: 0;
            transform: translateY(-0.5rem);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    position: relative;
    display: inline-block;
    font-size: 0.825rem;

    .selected {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.8rem 1rem;
        border: 1px solid var(--b-color-border);
        border-radius: 8px;
        cursor: pointer;

        svg {
            width: 1rem;
            height: 1rem;
            fill: #fff;
        }
    }

    .options {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: var(--b-color-background);
        border: 1px solid var(--b-color-border);
        border-radius: 8px;
        border-top: none;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        display: none;
        z-index: 1;

        div {
            padding: 0.825rem 1rem;
            cursor: pointer;
        }
    }

    &.open {
        .selected {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }

        .options {
            display: block;
            animation: slide-down 0.1s ease;
        }
    }
`;

export default function Select({ selected, options, onChange }: SelectProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);

    return (
        <Styles ref={ref} className={`${isOpen ? 'open' : ''}`}>
            <div className="selected" onClick={() => setIsOpen(!isOpen)}>
                <Menu />
                {selected ? (
                    <div>{selected.label}</div>
                ) : (
                    <div>Select an option</div>
                )}
            </div>
            <div className="options">
                {options.map((option) => (
                    <div
                        key={option.value}
                        onClick={() => {
                            onChange(option.value);
                            setIsOpen(false);
                        }}>
                        {option.label}
                    </div>
                ))}
            </div>
        </Styles>
    );
}
