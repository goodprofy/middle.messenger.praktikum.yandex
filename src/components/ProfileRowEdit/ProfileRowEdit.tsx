import { Component } from '../../class';
import { isDefined } from '../../utils';
import { Input } from '../Input';
import { TextError } from '../TextError';
import styles from './styles.module.scss';

type InputProps = ComponentProps<typeof Input>;

type Props = {
  title: string;
  errors?: string[];
  checkValidity?: (validity: ValidityState, fieldName?: string) => void;
  onChange: (field: string, value: string | number) => void;
} & Omit<InputProps, 'onChange'>;

export class ProfileRowEdit extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  ref: HTMLInputElement | null = null;

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

  onInputChannge = (value: string | number) => {
    if (isDefined(this.props.onChange)) {
      this.props.onChange(this.props.name, value);
    }
  };

  render() {
    const { title, errors, type = 'text', ...inputRest } = this.props;
    return (
      <>
        <label class={styles.profile_row_edit}>
          <span>{title}</span>
          <Input
            {...inputRest}
            ref={(el) => {
              this.ref = el;
            }}
            type={type}
            onBlur={this.onInputBlur}
            onChange={this.onInputChannge}
          />
        </label>
        {isDefined(errors) && errors.length > 0 ? <TextError>{errors.join('. ')}</TextError> : null}
      </>
    );
  }
}
