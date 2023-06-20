import i18n from '@config/i18n.config';
import { UnauthorizedException } from '@exceptions/Unauthorized.exception';
import { JwtService } from '@features/authentication/jwt.service';
import { IUser, UserModel } from '@features/users/models/user.model';
import { IJWTPayload } from '@interfaces/jwt.interface';
import { NextFunction, Request, Response } from 'express';
const userModel = UserModel;
export class AuthenticationMiddleware {
  static async loginRequired(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const authorization = request.headers.authorization;
      if (!authorization) {
        return next(new UnauthorizedException());
      }
      const token = authorization.split('Bearer ')[1];
      const payload: IJWTPayload = (await JwtService.verify(
        token,
      )) as unknown as IJWTPayload;
      if (!payload?.id) {
        return next(new UnauthorizedException());
      }
      const user: IUser = (await userModel
        .findById(payload.id)
        .select('-password')) as unknown as IUser;
      //@ts-ignore
      request.user = user;
      next();
    } catch (error) {
      console.log(error.code);
      if (error.name === 'TokenExpiredError') {
        return next(new UnauthorizedException(i18n.__('Jwt token expired')));
      }
      next(error);
    }
  }
}
