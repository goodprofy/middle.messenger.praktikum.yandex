import { HTTPClient } from '../class';
import type {
  AddUsersToChatsParams,
  Chat,
  ChatsParams,
  CreateChatParams,
  CreateChatPayload,
  DeleteChatParams,
  DeleteUsersFromChatParams,
  GetChatTokenParams,
  GetChatTokenPayload,
  GetChatUsersParams,
  GetChatUsersPayload
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
    return this.post<GetChatTokenPayload>(`chats/token/${data.id}`, { data });
  }
  addUsersToChats(data: AddUsersToChatsParams) {
    return this.put(`chats/users`, { data });
  }
  deleteUsersFromChat(data: DeleteUsersFromChatParams) {
    return this.delete(`chats/users`, { data });
  }
  getChatUsers(data: GetChatUsersParams) {
    return this.get<GetChatUsersPayload>(`chats/${data.id}/users`, { data });
  }
}
