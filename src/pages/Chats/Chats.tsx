import { Contacts, Link, Search, Sidebar } from '../../components';
import styles from './styles.module.scss';

export const Chats: FC = () => {
  return (
    <div className={styles.chats}>
      <Sidebar>
        <Link to="/settings" title="Profile" />
        <Search />
        <Contacts />
      </Sidebar>
      <div className={styles.empty}>Выберите чат чтобы отправить сообщение</div>
    </div>
  );
};
