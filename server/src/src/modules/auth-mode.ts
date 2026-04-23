import {
    resolvePasswordAuthConfig,
    type AuthConfig,
    type AuthEnvironment
} from '@baejino/auth';

export type { AuthConfig, AuthMode } from '@baejino/auth';

export const AUTH_SESSION_COOKIE_NAME = 'ocean-wave.sid';

export interface AuthModeEnvironment extends AuthEnvironment {
    [key: string]: string | undefined;
    OCEAN_WAVE_AUTH_PASSWORD?: string;
    OCEAN_WAVE_SESSION_SECRET?: string;
    OCEAN_WAVE_ALLOW_INSECURE_NO_AUTH?: string;
}

export const resolveAuthConfig = (env: AuthModeEnvironment): AuthConfig => resolvePasswordAuthConfig({
    env,
    passwordEnv: 'OCEAN_WAVE_AUTH_PASSWORD',
    sessionSecretEnv: 'OCEAN_WAVE_SESSION_SECRET',
    allowOpenEnv: 'OCEAN_WAVE_ALLOW_INSECURE_NO_AUTH',
    cookieName: AUTH_SESSION_COOKIE_NAME
});

export const logAuthConfig = (authConfig: AuthConfig) => {
    if (authConfig.mode === 'open') {
        process.stderr.write('[auth] Running in explicit open mode. Authentication is not required.\n');
        return;
    }

    process.stdout.write('[auth] Running in password mode. Authentication is required.\n');
};
