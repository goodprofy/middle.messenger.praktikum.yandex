import { Link, Search, Sidebar, Contacts } from '../../components';
import { Header, MessageInput, Messages } from './components';
import styles from './styles.module.scss';

export const Chat: FC = () => {
  return (
    <div className={styles.chat}>
      <Sidebar>
        <Link to="/profile" title="Profile" />
        <Search />
        <Contacts />
      </Sidebar>
      <div className={styles.area}>
        <Header />
        <div className={styles.messages}>
          <Messages />
        </div>
        <MessageInput />
      </div>
    </div>
  );
};
