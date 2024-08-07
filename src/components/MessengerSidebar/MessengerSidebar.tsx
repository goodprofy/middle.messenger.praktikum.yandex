import { Component } from '../../class';
import { type Chat, type ChatsParams, client } from '../../client';
import { useRouter } from '../../hooks';
import { Button } from '../Button';
import { Chats } from '../Chats';
import { Link } from '../Link';
import { Modal } from '../Modal';
import { Search } from '../Search';
import { CreateChatForm } from './components';
import styles from './styles.module.scss';

type State = {
  isLoading: boolean;
  chats: Chat[];
  shownCreateChatModal: boolean;
} & ChatsParams;

// eslint-disable-next-line @typescript-eslint/ban-types
export class MessengerSidebar extends Component<{}, State> {
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

  getChats = () => {
    const { limit, offset, title } = this.state;
    client
      .getChats({ limit, offset, title })
      .then((response) => {
        this.setState({ chats: response, isLoading: false });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

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
      <div class={styles.sidebar}>
        <div class={styles.sidebar_header}>
          <Link to="/settings" title="Profile" />
          <Search value={title ?? ''} onChange={this.onSearchChange} />
        </div>
        <div class={styles.sidebar_chats}>
          <Chats chats={chats} />
        </div>
        <div class={styles.sidebar_footer}>
          <Button title="Create chat" onClick={this.onCreateChatClick} />
        </div>
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
