import httpStatus from 'http-status';
import HttpException from './http.exception';

export class InvalidIdExeption extends HttpException {
  constructor() {
    super(httpStatus.BAD_REQUEST, 'Invalid id value.');
  }
}
