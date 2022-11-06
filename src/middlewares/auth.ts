import jwt, { JwtPayload } from 'jsonwebtoken';
import variables from '../variables';
import { NextFunction, Request, Response } from 'express';
import prisma from '@/services/prismaClient';
import { user } from '@prisma/client';

type UserRequest = Request & {
  user?: user | null;
};

export const requireAuth = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  // ? verify auth
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json({ message: 'Authorization token required' });

  const token = authorization?.split(' ')[1];

  try {
    const payload = jwt.verify(token, variables.secret) as JwtPayload;
    const user = await prisma.user.findUnique({
      where: {
        id: Number(payload.id),
      },
    });
    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({ message: 'request is not authorized' });
  }
};
