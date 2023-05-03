import { NextFunction, Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import { NotAuthorizedError } from './errorHandler';
import { AuthPayload } from '@auth/interfaces/auth.interface';
import { config } from '@root/config';

export class AuthMiddleware {
  public verifyUser(req: Request, _res: Response, next: NextFunction): void {
    if (!req.session?.jwt) {
      throw new NotAuthorizedError('Token is unavailable. Please login again.');
    }

    try {
      const payload: AuthPayload = JWT.verify(req.session?.jwt, config.JWT_SECRET!) as AuthPayload;
      req.currentUser = payload;
    } catch (error) {
      throw new NotAuthorizedError('Token is invalid. Please login again.');
    }

    next();
  }

  public checkAuthentication(req: Request, _res: Response, next: NextFunction): void {
    if (!req.currentUser) {
      throw new NotAuthorizedError('Authentication is required');
    }

    next();
  }
}

export const authMiddleware: AuthMiddleware = new AuthMiddleware();
