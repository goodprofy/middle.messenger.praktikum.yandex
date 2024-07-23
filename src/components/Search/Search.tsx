import { Component } from '../../class';
import { Input } from '../Input';
import styles from './styles.module.scss';

type Props = {
  onChange: (value: string) => void;
  value: string;
};

type State = {
  isFocus: boolean;
};

export class Search extends Component<Props, State> {
  state: State = {
    isFocus: false
  };
  constructor(props: Props) {
    super(props);
  }
  onInputChange = (value: string | number) => {
    this.props.onChange(String(value));
  };
  onInputFocus = () => {
    this.setState({ isFocus: true });
  };
  onInputBlur = () => {
    this.setState({ isFocus: false });
  };

  render(): JSX.Element | null {
    const { value } = this.props;
    const { isFocus } = this.state;
    return (
      <label className={styles.search}>
        <Input
          name="search"
          value={value}
          type="search"
          onChange={this.onInputChange}
          onFocus={this.onInputFocus}
          onBlur={this.onInputBlur}
        />
        {!isFocus ? <span className={styles.label}>Search</span> : ''}
      </label>
    );
  }
}
