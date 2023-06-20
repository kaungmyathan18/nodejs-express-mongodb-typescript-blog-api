import i18n from '@config/i18n.config';
import httpStatus from 'http-status';
import HttpException from './http.exception';

export class UnauthorizedException extends HttpException {
  constructor(message?: string) {
    super(httpStatus.UNAUTHORIZED, message || i18n.__('Unauthorized'));
  }
}
