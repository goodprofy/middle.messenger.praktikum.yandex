import { Component, Socket } from '../../class';
import { type ChatUser, GetChatUsersParams, type User, client } from '../../client';
import { useRouter, useStore } from '../../hooks';
import { logError } from '../../utils';
import { Header, MessageInput, Messages } from './components';
import styles from './styles.module.scss';

type State = {
  messages: string[];
  socket: Socket | undefined;
  chatId: number;
  users: ChatUser[];
} & Pick<GetChatUsersParams, 'limit' | 'name' | 'offset' | 'email'>;

// eslint-disable-next-line @typescript-eslint/ban-types
export class Chat extends Component<{}, State> {
  constructor() {
    super({});

    const { getParams } = useRouter();
    const { id: chatId } = getParams<{ id: number }>(window.location.pathname);
    this.state = {
      messages: [],
      socket: undefined,
      chatId: chatId,
      users: [],
      limit: 100,
      offset: 0
    };

    this.getChatToken();
    this.getChatUsers();
  }

  getChatToken = () => {
    const { chatId } = this.state;
    client
      .getChatToken({ id: chatId })
      .then(({ token }) => {
        const store = useStore();
        const { user } = store.getState<{ user: User }>();
        const socket = new Socket(`chats/${user.id}/${this.state.chatId}/${token}`);
        this.setState({ socket });
      })
      .catch((err) => {
        logError(err);
      });
  };

  getChatUsers = () => {
    const { chatId, limit, offset } = this.state;
    client
      .getChatUsers({ id: chatId, limit, offset })
      .then((response) => {
        this.setState({ users: response });
      })
      .catch((err) => {
        logError(err);
      });
  };

  onMessageSubmit = (message: string) => {
    this.state.socket?.send(message);
  };

  onUserConnected = () => {
    this.getChatUsers();
  };

  onDeleteUserClick = () => {
    this.getChatUsers();
  };

  onUserAddSuccess = () => {
    this.getChatUsers();
  };

  render() {
    const { socket, chatId, users } = this.state;
    return (
      <div class={styles.chat}>
        <div class={styles.area}>
          <Header users={users} onDeleteUserSuccess={this.onDeleteUserClick} chatId={chatId} />
          <div class={styles.messages}>
            {socket ? <Messages socket={socket} onUserConnected={this.onUserConnected} /> : 'Loading...'}
          </div>
          <MessageInput onSubmit={this.onMessageSubmit} onUserAddSuccess={this.onUserAddSuccess} chatId={chatId} />
        </div>
      </div>
    );
  }
}
