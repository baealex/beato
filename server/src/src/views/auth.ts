import type { Controller } from '~/types';

import {
    buildAuthSessionResponse,
    clearAuthenticatedSession,
    compareSharedSecret,
    isAuthenticatedRequest,
    resolveRedirectPath,
    resolveAuthSessionResponse,
    setAuthenticatedSession
} from '~/modules/auth';
import type { AuthConfig } from '~/modules/auth-mode';

const INVALID_PASSWORD_RESPONSE = {
    code: 'UNAUTHORIZED',
    message: 'Invalid password'
} as const;

const escapeHtml = (value: string) => {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll('\'', '&#39;');
};

const renderLoginPage = (input: {
    redirectTo: string;
    errorMessage?: string;
}) => {
    const errorSection = input.errorMessage
        ? `<div class="error" role="alert">${escapeHtml(input.errorMessage)}</div>`
        : '';

    return `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#09090b" />
    <title>Ocean Wave Sign In</title>
    <style>
        :root {
            color-scheme: dark;
            --bg: #09090b;
            --page: radial-gradient(circle at top, rgba(140, 80, 255, 0.06), transparent 32%), linear-gradient(180deg, rgba(9, 9, 11, 0.98) 0%, rgba(6, 6, 8, 1) 100%);
            --panel: linear-gradient(180deg, rgba(18, 18, 22, 0.98) 0%, rgba(10, 10, 14, 0.98) 100%);
            --panel-border: rgba(160, 100, 255, 0.1);
            --text-primary: rgba(255, 255, 255, 0.9);
            --text-secondary: rgba(255, 255, 255, 0.7);
            --text-muted: rgba(255, 255, 255, 0.32);
            --accent: #8c50ff;
            --accent-light: #c8a0ff;
            --accent-text: #09090b;
            --focus-ring: rgba(140, 80, 255, 0.14);
            --input-bg: rgba(24, 24, 28, 0.7);
            --input-focus: rgba(26, 26, 32, 0.9);
            --error-bg: rgba(78, 18, 22, 0.58);
            --error-border: rgba(247, 113, 113, 0.28);
            --error-text: #ffd9d9;
            font-family: Inter, "Pretendard Variable", "Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            min-height: 100vh;
            display: grid;
            place-items: center;
            padding: 24px;
            background: var(--page);
            color: var(--text-primary);
        }

        .shell {
            width: min(440px, 100%);
        }

        .brandLockup {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 18px;
        }

        .mark {
            width: 44px;
            height: 44px;
            border-radius: 14px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            background: linear-gradient(135deg, #dcc0ff 0%, #c8a0ff 34%, #8c50ff 100%);
            color: var(--accent-text);
            font-size: 13px;
            font-weight: 800;
            box-shadow:
                inset 0 1px 0 rgba(255, 255, 255, 0.3),
                0 16px 32px var(--focus-ring);
        }

        .eyebrow {
            color: var(--accent-light);
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0;
            text-transform: uppercase;
        }

        .panel {
            padding: 32px;
            border: 1px solid var(--panel-border);
            border-radius: 28px;
            background: var(--panel);
            box-shadow:
                0 22px 50px rgba(0, 0, 0, 0.5),
                0 0 52px rgba(140, 80, 255, 0.06),
                inset 0 1px 0 rgba(255, 255, 255, 0.06);
            backdrop-filter: blur(18px);
        }

        h1 {
            margin: 0;
            color: var(--text-primary);
            font-size: clamp(2rem, 5vw, 2.5rem);
            line-height: 1.12;
            letter-spacing: 0;
        }

        .description {
            margin: 16px 0 0;
            color: var(--text-secondary);
            line-height: 1.6;
        }

        form {
            margin-top: 24px;
            display: grid;
            gap: 12px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            color: var(--text-muted);
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0;
            text-transform: uppercase;
        }

        input {
            width: 100%;
            min-height: 48px;
            padding: 0 16px;
            border: 1px solid var(--panel-border);
            border-radius: 9999px;
            background: var(--input-bg);
            color: var(--text-primary);
            font-size: 16px;
            transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
            transition-property: border-color, box-shadow, background-color;
        }

        input:focus {
            outline: none;
            border-color: var(--accent);
            background: var(--input-focus);
            box-shadow: 0 0 0 3px var(--focus-ring);
        }

        button {
            width: 100%;
            min-height: 48px;
            padding: 0 18px;
            border: none;
            border-radius: 9999px;
            background: linear-gradient(135deg, #dcc0ff 0%, #c8a0ff 34%, #8c50ff 100%);
            color: var(--accent-text);
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            box-shadow:
                inset 0 1px 0 rgba(255, 255, 255, 0.32),
                0 16px 32px var(--focus-ring);
            transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
            transition-property: filter, box-shadow;
        }

        button:hover {
            filter: saturate(1.04) brightness(1.04);
            box-shadow:
                inset 0 1px 0 rgba(255, 255, 255, 0.36),
                0 20px 40px rgba(140, 80, 255, 0.2);
        }

        .hint {
            margin-top: 16px;
            color: var(--text-muted);
            font-size: 13px;
            line-height: 1.5;
        }

        .error {
            margin-top: 24px;
            padding: 14px 16px;
            border: 1px solid var(--error-border);
            border-radius: 14px;
            background: var(--error-bg);
            color: var(--error-text);
            font-size: 14px;
            line-height: 1.45;
        }

        @media (max-width: 640px) {
            body {
                padding: 16px;
            }

            .panel {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <main class="shell">
        <section class="panel" aria-labelledby="login-title">
            <div class="brandLockup">
                <span class="mark" aria-hidden="true">OW</span>
                <span class="eyebrow">Protected Session</span>
            </div>
            <h1 id="login-title">Ocean Wave</h1>
            <p class="description">Password mode is enabled. Sign in before the listening surface, GraphQL API, and live connectors unlock.</p>
            ${errorSection}
            <form method="post" action="/login">
                <input type="hidden" name="redirectTo" value="${escapeHtml(input.redirectTo)}" />
                <div>
                    <label for="password">Shared password</label>
                    <input id="password" name="password" type="password" autocomplete="current-password" required autofocus />
                </div>
                <button type="submit">Unlock Ocean Wave</button>
            </form>
            <div class="hint">The server validates the password and opens the session before the client app starts.</div>
        </section>
    </main>
</body>
</html>`;
};

