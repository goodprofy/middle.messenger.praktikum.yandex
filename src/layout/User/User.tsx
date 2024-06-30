import { Button } from '../../components';
import styles from './styles.module.scss';

export const User: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className={styles.layout_user}>
      <aside className={styles.sidebar}>
        <Button
          title="Назад"
          onClick={() => {
            window.location.href = '/';
          }}
        />
      </aside>
      {children}
    </main>
  );
};
