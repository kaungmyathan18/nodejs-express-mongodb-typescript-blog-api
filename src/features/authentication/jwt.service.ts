import { EnvUtils } from '@utils/EnvUtils';
import jsonwebtoken from 'jsonwebtoken';

const secret = EnvUtils.get('JWT_SECRET');
const expiresIn = EnvUtils.get('JWT_EXPIRES_IN');

export class JwtService {
  static async signToken(id: string): Promise<string> {
    return jsonwebtoken.sign({ id }, secret, { expiresIn });
  }

  static async verify(token: string) {
    const payload = jsonwebtoken.verify(token, secret);
    return payload;
  }
}
