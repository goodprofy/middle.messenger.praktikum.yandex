import { Component, Socket } from '../../class';
import { type ChatUser, type User, client } from '../../client';
import { useRouter, useStore } from '../../hooks';
import { isDefined, logError } from '../../utils';
import { Header, MessageInput, Messages } from './components';
import styles from './styles.module.scss';

type State = {
  messages: string[];
  socket: Socket | undefined;
  chatId: number | undefined;
  users: ChatUser[];
};

// eslint-disable-next-line @typescript-eslint/ban-types
export class Chat extends Component<{}, State> {
  state: State = {
    messages: [],
    socket: undefined,
    chatId: undefined,
    users: []
  };
  constructor() {
    super({});

    try {
      const store = useStore();
      const { getParams } = useRouter();
      const { id: chatId } = getParams<{ id: number }>(window.location.pathname);
      this.setState({ chatId });
      const onStoreChange = () => {
        const { user } = store.getState<{ user: User | undefined }>();
        if (isDefined(user)) {
          client.getChatToken({ id: chatId }).then(({ token }) => {
            const socket = new Socket(`chats/${user?.id}/${chatId}/${token}`);

            this.setState({ socket });
          });
        }
      };

      store.subscribe(onStoreChange);

      this.getChatUsers();
    } catch (error) {
      logError(error);
    }
  }

  getChatUsers = () => {
    const { chatId } = this.state;
    if (isDefined(chatId)) {
      client.getChatUsers({ id: chatId, limit: 10, offset: 0 }).then((response) => {
        this.setState({ users: response });
      });
    }
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

  render() {
    const { socket, chatId, users } = this.state;
    return (
      <div className={styles.chat}>
        <div className={styles.area}>
          <Header users={users} onDeleteUserSuccess={this.onDeleteUserClick} chatId={chatId} />
          <div className={styles.messages}>
            {socket ? <Messages socket={socket} onUserConnected={this.onUserConnected} /> : ''}
          </div>
          <MessageInput onSubmit={this.onMessageSubmit} chatId={chatId} />
        </div>
      </div>
    );
  }
}
