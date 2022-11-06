import prisma from '@/services/prismaClient';
import type { Params } from '@/types/global';
import { task } from '@prisma/client';

export const getTask = (id: number) =>
  prisma.task.findUnique({ where: { id } });

export const getTasks = (params: Params) =>
  prisma.task.findMany({
    where: {
      author: {
        first_name: {
          contains: params.search,
        },
        last_name: {
          contains: params.search,
        },
      },
    },
    orderBy: { created_at: 'asc' },
  });

export const createTask = (data: Omit<task, 'created_at' | 'id'>) =>
  prisma.task.create({ data });

export const updateTask = (id: number, data: Omit<task, 'created_at' | 'id'>) =>
  prisma.task.update({ where: { id }, data });

export const deleteTask = (id: number) => prisma.task.delete({ where: { id } });
