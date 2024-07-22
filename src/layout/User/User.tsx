import { Button } from '../../components';
import { useRouter } from '../../hooks';
import styles from './styles.module.scss';

export const User: FC<PropsWithChildren> = ({ children }) => {
  const { navigate } = useRouter();

  const onBackClick = () => {
    navigate('/messenger');
  };

  return (
    <main className={styles.layout_user}>
      <aside className={styles.sidebar}>
        <Button title="Back" onClick={onBackClick} />
      </aside>
      {children}
    </main>
  );
};
