import { NextFunction, Request, Response } from 'express';

import env from '@/utils/env';

export const apiAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['api-key'];

  if (apiKey == env.API_KEY_VALUE) {
    next();
  } else {
    res.status(401).send({ error: 'Unauthorized' });
  }
};
