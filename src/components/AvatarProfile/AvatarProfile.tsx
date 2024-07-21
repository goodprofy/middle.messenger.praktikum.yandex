import { Component } from '../../class';
import { client } from '../../client';
import { API_BASE_URL } from '../../constants';
import { useRouter } from '../../hooks';
import { isDefined } from '../../utils';
import { Link } from '../Link';
import styles from './styles.module.scss';

type State = {
  src: string | undefined;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export class AvatarProfile extends Component<{}, State> {
  constructor() {
    super({});
    client.getCurrentUser().then(({ response }) => {
      if (response.avatar.length > 0) {
        super.setState({ src: response.avatar });
      }
    });
  }

  onAvatarClick = () => {
    const { navigate } = useRouter();
    navigate('/settings/avatar');
  };

  render() {
    const { src } = this.state;
    if (isDefined(src)) {
      return (
        <div className={styles.avatar_profile} onClick={this.onAvatarClick}>
          <img src={API_BASE_URL + src} />
          <div className={styles.avatar_change}>
            <Link title="Change avatar" onClick={this.onAvatarClick} />
          </div>
        </div>
      );
    }
    return (
      <div className={styles.avatar_profile}>
        <div className={styles.avatar_change}>
          <Link title="Change avatar" onClick={this.onAvatarClick} />
        </div>
      </div>
    );
  }
}
