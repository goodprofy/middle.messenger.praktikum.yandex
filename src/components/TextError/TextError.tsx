import styles from './styles.module.scss';

export const TextError: FC<PropsWithChildren> = ({ children }) => {
  return <span className={styles.text_error}>{children}</span>;
};
