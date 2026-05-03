import classNames from 'classnames';

import { appShell } from '~/config/app-shell';
import { Button, Tag, Text } from '~/components/shared';
import { Music } from '~/icon';


const cx = classNames;

type AuthGateState = 'loading' | 'error';

interface AuthGateProps {
    state: AuthGateState;
    errorMessage?: string | null;
    onRetry?: () => Promise<void> | void;
}

export default function AuthGate({
    state,
    errorMessage,
    onRetry
}: AuthGateProps) {
    return (
        <div className={cx('ow-auth-gate-AuthGate')}>
            <section className={cx('ow-auth-gate-panel')}>
                <div className={cx('ow-auth-gate-brandLockup')}>
                    <span className={cx('ow-auth-gate-mark')} aria-hidden="true">
                        <Music />
                    </span>
                    <Text as="span" variant="secondary" size="xs" weight="bold" className={cx('ow-auth-gate-eyebrow')}>
                        {state === 'loading'
                            ? 'Checking Session'
                            : 'Session Check Failed'}
                    </Text>
                </div>
                <Text as="h1" size="2xl" weight="bold" className={cx('ow-auth-gate-title')}>
                    {appShell.brand.name}
                </Text>
                <Text as="p" variant="secondary" className={cx('ow-auth-gate-description')}>
                    {state === 'loading'
                        ? 'Checking whether this listening space is open or requires the shared password.'
                        : state === 'error'
                            ? 'Ocean Wave could not verify the current auth state yet. Retry once the server is reachable.'
                            : null}
                </Text>
                {errorMessage && <div className={cx('ow-auth-gate-error')}>{errorMessage}</div>}
                <div className={cx('ow-auth-gate-actions')}>
                    {state === 'loading' ? (
                        <Tag tone="accent" selected>Verifying session...</Tag>
                    ) : (
                        <Button variant="primary" fullWidth onClick={() => void onRetry?.()}>
                            Retry Session Check
                        </Button>
                    )}
                </div>
            </section>
        </div>
    );
}
