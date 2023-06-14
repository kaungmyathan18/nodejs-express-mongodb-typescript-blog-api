import httpStatus from 'http-status';
import HttpException from './http.exception';

export class ResourceConflictException extends HttpException {
  constructor(message: string) {
    super(httpStatus.CONFLICT, message);
  }
}
