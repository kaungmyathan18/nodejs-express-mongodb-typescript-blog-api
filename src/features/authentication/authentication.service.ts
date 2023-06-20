import i18n from '@config/i18n.config';
import { BadRequestException } from '@exceptions/badRequest.exception';
import { UserModel } from '@features/users/models/user.model';
import bcrypt from 'bcryptjs';
import { AuthenticateDTO } from './dto/authenticate.dto';

export class AuthenticationService {
  private userRepository = UserModel;
  constructor() {
    this.bindMethods();
  }
  private bindMethods() {
    this.authenticate = this.authenticate.bind(this);
  }
  public async authenticate({ username, password }: AuthenticateDTO) {
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new BadRequestException(i18n.__('Invalid username / password.'));
    }
    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password as string,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException(i18n.__('Invalid username / password.'));
    }
    user.password = undefined;
    return user;
  }
}
