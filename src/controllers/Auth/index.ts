import { Request, Response } from 'express';
import prisma from '@/services/prismaClient';
import bcrypt from 'bcrypt';
import variables from '@/variables';
import jwt from 'jsonwebtoken';
import {
  handleExpressApi,
  errResponse,
  successResponse,
} from '@/services/global';

const generateToken = (id: string) =>
  jwt.sign({ id }, variables.secret, { expiresIn: '3d' });

// ? login
export const login = (
  req: Request<unknown, unknown, { password: string; username: string }>,
  res: Response
) => {
  const payload = req.body;
  handleExpressApi(res, async () => {
    // ? validation
    if (!payload?.username?.trim())
      return errResponse({
        err: 'username is required',
        res,
        status_code: 500,
      });
    if (!payload?.password?.trim())
      return errResponse({
        err: 'password is required',
        res,
        status_code: 500,
      });

    const employee = await prisma.user.findUnique({
      where: {
        username: payload?.username,
      },
    });
    if (!employee)
      return errResponse({
        err: 'incorrect username',
        res,
        status_code: 500,
      });

    const matched = await bcrypt.compare(payload?.password, employee.password);
    if (!matched)
      return errResponse({
        err: 'incorrect password',
        res,
        status_code: 500,
      });
    // ? token
    const token = generateToken(employee.id?.toString());
    successResponse({
      res,
      data: { username: payload?.username, token },
    });
  });
};
