import { Component } from '../../class';
import { User, client } from '../../client';
import { AvatarProfile, Flex, Loading } from '../../components';
import { ProfileForm } from './components';
import styles from './styles.module.scss';

type State = {
  user: User | undefined;
  isLoading: boolean;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export class ProfileEdit extends Component<{}, State> {
  state: State = {
    user: undefined,
    isLoading: true
  };

  constructor() {
    super({});

    client
      .getCurrentUser()
      .then((response) => {
        this.setState({ user: response });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { user, isLoading } = this.state;

    if (isLoading) {
      return <Loading />;
    } else if (user) {
      return (
        <div className={styles.profile_edit}>
          <Flex gap={1} isCenter isColumn>
            <AvatarProfile src={user.avatar} />
          </Flex>
          <ProfileForm user={user} />
        </div>
      );
    } else {
      return <div>No user data available</div>;
    }
  }
}
