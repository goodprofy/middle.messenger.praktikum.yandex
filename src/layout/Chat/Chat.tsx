import { MessengerSidebar } from '../../components';
import styles from './styles.module.scss';

export const Chat: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className={styles.layout_chat}>
      <MessengerSidebar />
      {children}
    </main>
  );
};
