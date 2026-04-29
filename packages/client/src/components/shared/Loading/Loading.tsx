import styles from './Loading.module.scss';
import { useEffect, useState } from 'react';

const Loading = () => {
    const [shouldShow, setShouldShow] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShouldShow(true);
        }, 100);

        return () => clearTimeout(timeout);
    });

    return (
        shouldShow && (
            <div className={styles.Loading}>
                <div className={styles['sound-wave']}>
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
            </div>
        )
    );
};

export default Loading;
