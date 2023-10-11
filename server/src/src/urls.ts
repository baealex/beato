import { Router } from 'express';
import * as views from './views';
import useAsync from './modules/use-async';

export default Router()
    .get('/music/:id/count', useAsync(views.count))
    .get('/audio/:id', useAsync(views.audio))
    .get('/home', useAsync(views.home));
