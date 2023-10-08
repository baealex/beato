import styled from '@emotion/styled'
import { theme } from '@baejino/style'

import { CheckBox, DoubleCheck } from '~/icon'

const Button = styled.button`
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: #eee;
    font-size: 0.8rem;

    &.active {
        color: ${theme.COLOR_PURPLE_PROMINENT};
    }

    svg {
        width: 1rem;
        height: 1rem;
    }
`

interface MusicSelectorProps {
    active: boolean
    label: string
    onClick: () => void
    onSelectAll: () => void
}

export default function MusicSelector({
    active,
    label,
    onClick,
    onSelectAll
}: MusicSelectorProps) {
    return (
        <>
            <Button
                className={`clickable ${active ? 'active' : ''}`}
                onClick={onClick}
            >
                <CheckBox />
                {label}
            </Button>
            {active && (
                <Button
                    className="clickable"
                    onClick={onSelectAll}
                >
                    <DoubleCheck />
                    Select All
                </Button>
            )}
        </>
    )
}