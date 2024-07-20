import { HTTPClient } from '../class';
import type { SignInData, SignUpData, SignUpPayload, User } from './types';

export class AuthClient extends HTTPClient {
  signUp(data: SignUpData) {
    return this.post<SignUpPayload>('auth/signup', { data });
  }
  signIn(data: SignInData) {
    return this.post('auth/signin', { data });
  }
  getCurrentUser() {
    return this.get<User>('auth/user', {});
  }
  logout() {
    return this.post('auth/logout', {});
  }
}
