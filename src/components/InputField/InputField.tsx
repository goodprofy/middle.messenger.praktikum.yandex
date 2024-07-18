import { Component } from '../../class';
import { clsx } from '../../utils';
import { Input } from '../Input';
import { TextError } from '../TextError';
import styles from './styles.module.scss';

type InputProps = ComponentProps<typeof Input>;

type Props = {
  label: string;
  errors?: string[];
  checkValidity?: (validity: ValidityState, fieldName?: string) => void;
} & InputProps;

export class InputField extends Component<Props> {
  ref: HTMLInputElement | null = null;
  constructor(props: Props) {
    super(props);
  }

  onBlur = () => {
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

  render() {
    const { label, errors = [], name, ...inputRest } = this.props;
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
            onBlur={this.onBlur}
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
