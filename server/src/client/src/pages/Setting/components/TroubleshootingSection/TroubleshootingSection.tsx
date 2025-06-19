import { Button } from '~/components/shared';

import styles from './TroubleshootingSection.module.scss';

export const TroubleshootingSection = () => {
    return (
        <section>
            <h3>Have a problem?</h3>
            <div className={styles.buttonContainer}>
                <Button onClick={() => window.location.reload()}>
                    Try Refresh
                </Button>
            </div>
        </section>
    );
};
