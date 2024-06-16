import styles from './styles.module.scss';

export const Sidebar: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.sidebar}>{children}</div>;
};
