import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { AuthConfigurations } from '@config/auth';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: number;
  iat: number;
  exp: number;
}

export const ensureAuthenticatedMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const authConfigurations = new AuthConfigurations();

  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError('Unauthorized access', 401);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, String(authConfigurations.secret));
    const { id } = data as TokenPayload;
    request.userId = id;
    return next();
  } catch {
    throw new AppError('Unauthorized access', 401);
  }
};
