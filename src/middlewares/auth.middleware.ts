import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../config';
import { UserModel } from '../data';

export class AuthMiddleware {
  static async validateJwt(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      req.body.user = undefined;
      return next();
    }

    // if (!token) return res.status(401).json({ message: 'Token not found' });

    if (token && !token.startsWith('Bearer '))
      return res.status(401).json({ message: 'Invalid Bearer token' });

    const jwt = token.split(' ').at(1) || '';

    try {
      const payload = await JwtAdapter.verifyToken<{ id: string }>(jwt);

      if (!payload) return res.status(401).json({ message: 'Invalid token' });

      const user = await UserModel.findById(payload.id);

      if (!user) return res.status(401).json({ message: 'User not found' });

      req.body.user = user;

      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
