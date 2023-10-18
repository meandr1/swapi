import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from 'src/common/constants';

@Injectable()
export class BCryptService {
  async checkUser(pass: string, passHash: string) {
    const match = await bcrypt.compare(pass, passHash);
    return match;
  }
  async hashPassword(pass: string) {
    const hash = await bcrypt.hash(pass, SALT_ROUNDS);
    return hash;
  }
}
