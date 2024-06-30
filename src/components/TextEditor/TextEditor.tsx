import { Component } from '../../class';
import { clsx } from '../../utils';
import { Input } from '../Input';
import styles from './styles.module.scss';

type Props = {
  value: string;
  onChange: (value: Props['value']) => void;
};

type State = {
  hasFocus: boolean;
};

export class TextEditor extends Component<Props, State> {
  state: State = { hasFocus: false };

  constructor(props: Props) {
    super(props);
  }

  onInputChange = (value: string) => {
    this.props.onChange(value);
  };

  onInputFocus = () => {
    this.setState({ hasFocus: true });
  };

  onInputBlur = () => {
    this.setState({ hasFocus: false });
  };

  render() {
    const { value } = this.props;
    const { hasFocus } = this.state;
    const hasValue = value.length > 0;
    const isActive = hasValue || hasFocus;

    return (
      <label className={clsx(styles.text_editor, isActive && styles.focus)}>
        <Input
          value={value}
          type="text"
          name="message"
          required
          onChange={this.onInputChange}
          onFocus={this.onInputFocus}
          onBlur={this.onInputBlur}
        />
        <span className={styles.label}>Сообщение</span>
      </label>
    );
  }
}
