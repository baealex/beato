import './styles/app.scss';
import './styles/toast.scss';
import './styles/window-modal.scss';

import App from './App.svelte';

const app = new App({
    target: document.getElementById('app'),
});

export default app;
