import i18n from '@config/i18n.config';
import httpStatus from 'http-status';
import HttpException from './http.exception';

export class InvalidIdExeption extends HttpException {
  constructor() {
    super(httpStatus.BAD_REQUEST, i18n.__('Invalid id value.'));
  }
}