export const createSessionStatusHandler = (authConfig: AuthConfig): Controller => {
    return async (req, res) => {
        res.status(200).json(resolveAuthSessionResponse(authConfig, req)).end();
    };
};

export const createLoginPageHandler = (authConfig: AuthConfig): Controller => {
    return async (req, res) => {
        if (authConfig.mode !== 'password') {
            res.redirect(303, resolveRedirectPath(req.query.redirectTo));
            return;
        }

        const redirectTo = resolveRedirectPath(req.query.redirectTo);

        if (isAuthenticatedRequest(authConfig, req)) {
            res.redirect(303, redirectTo);
            return;
        }

        res
            .status(200)
            .type('html')
            .send(renderLoginPage({ redirectTo }))
            .end();
    };
};

export const createLoginPageSubmitHandler = (authConfig: AuthConfig): Controller => {
    return async (req, res) => {
        const redirectTo = resolveRedirectPath(req.body?.redirectTo);

        if (authConfig.mode !== 'password') {
            res.redirect(303, redirectTo);
            return;
        }

        const password = typeof req.body?.password === 'string'
            ? req.body.password
            : '';

        if (!password || !compareSharedSecret(authConfig.password, password)) {
            res
                .status(401)
                .type('html')
                .send(renderLoginPage({
                    redirectTo,
                    errorMessage: INVALID_PASSWORD_RESPONSE.message
                }))
                .end();
            return;
        }

        setAuthenticatedSession(authConfig, res);
        res.redirect(303, redirectTo);
    };
};

export const createLogoutPageHandler = (authConfig: AuthConfig): Controller => {
    return async (_req, res) => {
        clearAuthenticatedSession(authConfig, res);
        res.redirect(303, authConfig.mode === 'password' ? '/login' : '/');
    };
};

export const createApiLogoutHandler = (authConfig: AuthConfig): Controller => {
    return async (_req, res) => {
        clearAuthenticatedSession(authConfig, res);
        res.status(200).json(buildAuthSessionResponse(authConfig, false)).end();
    };
};
