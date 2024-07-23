import { Component } from '../../class';
import { client } from '../../client';
import { API_STATIC_URL } from '../../constants';
import { useRouter } from '../../hooks';
import { isDefined, logError } from '../../utils';
import { Link } from '../Link';
import styles from './styles.module.scss';

type State = {
  src: string | undefined;
  alt: string | undefined;
  isLoading: boolean;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export class AvatarProfile extends Component<{}, State> {
  state: State = {
    src: undefined,
    alt: undefined,
    isLoading: true
  };

  constructor() {
    super({});

    client
      .getCurrentUser()
      .then(({ avatar, login }) => {
        if (avatar?.length > 0) {
          this.setState({
            alt: login,
            src: `${API_STATIC_URL}${avatar}`
          });
        }
      })
      .catch((err) => {
        logError(err);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  onAvatarClick = () => {
    const { navigate } = useRouter();
    navigate('/settings/avatar');
  };

  render() {
    const { alt, src } = this.state;

    return (
      <div class={styles.avatar_profile}>
        {isDefined(src) && isDefined(alt) ? <img src={src} alt={alt} /> : ''}

        <div class={styles.avatar_change}>
          <Link title="Change avatar" onClick={this.onAvatarClick} />
        </div>
      </div>
    );
  }
}
