import styles from './styles.module.scss';

export const Header: FC = () => {
  return (
    <head className={styles.header}>
      <div className={styles.user}>
        <div className={styles.avatar} />
        <div className={styles.name}>Вадим</div>
      </div>
    </head>
  );
};
