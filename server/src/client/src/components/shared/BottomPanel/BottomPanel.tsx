import styles from './BottomPanel.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import React, { useEffect, useRef } from 'react';

interface BottomPanelProps {
    title?: string;
    isOpen: boolean;
    onClose?: () => void;
    children: React.ReactNode;
}

const BottomPanel = ({
    title,
    isOpen,
    onClose,
    children
}: BottomPanelProps) => {
    const hasPush = useRef(false);

    useEffect(() => {
        if (!isOpen) {
            if (hasPush.current) {
                hasPush.current = false;
                history.back();
            }
            return;
        }

        if (!hasPush.current) {
            hasPush.current = true;
            history.pushState(null, '');
        }

        const handlePopState = () => {
            hasPush.current = false;
            onClose?.();
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };

    }, [hasPush, isOpen, onClose]);

    return (
        <div
            className={cx('BottomPanel', { 'open': isOpen })}>
            <button className={cx('clickable', 'backdrop')} onClick={onClose} />
            <div
                className={cx('bottom-panel', { 'open': isOpen })}>
                {title && <div className={cx('panel-title')}>{title}</div>}
                {children}
            </div>
        </div>
    );
};

export default BottomPanel;
