import { user } from '@prisma/client';
import { Request } from 'express';

export type Params = {
  search: string;
};

export type UserRequest = Request & {
  user?: user | null;
};
