import styles from './styles.module.scss';

type Props = { src?: string; userName: string };

export const Avatar: FC<Props> = ({ src, userName }) => {
  if (src) {
    <img className={styles.avatar} src={src} alt={userName} title={userName} />;
  }
  return <div className={styles.avatar} />;
};
