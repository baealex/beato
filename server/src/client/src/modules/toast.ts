import { toast as sonnerToast, type ExternalToast } from 'sonner';

const DEFAULT_OPTIONS: ExternalToast = { duration: 2400 };

const withDefaults = (options?: ExternalToast): ExternalToast => ({
    ...DEFAULT_OPTIONS,
    ...options
});

type ToastResult = ReturnType<typeof sonnerToast>;

interface ToastApi {
    (message: string, options?: ExternalToast): ToastResult;
    success: (message: string, options?: ExternalToast) => ToastResult;
    error: (message: string, options?: ExternalToast) => ToastResult;
}

export const toast = Object.assign(
    (message: string, options?: ExternalToast) => sonnerToast(message, withDefaults(options)),
    {
        success: (message: string, options?: ExternalToast) => sonnerToast.success(message, withDefaults(options)),
        error: (message: string, options?: ExternalToast) => sonnerToast.error(message, withDefaults(options))
    }
) as ToastApi;
