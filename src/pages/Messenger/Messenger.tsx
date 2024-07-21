import { Component } from '../../class';
import { type Chat, type ChatsParams, client } from '../../client';
import { Button, Chats, Link, Modal, Search, Sidebar } from '../../components';
import { useRouter } from '../../hooks';
import { CreateChatForm } from './components';
import styles from './styles.module.scss';

type State = {
  isLoading: boolean;
  chats: Chat[];
  shownCreateChatModal: boolean;
} & ChatsParams;

// eslint-disable-next-line @typescript-eslint/ban-types
export class Messenger extends Component<{}, State> {
  state: State = {
    isLoading: true,
    title: '',
    limit: 10,
    offset: 0,
    chats: [],
    shownCreateChatModal: false
  };
  constructor() {
    super({});
    this.getChats();
  }

  getChats() {
    client
      .getChats({ limit: 10, offset: 0, title: this.state.title })
      .then(({ response }) => {
        this.setState({ chats: response, isLoading: false });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  onSearchChange = (value: string) => {
    this.setState({ title: value });
    this.getChats();
  };

  onCreateChatClick = () => {
    this.setState({ shownCreateChatModal: true });
  };

  onModalCreateChatBackdropClick = () => {
    this.setState({ shownCreateChatModal: false });
  };

  onCreateChatFormSuccess = (chatId: Chat['id']) => {
    const { navigate } = useRouter();
    navigate(`/messenger/${chatId}`);
  };

  render() {
    const { title, chats, shownCreateChatModal } = this.state;
    return (
      <div className={styles.chats}>
        <Sidebar>
          <Link to="/settings" title="Profile" />
          <Search value={title ?? ''} onChange={this.onSearchChange} />
          <Chats chats={chats} />
          <Button title="Create chat" onClick={this.onCreateChatClick} />
        </Sidebar>
        <div className={styles.empty}>Select a chat to send a message</div>
        {shownCreateChatModal ? (
          <Modal title="Create Chat" onBackdropClick={this.onModalCreateChatBackdropClick}>
            <CreateChatForm onSuccess={this.onCreateChatFormSuccess} />
          </Modal>
        ) : (
          ''
        )}
      </div>
    );
  }
}
