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
    <meta name="theme-color" content="#03141b" />
    <title>Ocean Wave Sign In</title>
    <style>
        :root {
            color-scheme: dark;
            --bg: #03141b;
            --panel: rgba(12, 30, 40, 0.92);
            --panel-border: rgba(135, 181, 200, 0.18);
            --text-primary: #ecf8ff;
            --text-secondary: #98b4c2;
            --text-muted: #6f8a98;
            --accent: #56b7ff;
            --accent-hover: #7ac7ff;
            --accent-text: #02131c;
            --input-bg: rgba(2, 15, 21, 0.9);
            --input-border: rgba(135, 181, 200, 0.2);
            --error-bg: rgba(171, 74, 74, 0.16);
            --error-border: rgba(229, 112, 112, 0.38);
            --error-text: #ffb7b7;
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
            background:
                radial-gradient(circle at top, rgba(86, 183, 255, 0.12), transparent 36%),
                linear-gradient(180deg, #04131a 0%, #03141b 100%);
            color: var(--text-primary);
        }

        .shell {
            width: min(420px, 100%);
        }

        .brand {
            margin-bottom: 12px;
            color: var(--text-muted);
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }

        .panel {
            padding: 24px;
            border: 1px solid var(--panel-border);
            border-radius: 20px;
            background: var(--panel);
            box-shadow: 0 24px 60px rgba(0, 0, 0, 0.24);
            backdrop-filter: blur(18px);
        }

        h1 {
            margin: 0;
            font-size: 28px;
            line-height: 1.15;
        }

        .description {
            margin: 10px 0 24px;
            color: var(--text-secondary);
            font-size: 15px;
            line-height: 1.6;
        }

        form {
            display: grid;
            gap: 16px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            color: var(--text-secondary);
            font-size: 13px;
            font-weight: 600;
        }

        input {
            width: 100%;
            padding: 14px 16px;
            border: 1px solid var(--input-border);
            border-radius: 14px;
            background: var(--input-bg);
            color: var(--text-primary);
            font-size: 16px;
        }

        input:focus {
            outline: none;
            border-color: var(--accent);
            box-shadow: 0 0 0 4px rgba(86, 183, 255, 0.14);
        }

        button {
            width: 100%;
            padding: 14px 18px;
            border: none;
            border-radius: 14px;
            background: var(--accent);
            color: var(--accent-text);
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
        }

        button:hover {
            background: var(--accent-hover);
        }

        .hint {
            margin-top: 16px;
            color: var(--text-muted);
            font-size: 13px;
            line-height: 1.5;
        }

        .error {
            margin-bottom: 18px;
            padding: 12px 14px;
            border: 1px solid var(--error-border);
            border-radius: 14px;
            background: var(--error-bg);
            color: var(--error-text);
            font-size: 14px;
            font-weight: 600;
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
        <div class="brand">Ocean Wave</div>
        <section class="panel" aria-labelledby="login-title">
            <h1 id="login-title">Sign in</h1>
            <p class="description">Enter the shared password before the Ocean Wave app loads.</p>
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
