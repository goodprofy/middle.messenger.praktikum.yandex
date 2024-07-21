import { MessengerSidebar } from '../../components';
import { Header, MessageInput, Messages } from './components';
import styles from './styles.module.scss';

export const Chat: FC = () => {
  return (
    <div className={styles.chat}>
      <MessengerSidebar />
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
