import { handleExpressApi, successResponse } from '@/services/global';
import { task } from '@prisma/client';
import { Request, Response } from 'express';
import * as actions from './helper';

// ? GET /tasks
export const getAllTasks = (_req: Request, res: Response) => {
  handleExpressApi(res, async () => {
    const tasks = await actions.getTasks({ search: '' });
    return successResponse({
      res,
      data: { tasks },
    });
  });
};

// ? GET /tasks/:id
export const getTask = (req: Request, res: Response) => {
  const id = req.params.id;
  handleExpressApi(res, async () => {
    const task = await actions.getTask(Number(id));
    return successResponse({
      res,
      data: { task },
    });
  });
};

// ? DELETE /tasks/:id
export const deleteTask = (req: Request, res: Response) => {
  const id = req.params.id;
  handleExpressApi(res, async () => {
    const task = await actions.deleteTask(Number(id));
    return successResponse({
      res,
      data: { task },
    });
  });
};

// ? PUT /tasks/:id
export const updateTask = (
  req: Request<
    { id: string },
    { data: { user: task } },
    Omit<task, 'created_at' | 'id'>
  >,
  res: Response
) => {
  const id = req.params.id;
  const data = req.body;
  handleExpressApi(res, async () => {
    const user = await actions.updateTask(Number(id), data);
    return successResponse({
      data: { user },
      res,
    });
  });
};

// ? POST /tasks/:id
export const createTask = (
  req: Request<
    unknown,
    { data: { role: task } },
    Omit<task, 'created_at' | 'id'>
  >,
  res: Response
) => {
  const data = req.body;
  handleExpressApi(res, async () => {
    const task = await actions.createTask(data);
    return successResponse({
      data: { task },
      res,
    });
  });
};
