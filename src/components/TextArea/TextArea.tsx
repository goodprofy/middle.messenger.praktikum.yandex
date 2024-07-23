import styles from './styles.module.scss';

type Props = {
  name: string;
  onBlur?: () => void;
  onChange?: (value: Props['value']) => void;
  onFocus?: () => void;
  onKeyPress?: (event: KeyboardEvent) => void;
  ref?: (el: HTMLTextAreaElement) => void;
  required?: boolean;
  value: string;
};

export const TextArea: FC<Props> = ({ name, onBlur, onChange, onFocus, onKeyPress, ref, required, value }) => {
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
      class={styles.textarea}
      onBlur={onBlur}
      onInput={onTextAreaChange}
      onFocus={onFocus}
      required={required}
      onKeyDown={onKeyPress}
    >
      {value}
    </textarea>
  );
};
