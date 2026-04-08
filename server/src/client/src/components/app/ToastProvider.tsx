import { Toaster } from 'sonner';

export default function ToastProvider() {
    return (
        <Toaster
            theme="dark"
            position="top-center"
            expand={false}
            visibleToasts={3}
            toastOptions={{
                duration: 2400,
                classNames: {
                    toast: 'app-toast',
                    title: 'app-toast-title',
                    description: 'app-toast-description'
                }
            }}
        />
    );
}
