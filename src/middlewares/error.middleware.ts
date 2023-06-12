import HttpException from '@exceptions/http.exception';
import { NextFunction, Request, Response } from 'express';

function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  console.log(error);
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response.status(status).send({
    message,
    status,
  });
}
export default errorMiddleware;