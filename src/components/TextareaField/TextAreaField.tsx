import { Component } from '../../class';
import { clsx, isDefined } from '../../utils';
import { TextArea } from '../TextArea';
import styles from './styles.module.scss';

type TextAreaProps = ComponentProps<typeof TextArea>;

type Props = { label: string; checkValidity?: (validity: ValidityState, fieldName?: string) => void } & TextAreaProps;

type State = {
  hasFocus: boolean;
};

export class TextAreaField extends Component<Props, State> {
  state: State = { hasFocus: false };
  ref: HTMLTextAreaElement | null = null;

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

  onInputChange = (value: string) => {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  onInputFocus = () => {
    this.setState({ hasFocus: true });
  };

  onInputBlur = () => {
    this.setState({ hasFocus: false });
  };

  render() {
    const { value, name, label, onKeyPress, ...rest } = this.props;
    const { hasFocus } = this.state;
    const hasValue = isDefined(value) && value.length > 0;
    const isActive = hasValue || hasFocus;

    return (
      <label className={clsx(styles.textarea_field, isActive && styles.focus)}>
        <TextArea
          ref={(el) => {
            this.ref = el;
          }}
          {...rest}
          value={value}
          name={name}
          onChange={this.onInputChange}
          onFocus={this.onInputFocus}
          onBlur={this.onInputBlur}
          onKeyPress={onKeyPress}
        />
        <span className={styles.label}>{label}</span>
      </label>
    );
  }
}
