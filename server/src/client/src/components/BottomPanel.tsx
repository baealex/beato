import styled from '@emotion/styled'
import { useEffect, useRef } from 'react'

interface BottomPanelProps {
    title?: string
    isOpen: boolean
    onClose?: () => void
    children: React.ReactNode
}

const Container = styled.div`
    @keyframes fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes slide-in {
        from {
            transform: translateY(100%);
        }
        to {
            transform: translateY(0);
        }
    }

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    flex-direction: column;
    z-index: 110;
    pointer-events: none;
    background-color: rgba(0, 0, 0, 0.88);

    &.open {
        pointer-events: all;
        display: flex;
        animation: fade-in 0.2s ease-in-out;
    }

    .backdrop {
        cursor: pointer;
        width: 100%;
        flex: 1;
    }

    .bottom-panel {
        width: 100%;
        height: fit-content;
        max-height: 80%;
        overflow-y: auto;
        padding: 32px 16px 16px;
        border-radius: 16px 16px 0 0;
        background-color: #151515;
        z-index: 100;

        &.open {
            animation: slide-in 0.2s ease-in-out;
        }
    }

    .panel-title {
        font-size: 0.875rem;
        color: #888;
    }
`

export default function PanelProvider({ title, isOpen, onClose, children }: BottomPanelProps) {
    const hasPush = useRef(false)

    useEffect(() => {
        if (!isOpen) {
            if (hasPush.current) {
                hasPush.current = false
                history.back()
            }
            return
        }

        if (!hasPush.current) {
            hasPush.current = true
            history.pushState(null, '')
        }

        const handlePopState = () => {
            hasPush.current = false
            onClose?.()
        }

        window.addEventListener('popstate', handlePopState)

        return () => {
            window.removeEventListener('popstate', handlePopState)
        }

    }, [hasPush, isOpen, onClose])

    return (
        <Container className={isOpen ? 'open' : ''}>
            <button className="clickable backdrop" onClick={onClose} />
            <div className={`bottom-panel ${isOpen ? 'open' : ''}`}>
                {title && <div className="panel-title">{title}</div>}
                {children}
            </div>
        </Container>
    )
}
