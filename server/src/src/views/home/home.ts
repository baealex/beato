import type { Controller } from '~/types';

export const home: Controller = async (req, res) => {
    res.send('Hello, My Express JS!\n').end();
};
