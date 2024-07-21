import styles from './styles.module.scss';
import { InputType } from './types';

export type Props = {
  max?: number;
  min?: number;
  name: string;
  onBlur?: () => void;
  onChange: (value: string | number) => void;
  onFocus?: () => void;
  readOnly?: boolean;
  required?: boolean;
  type: InputType;
  value?: string | number;
  ref?: (el: HTMLInputElement) => void;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
};

/* type Props<T extends InputType> = T extends 'number'
  ? PropsBaseInput<T, PropsNumberInput>
  : PropsBaseInput<T, PropsTextInput>; */

export const Input = ({
  max,
  min,
  name,
  onBlur,
  onChange,
  onFocus,
  readOnly,
  required,
  type,
  value,
  ref,
  maxLength,
  minLength,
  pattern
}: Props) => {
  const onInputChange = (event: Event) => {
    const { value, valueAsNumber } = event.target as HTMLInputElement;

    if (type === 'number') {
      onChange(valueAsNumber);
    } else {
      onChange(value);
    }
  };

  return (
    <input
      ref={ref}
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
      maxLength={maxLength}
      minLength={minLength}
      pattern={pattern}
    />
  );
};
