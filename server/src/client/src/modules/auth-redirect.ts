const LOGIN_PATH = '/login';

export const AUTH_RECOVERY_PATH_PREFIX = '/api/auth/';

export const buildLoginRedirectUrl = () => {
    const redirectTo = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    return `${LOGIN_PATH}?redirectTo=${encodeURIComponent(redirectTo)}`;
};

export const redirectToLogin = () => {
    window.location.assign(buildLoginRedirectUrl());
};
