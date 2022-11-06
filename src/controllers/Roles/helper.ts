import prisma from '@/services/prismaClient';
import type { Params } from '@/types/global';

export const singleRole = (id: number) =>
  prisma.role.findUnique({
    where: {
      id,
    },
  });

export const getRoles = (params: Params) =>
  prisma.role.findMany({
    where: {
      name: {
        contains: params.search,
      },
    },
    orderBy: { created_at: 'asc' },
  });

export const createRole = (data: { name: string }) =>
  prisma.role.create({
    data: {
      name: data.name,
    },
  });

export const updateRole = (id: number, data: { name: string }) =>
  prisma.role.update({
    where: {
      id,
    },
    data: {
      name: data.name,
    },
  });

export const deleteRole = (id: number) =>
  prisma.role.delete({
    where: {
      id,
    },
  });
