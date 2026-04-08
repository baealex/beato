export type AuthMode = 'open' | 'password-protected';

export interface AuthConfig {
    mode: AuthMode;
    password?: string;
    sessionSecret?: string;
}

export interface AuthModeEnvironment {
    [key: string]: string | undefined;
    OCEAN_WAVE_AUTH_PASSWORD?: string;
    OCEAN_WAVE_SESSION_SECRET?: string;
}

export const resolveAuthConfig = (env: AuthModeEnvironment): AuthConfig => {
    const password = env.OCEAN_WAVE_AUTH_PASSWORD?.trim();

    if (!password) {
        return { mode: 'open' };
    }

    return {
        mode: 'password-protected',
        password,
        sessionSecret: env.OCEAN_WAVE_SESSION_SECRET?.trim() || password
    };
};

export const logAuthConfig = (authConfig: AuthConfig) => {
    if (authConfig.mode === 'open') {
        process.stderr.write('[auth] Running in open mode. Authentication is not required.\n');
        return;
    }

    process.stdout.write('[auth] Running in password-protected mode. Authentication is required.\n');
};
