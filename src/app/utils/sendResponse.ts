/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  const responsePayload: any = {
    success: data.success,
    message: data.message,
    statusCode: data.statusCode,
  };

  if (data.data !== null && data.data !== undefined) {
    responsePayload.data = data.data;
  }

  res.status(data?.statusCode).json(responsePayload);
};

export default sendResponse;
