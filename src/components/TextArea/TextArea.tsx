import styles from './styles.module.scss';

type Props = {
  name: string;
  onBlur?: () => void;
  onChange?: (value: Props['value']) => void;
  onFocus?: () => void;
  ref?: (el: HTMLTextAreaElement) => void;
  required?: boolean;
  value: string;
};

export const TextArea: FC<Props> = ({ name, onBlur, onChange, onFocus, ref, required, value }) => {
  const onTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    if (onChange) {
      onChange(String(value));
    }
  };

  return (
    <textarea
      ref={ref}
      name={name}
      className={styles.textarea}
      onBlur={onBlur}
      onChange={onTextAreaChange}
      onFocus={onFocus}
      required={required}
    >
      {value}
    </textarea>
  );
};