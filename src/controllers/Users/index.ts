import { handleExpressApi, successResponse } from '@/services/global';
import { user } from '@prisma/client';
import { Request, Response } from 'express';
import * as actions from './helper';

// ? GET /users
export const getAllUsers = (req: Request, res: Response) => {
  handleExpressApi(res, async () => {
    const users = await actions.getUsers({ search: '' });
    return successResponse({
      res,
      data: { users },
    });
  });
};

// ? GET /users/:id
export const getUser = (req: Request, res: Response) => {
  const id = req.params.id;
  handleExpressApi(res, async () => {
    const user = await actions.getUser(Number(id));
    return successResponse({
      res,
      data: { user },
    });
  });
};

// ? DELETE /users/:id
export const deleteUser = (req: Request, res: Response) => {
  const id = req.params.id;
  handleExpressApi(res, async () => {
    const user = await actions.deleteUser(Number(id));
    return successResponse({
      res,
      data: { user },
    });
  });
};

// ? PUT /roles/:id
export const updateUser = (
  req: Request<
    { id: string },
    { data: { user: user } },
    Omit<user, 'created_at' | 'id'>
  >,
  res: Response
) => {
  const id = req.params.id;
  const data = req.body;
  handleExpressApi(res, async () => {
    const user = await actions.updateUser(Number(id), data);
    return successResponse({
      data: { user },
      res,
    });
  });
};

// ? POST /roles/:id
export const createRole = (
  req: Request<
    unknown,
    { data: { role: user } },
    Omit<user, 'created_at' | 'id'>
  >,
  res: Response
) => {
  const data = req.body;
  handleExpressApi(res, async () => {
    const user = await actions.createUser(data);
    return successResponse({
      data: { user },
      res,
    });
  });
};
