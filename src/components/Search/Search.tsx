import { useUUID } from '../../hooks';
import { Input } from '../Input';
import styles from './styles.module.scss';

export const Search: FC = () => {
  const id = useUUID();
  const onInputChange = () => {};
  const onInputFocus = () => {
    const labelNode = document.getElementById(id);
    labelNode?.classList.add('focus');
  };
  const onInputBlur = () => {
    const labelNode = document.getElementById(id);
    labelNode?.classList.remove('focus');
  };

  return (
    <label id={id} className={styles.search}>
      <Input name="search" value="" type="text" onChange={onInputChange} onFocus={onInputFocus} onBlur={onInputBlur} />
      <span className={styles.label}>Поиск</span>
    </label>
  );
};
