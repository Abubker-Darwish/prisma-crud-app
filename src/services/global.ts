import { Response } from 'express';

type successType = {
  res: Response;
  data: unknown;
};
type errType = {
  res: Response;
  err: unknown;
  status_code?: 500 | 404 | 400;
};

export const handleErrMsg = (e: unknown) => {
  let err = String(e);
  if (e instanceof Error) err = e.message;
  return err;
};

export const successResponse = ({ res, data }: successType) => {
  res.status(200).json({ data });
};

export const errResponse = ({ res, err, status_code }: errType) => {
  res.status(status_code || 500).json({ message: handleErrMsg(err) });
};

export const handleExpressApi = (res: Response, next: () => void) => {
  try {
    next();
  } catch (err) {
    return errResponse({ err, res });
  }
};
