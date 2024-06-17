import { useUUID } from '../../hooks';
import { Input } from '../Input';
import styles from './styles.module.scss';

export const TextEditor: FC = () => {
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
    <label id={id} className={styles.text_editor}>
      <Input value="" type="text" onChange={onInputChange} onFocus={onInputFocus} onBlur={onInputBlur} name="message" />
      <span className={styles.label}>Поиск</span>
    </label>
  );
};
