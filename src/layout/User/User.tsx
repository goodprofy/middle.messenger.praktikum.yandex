import { Button } from '../../components';
import { noop } from '../../utils';
import styles from './styles.module.scss';

export const User: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className={styles.layout_user}>
      <aside className={styles.sidebar}>
        <Button name="back" title="Назад" onClick={noop} />
      </aside>
      {children}
    </main>
  );
};
