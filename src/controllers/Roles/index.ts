import { handleExpressApi, successResponse } from '@/services/global';
import { role } from '@prisma/client';
import { Request, Response } from 'express';
import * as actions from './helper';

// ? GET /roles
export const getAllRoles = (_req: Request, res: Response) => {
  handleExpressApi(res, async () => {
    const roles = await actions.getRoles({ search: '' });
    return successResponse({
      data: { roles },
      res,
    });
  });
};

// ? GET /roles/:id
export const getRole = (req: Request, res: Response) => {
  const id = req.params.id;
  handleExpressApi(res, async () => {
    const role = await actions.singleRole(Number(id));
    successResponse({
      data: { role },
      res,
    });
  });
};

// ? DELETE /roles/:id
export const deleteRole = (req: Request, res: Response) => {
  const id = req.params.id;
  handleExpressApi(res, async () => {
    const role = await actions.deleteRole(Number(id));
    return successResponse({
      data: { role },
      res,
    });
  });
};

// ? PUT /roles/:id
export const updateRole = (
  req: Request<{ id: string }, { data: { role: role } }, { name: string }>,
  res: Response
) => {
  const id = req.params.id;
  const data = req.body;
  handleExpressApi(res, async () => {
    const role = await actions.updateRole(Number(id), data);
    return successResponse({
      data: { role },
      res,
    });
  });
};

// ? POST /roles
export const createRole = (
  req: Request<unknown, { data: { role: role } }, { name: string }>,
  res: Response
) => {
  const data = req.body;
  handleExpressApi(res, async () => {
    const role = await actions.createRole(data);
    successResponse({
      data: { role },
      res,
    });
  });
};
