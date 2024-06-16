import styles from './styles.module.scss';

export const Public: FC<PropsWithChildren> = ({ children }) => {
  return <main className={styles.layout_public}>{children}</main>;
};
