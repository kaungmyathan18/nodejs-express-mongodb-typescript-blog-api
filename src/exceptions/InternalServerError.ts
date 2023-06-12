import httpStatus from 'http-status';
import HttpException from './http.exception';

export class InternalServerError extends HttpException {
  constructor() {
    super(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong');
  }
}
