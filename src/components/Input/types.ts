export type InputType = 'number' | 'text' | 'email' | 'password' | 'tel' | 'search';

export type PropsBaseInput<Type, Expand> = {
  type: Type;
  onFocus?: () => void;
  onBlur?: () => void;
  ref?: (el: HTMLInputElement) => void;
} & Partial<Pick<HTMLInputElement, 'name' | 'readOnly' | 'required' | 'maxLength' | 'minLength' | 'pattern'>> &
  Expand;

export type PropsNumberInput = {
  max?: number;
  min?: number;
  onChange?: (value: number) => void;
  value?: number;
};

export type PropsTextInput = {
  max?: never;
  min?: never;
  onChange?: (value: string) => void;
  value?: string;
};
