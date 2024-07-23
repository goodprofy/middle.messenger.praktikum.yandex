import styles from './styles.module.scss';

export const TextError: FC<PropsWithChildren> = ({ children }) => {
  return <span class={styles.text_error}>{children}</span>;
};
