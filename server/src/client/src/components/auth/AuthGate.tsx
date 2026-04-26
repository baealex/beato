import classNames from 'classnames/bind';

import { appShell } from '~/config/app-shell';
import { Music } from '~/icon';

import styles from './AuthGate.module.scss';

const cx = classNames.bind(styles);

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
        <div className={cx('AuthGate')}>
            <section className={cx('panel')}>
                <div className={cx('brandLockup')}>
                    <span className={cx('mark')} aria-hidden="true">
                        <Music />
                    </span>
                    <span className={cx('eyebrow')}>
                        {state === 'loading'
                            ? 'Checking Session'
                            : 'Session Check Failed'}
                    </span>
                </div>
                <h1 className={cx('title')}>{appShell.brand.name}</h1>
                <p className={cx('description')}>
                    {state === 'loading'
                        ? 'Checking whether this listening space is open or requires the shared password.'
                        : state === 'error'
                            ? 'Ocean Wave could not verify the current auth state yet. Retry once the server is reachable.'
                            : null}
                </p>
                {errorMessage && <div className={cx('error')}>{errorMessage}</div>}
                <div className={cx('actions')}>
                    {state === 'loading' ? (
                        <div className={cx('loadingPill')}>Verifying session…</div>
                    ) : (
                        <button className={cx('button')} type="button" onClick={() => void onRetry?.()}>
                            Retry Session Check
                        </button>
                    )}
                </div>
            </section>
        </div>
    );
}
