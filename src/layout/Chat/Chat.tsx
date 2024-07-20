import { useUser } from '../../hooks';
import styles from './styles.module.scss';

export const Chat: FC<PropsWithChildren> = ({ children }) => {
  useUser();
  return <main className={styles.layout_chat}>{children}</main>;
};
