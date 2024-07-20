import { HTTPClient } from '../class';
import { API_BASE_URL } from '../constants';
import { applyMixins } from '../utils';
import { AuthClient } from './Auth';
import { ChatsClient } from './Chats';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class AppClient extends HTTPClient {}
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface AppClient extends AuthClient, ChatsClient {}

applyMixins(AppClient, [AuthClient, ChatsClient]);

export const client = new AppClient(API_BASE_URL);
