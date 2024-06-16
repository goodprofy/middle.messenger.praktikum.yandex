import { Link, Search, Sidebar, Contacts } from '../../components';
import styles from './styles.module.scss';

export const Chats = () => {
  return (
    <div className={styles.chats}>
      <Sidebar>
        <Link to="/profile" title="Profile" />
        <Search />
        <Contacts />
      </Sidebar>
      <div className={styles.empty}>Выберите чат чтобы отправить сообщение</div>
    </div>
  );
};
