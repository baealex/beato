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
    <meta name="theme-color" content="#051014" />
    <title>Ocean Wave Sign In</title>
    <style>
        :root {
            color-scheme: dark;
            --bg: #051014;
            --page: radial-gradient(circle at 18% -8%, rgba(70, 215, 207, 0.1), transparent 34%), radial-gradient(circle at 100% 0%, rgba(29, 96, 111, 0.14), transparent 34%), linear-gradient(180deg, rgba(5, 16, 20, 0.98) 0%, rgba(3, 10, 13, 1) 100%);
            --panel: linear-gradient(180deg, rgba(13, 33, 40, 0.98) 0%, rgba(6, 19, 24, 0.98) 100%);
            --panel-subtle: rgba(202, 247, 249, 0.04);
            --panel-item: rgba(202, 247, 249, 0.06);
            --panel-border: rgba(196, 244, 248, 0.1);
            --panel-border-strong: rgba(196, 244, 248, 0.16);
            --text-primary: rgba(238, 252, 255, 0.92);
            --text-secondary: rgba(218, 243, 247, 0.72);
            --text-muted: rgba(178, 214, 221, 0.34);
            --accent: #46d7cf;
            --accent-light: #a7fff6;
            --accent-deep: #128fa0;
            --accent-text: #031014;
            --focus-ring: rgba(70, 215, 207, 0.15);
            --glow: rgba(70, 215, 207, 0.11);
            --input-bg: rgba(18, 45, 54, 0.72);
            --input-focus: rgba(25, 62, 72, 0.92);
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
            overflow-x: hidden;
        }

        body::before {
            position: fixed;
            inset: auto -10vw -24vh 42vw;
            height: 50vh;
            border-radius: 9999px;
            background: radial-gradient(circle, rgba(70, 215, 207, 0.12), transparent 62%);
            filter: blur(20px);
            pointer-events: none;
            content: "";
        }

        .shell {
            position: relative;
            width: min(460px, 100%);
        }

        .brand {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 18px;
            color: var(--text-primary);
            font-size: 15px;
            font-weight: 700;
        }

        .mark {
            width: 46px;
            height: 46px;
            border: 1px solid var(--panel-border);
            border-radius: 16px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            overflow: hidden;
            background: var(--panel-item);
            box-shadow:
                inset 0 1px 0 rgba(255, 255, 255, 0.08),
                0 16px 32px var(--focus-ring);
        }

        .mark img {
            width: 100%;
            height: 100%;
            display: block;
        }

        .brand-copy {
            display: grid;
            gap: 2px;
        }

        .brand-kicker {
            color: var(--accent-light);
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }

        .panel {
            padding: 32px;
            border: 1px solid var(--panel-border);
            border-radius: 28px;
            background: var(--panel);
            box-shadow:
                0 22px 50px rgba(0, 0, 0, 0.5),
                0 0 60px var(--glow),
                inset 0 1px 0 rgba(255, 255, 255, 0.06);
            backdrop-filter: blur(18px);
        }

        h1 {
            margin: 0;
            color: var(--text-primary);
            font-size: clamp(1.75rem, 5vw, 2.25rem);
            line-height: 1.12;
            letter-spacing: -0.035em;
        }

        .lead {
            margin: 14px 0 0;
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
            color: var(--accent-light);
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.08em;
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

        input::placeholder {
            color: var(--text-muted);
        }

        button {
            width: 100%;
            min-height: 48px;
            padding: 0 18px;
            border: none;
            border-radius: 9999px;
            background: linear-gradient(135deg, #c9fff7 0%, #5eead4 38%, #128fa0 100%);
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
                0 20px 40px rgba(70, 215, 207, 0.2);
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

        .hint {
            margin-top: 16px;
            color: var(--text-muted);
            font-size: 13px;
            line-height: 1.5;
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
        <div class="brand">
            <span class="mark" aria-hidden="true">
                <img src="/ocean-wave.svg" alt="" />
            </span>
            <span class="brand-copy">
                <span class="brand-kicker">Private listening room</span>
                <span>Ocean Wave</span>
            </span>
        </div>
        <section class="panel" aria-labelledby="login-title">
            <h1 id="login-title">Sign in</h1>
            <p class="lead">Enter the Ocean Wave password to continue.</p>
            ${errorSection}
            <form method="post" action="/login">
                <input type="hidden" name="redirectTo" value="${escapeHtml(input.redirectTo)}" />
                <div>
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password" autocomplete="current-password" required autofocus />
                </div>
                <button type="submit">Sign in</button>
            </form>
            <div class="hint">The app opens after this session is authenticated.</div>
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
