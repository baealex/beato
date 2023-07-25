import 'blend-box/css/style.css';
import './styles/toast.scss';
import './styles/app.scss';

import App from './App.svelte';

const app = new App({
    target: document.getElementById('app'),
});

export default app;
