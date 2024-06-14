export type InputType = 'number' | 'text' | 'email' | 'password' | 'tel';

export type PropsBaseInput<Type, Expand> = {
  type: Type;
} & Partial<Pick<HTMLInputElement, 'id' | 'readOnly' | 'required'>> &
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
