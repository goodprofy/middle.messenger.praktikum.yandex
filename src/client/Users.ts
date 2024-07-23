import { HTTPClient } from '../class';
import type {
  GetUserByLoginParams,
  UpdateUserAvatarParams,
  UpdateUserParams,
  UpdateUserPasswordParams,
  User
} from './types';

export class UsersClient extends HTTPClient {
  updateUser(data: UpdateUserParams) {
    return this.put<User>('user/profile', { data });
  }
  updateUserAvatar(data: UpdateUserAvatarParams) {
    return this.put<User>('user/profile/avatar', { data, isMultipart: true });
  }
  updateUserPassword(data: UpdateUserPasswordParams) {
    return this.put<User>('user/password', { data });
  }
  getUserByLogin(data: GetUserByLoginParams) {
    return this.post<User>('user/search', { data });
  }
}
