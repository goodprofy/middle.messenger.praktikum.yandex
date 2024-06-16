import styles from './styles.module.scss';
import { InputType, PropsBaseInput, PropsNumberInput, PropsTextInput } from './types';

type Props<T extends InputType> = T extends 'number'
  ? PropsBaseInput<T, PropsNumberInput>
  : T extends 'text' | 'email' | 'password' | 'tel' | 'search'
    ? PropsBaseInput<T, PropsTextInput>
    : never;

export const Input = <T extends InputType>({
  max,
  min,
  name,
  onBlur,
  onChange,
  onFocus,
  readOnly,
  required,
  type,
  value
}: Props<T>) => {
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      const { value } = event.target;

      if (type === 'number') {
        onChange(Number(value));
      } else {
        onChange(String(value));
      }
    }
  };

  return (
    <input
      id={name}
      name={name}
      className={styles.input}
      max={max}
      min={min}
      onChange={onInputChange}
      readOnly={readOnly}
      required={required}
      type={type}
      value={value ?? ''}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
};
