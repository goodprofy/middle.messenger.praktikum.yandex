import { Input } from '..';
import styles from './styles.module.scss';

type Props = {
  name: string;
  title: string;
  value: string;
  /** @default text */
  type?: 'text' | 'password';
};

export const ProfileRowEdit: FC<Props> = ({ name, title, value, type = 'text' }) => {
  return (
    <div className={styles.profile_row_edit}>
      <span>{title}</span>
      <Input name={name} value={value} type={type} />
    </div>
  );
};
