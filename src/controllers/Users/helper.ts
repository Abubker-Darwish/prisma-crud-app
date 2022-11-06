import prisma from '@/services/prismaClient';
import type { Params } from '@/types/global';
import { user } from '@prisma/client';

export const getUsers = (params: Params) =>
  prisma.user.findMany({
    where: {
      first_name: {
        contains: params.search,
      },
      last_name: {
        contains: params.search,
      },
    },
    orderBy: { created_at: 'asc' },
  });

export const getUser = (id: number) =>
  prisma.user.findUnique({
    where: {
      id,
    },
  });

export const createUser = (data: Omit<user, 'created_at' | 'id'>) =>
  prisma.user.create({
    data,
  });

export const updateUser = (id: number, data: Omit<user, 'created_at' | 'id'>) =>
  prisma.user.update({
    where: { id },
    data,
  });

export const deleteUser = (id: number) =>
  prisma.user.delete({
    where: { id },
  });
