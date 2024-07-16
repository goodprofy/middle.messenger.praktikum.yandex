import { isDefined } from '../../../../utils';
import styles from './styles.module.scss';

type Props = {
  value?: string;
  name: string | JSX.Element;
};

export const ProfileRow: FC<Props> = ({ name, value }) => {
  return (
    <div className={styles.profile_row}>
      {isDefined(name) ? <span>{name}</span> : null}
      {isDefined(value) ? <span className={styles.value}>{value}</span> : null}
    </div>
  );
};
