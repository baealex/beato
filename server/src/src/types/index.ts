import type { Request, Response, NextFunction } from 'express';

export type Controller = (req: Request, res: Response, next?: NextFunction) => Promise<void>;
