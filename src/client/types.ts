export type SignUpData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type SignUpPayload = {
  id: number;
};

export type SignInData = {
  login: string;
  password: string;
};

export type User = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
};

type Message = {
  user: Pick<User, 'first_name' | 'second_name' | 'avatar' | 'email' | 'login' | 'phone'>;
  time: `${string}.${number}Z`;
  content: string;
};

export type Chat = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: User['id'];
  last_message: Message;
};

export type ChatsParams = { offset: number; limit: number; title?: string };

export type CreateChatParams = Pick<Chat, 'title'>;
export type CreateChatPayload = Pick<Chat, 'id'>;

export type DeleteChatParams = {
  chatId: Chat['id'];
};

export type GetChatTokenParams = Pick<Chat, 'id'>;
export type ChatToken = {
  token: string;
};
export type GetChatTokenPayload = ChatToken;

export type UpdateUserParams = Pick<User, 'first_name' | 'second_name' | 'display_name' | 'login' | 'email' | 'phone'>;
export type UpdateUserAvatarParams = { avatar: File };
export type UpdateUserPasswordParams = {
  oldPassword: string;
  newPassword: string;
};
export type GetUserByLoginParams = Pick<User, 'login'>;
