import { Button } from '~/components/shared';
import { useBack } from '~/hooks';
import styles from './NotFound.module.scss';

export default function NotFound() {
    const back = useBack();

    return (
        <div className={styles.container}>
            <div className={styles.code}>
                404
            </div>
            <div className={styles.text}>
                Page not found
            </div>
            <Button onClick={back}>
                Go back
            </Button>
        </div>
    );
}
