import { Router } from 'express';
import * as views from './views';
import useAsync from './modules/use-async';

export default Router()
    .get('/audio/:id', useAsync(views.audio))
    .get('/home', useAsync(views.home));
