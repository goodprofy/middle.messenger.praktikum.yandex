import styles from './styles.module.scss';

type Props = {
  value?: string;
  name: string | JSX.Element;
};

export const ProfileRow: FC<Props> = ({ name, value }) => {
  return (
    <div className={styles.profile_row}>
      {name ? <span>{name}</span> : null}
      {value ? <span className={styles.value}>{value}</span> : null}
    </div>
  );
};
