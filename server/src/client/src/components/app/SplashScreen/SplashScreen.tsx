import { Music } from '~/icon';
import { appShell } from '~/config/app-shell';

import styles from './SplashScreen.module.scss';

interface SplashScreenProps {
    isExiting: boolean;
}

export default function SplashScreen({ isExiting }: SplashScreenProps) {
    return (
        <div className={`${styles.splash} ${isExiting ? styles.exiting : ''}`}>
            <div className={styles.content}>
                <div className={styles.icon}>
                    <Music />
                </div>
                <span className={styles.name}>{appShell.brand.name}</span>
            </div>
        </div>
    );
}
