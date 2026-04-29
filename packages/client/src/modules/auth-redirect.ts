import axios from 'axios';

const LOGIN_PATH = '/login';

export const AUTH_RECOVERY_PATH_PREFIX = '/api/auth/';

type RedirectLocation = Pick<Location, 'assign' | 'hash' | 'pathname' | 'search'>;

let redirectInProgress = false;

export const buildLoginRedirectUrl = (
    location: Pick<Location, 'hash' | 'pathname' | 'search'> = window.location
) => {
    const redirectTo = `${location.pathname || '/'}${location.search}${location.hash}`;
    return `${LOGIN_PATH}?redirectTo=${encodeURIComponent(redirectTo)}`;
};

export const shouldRedirectToLogin = (error: unknown) => {
    if (!axios.isAxiosError(error) || error.response?.status !== 401) {
        return false;
    }

    const requestUrl = error.config?.url ?? '';

    return !requestUrl.startsWith(AUTH_RECOVERY_PATH_PREFIX) && requestUrl !== LOGIN_PATH;
};

export const redirectToLogin = (location: RedirectLocation = window.location) => {
    if (redirectInProgress || location.pathname === LOGIN_PATH) {
        return;
    }

    redirectInProgress = true;
    location.assign(buildLoginRedirectUrl(location));
};

export const resetAuthRedirectStateForTest = () => {
    redirectInProgress = false;
};
