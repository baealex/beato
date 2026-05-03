import { Button } from '~/components/shared';
import { useBack } from '~/hooks';

export default function NotFound() {
    const back = useBack();

    return (
        <div className={'ow-not-found-container'}>
            <div className={'ow-not-found-code'}>
                404
            </div>
            <div className={'ow-not-found-text'}>
                Page not found
            </div>
            <Button onClick={back}>
                Go back
            </Button>
        </div>
    );
}
