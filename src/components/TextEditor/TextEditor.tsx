import { Component } from '../../class';
import { clsx } from '../../utils';
import { Input } from '../Input';
import styles from './styles.module.scss';

type State = {
  value: string;
  hasFocus: boolean;
};

export class TextEditor extends Component<{}, State> {
  state: State = { hasFocus: false, value: '' };

  constructor(props: {}) {
    super(props);
  }

  onInputChange = (value: string) => {
    this.setState({ value });
  };

  onInputFocus = () => {
    this.setState({ hasFocus: true });
  };

  onInputBlur = () => {
    this.setState({ hasFocus: false });
  };

  render() {
    const { hasFocus } = this.state;
    return (
      <label className={clsx(styles.text_editor, hasFocus && styles.focus)}>
        <Input
          value={this.state.value}
          type="text"
          onChange={this.onInputChange}
          name="message"
          onFocus={this.onInputFocus}
          onBlur={this.onInputBlur}
        />
        <span className={styles.label}>Сообщение</span>
      </label>
    );
  }
}
