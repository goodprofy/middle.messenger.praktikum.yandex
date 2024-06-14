import styles from './styles.module.scss';

export const Title: FC<PropsWithChildren> = ({ children }) => {
  return <h1 className={styles.title}>{children}</h1>;
};
