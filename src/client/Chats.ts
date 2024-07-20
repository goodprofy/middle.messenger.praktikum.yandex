import { HTTPClient } from '../class';
import type {
  Chat,
  ChatsParams,
  CreateChatParams,
  CreateChatPayload,
  DeleteChatParams,
  GetChatTokenParams,
  GetChatTokenPayload
} from './types';

export class ChatsClient extends HTTPClient {
  getChats(data: ChatsParams) {
    return this.get<Chat[]>('chats', { data });
  }
  createChat(data: CreateChatParams) {
    return this.post<CreateChatPayload>('chats', { data });
  }
  deleteChat(data: DeleteChatParams) {
    return this.delete('chats', { data });
  }
  getChatToken(data: GetChatTokenParams) {
    return this.post<GetChatTokenPayload[]>(`chats/token/${data.id}`, { data });
  }
}
