import { Request } from 'express';
import User from '@model/user.entity';

export default interface RequestWithUser extends Request {
  user: User;
}
