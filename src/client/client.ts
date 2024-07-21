import { HTTPClient } from '../class';
import { API_BASE_URL } from '../constants';
import { applyMixins } from '../utils';
import { AuthClient } from './Auth';
import { ChatsClient } from './Chats';
import { UsersClient } from './Users';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class AppClient extends HTTPClient {}
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface AppClient extends AuthClient, ChatsClient, UsersClient {}

applyMixins(AppClient, [AuthClient, ChatsClient, UsersClient]);

export const client = new AppClient(API_BASE_URL);
