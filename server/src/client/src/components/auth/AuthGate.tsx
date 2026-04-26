import { useState, type FormEvent } from 'react';
import classNames from 'classnames/bind';

import { appShell } from '~/config/app-shell';
import { Music } from '~/icon';

import styles from './AuthGate.module.scss';

const cx = classNames.bind(styles);

type AuthGateState = 'loading' | 'login' | 'error';

interface AuthGateProps {
    state: AuthGateState;
    errorMessage?: string | null;
    isSubmitting?: boolean;
    onSubmit?: (password: string) => Promise<void> | void;
    onRetry?: () => Promise<void> | void;
}

export default function AuthGate({
    state,
    errorMessage,
    isSubmitting = false,
    onSubmit,
    onRetry
}: AuthGateProps) {
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!onSubmit || !password.trim() || isSubmitting) {
            return;
        }

        await onSubmit(password);
    };

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
                            : state === 'error'
                                ? 'Session Check Failed'
                                : 'Protected Session'}
                    </span>
                </div>
                <h1 className={cx('title')}>{appShell.brand.name}</h1>
                <p className={cx('description')}>
                    {state === 'loading'
                        ? 'Checking whether this listening space is open or requires the shared password.'
                        : state === 'error'
                            ? 'Ocean Wave could not verify the current auth state yet. Retry once the server is reachable.'
                            : 'Password mode is enabled. Sign in before the listening surface, GraphQL API, and live connectors unlock.'}
                </p>
                {errorMessage && <div className={cx('error')}>{errorMessage}</div>}
                {state === 'login' ? (
                    <form className={cx('form')} onSubmit={(event) => void handleSubmit(event)}>
                        <label className={cx('label')} htmlFor="auth-password">
                            Shared password
                        </label>
                        <input
                            id="auth-password"
                            className={cx('input')}
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Enter the session password"
                            disabled={isSubmitting}
                            required
                        />
                        <button className={cx('button')} type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Unlocking...' : 'Unlock Ocean Wave'}
                        </button>
                    </form>
                ) : (
                    <div className={cx('actions')}>
                        {state === 'loading' ? (
                            <div className={cx('loadingPill')}>Verifying session…</div>
                        ) : (
                            <button className={cx('button')} type="button" onClick={() => void onRetry?.()}>
                                Retry Session Check
                            </button>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}
