import { Component } from '../../class';
import { clsx } from '../../utils';
import { Input } from '../Input';
import { TextError } from '../TextError';
import styles from './styles.module.scss';

type InputProps = ComponentProps<typeof Input>;

type Props = {
  label: string;
  errors?: string[];
  checkValidity?: (validity: ValidityState, field?: string) => void;
  onChange: (field: string, value: Parameters<Required<InputProps>['onChange']>[0]) => void;
  type: Exclude<InputProps['type'], 'number'>;
  value: string;
} & Omit<InputProps, 'onChange' | 'type' | 'value'>;

export class InputField extends Component<Props> {
  ref: HTMLInputElement | null = null;
  constructor(props: Props) {
    super(props);
  }

  onInputBlur = () => {
    if (this.props?.onBlur) {
      this.props.onBlur();
    }

    const input = this.ref;
    if (!input) {
      return;
    }

    if (this.props.checkValidity) {
      this.props.checkValidity(input.validity, this.props.name);
    }
  };
  onInputChange = (value: string | number) => {
    this.props.onChange(this.props.name, value);
  };

  render() {
    const { label, errors = [], name, type, value, ...inputRest } = this.props;
    const hasErrors = errors.length > 0;

    return (
      <div className={styles.input_field}>
        <div className={styles.fieldset}>
          <label for={name}>{label}</label>
          <Input
            {...inputRest}
            ref={(el) => {
              this.ref = el;
            }}
            type={type}
            value={value}
            onBlur={this.onInputBlur}
            onChange={this.onInputChange}
            name={name}
          />
        </div>
        <div className={clsx(styles.errors, hasErrors && styles.errors_show)}>
          <TextError>{errors.join('. ')}</TextError>
        </div>
      </div>
    );
  }
}
