import { Request } from 'express';
import User from '@users/entity/user.entity';

export default interface RequestWithUser extends Request {
  user: User;
}
