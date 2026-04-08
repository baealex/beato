import { Button } from '~/components/shared';
import { useBack } from '~/hooks';
import styles from './NotFound.module.scss';

export default function NotFound() {
    const back = useBack();

    return (
        <div className={styles.container}>
            <div className={styles.dance}>
                {'(㇏(•̀ᵥᵥ•́)ノ)'}
            </div>
            <div className={styles.text}>
                Why are you here, huh?
            </div>
            <Button onClick={back}>
                Take you back
            </Button>
        </div>
    );
}
