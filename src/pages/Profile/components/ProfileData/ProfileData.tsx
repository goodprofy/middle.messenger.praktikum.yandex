import { Component } from '../../../../class';
import { type User, client } from '../../../../client';
import { AvatarProfile, Flex, Loading, Title } from '../../../../components';
import { isDefined } from '../../../../utils';
import { ProfileRow } from '../ProfileRow';

type State = {
  user: User | undefined;
  isLoading: boolean;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export class ProfileData extends Component<{}, State> {
  state: State = {
    user: undefined,
    isLoading: true
  };
  constructor() {
    super({});

    client
      .getCurrentUser()
      .then(({ response }) => {
        this.setState({ user: response });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { user, isLoading } = this.state;

    if (!isLoading && isDefined(user)) {
      const { avatar, display_name, email, first_name, login, phone, second_name } = user;

      return (
        <div>
          <Flex gap={1} isCenter isColumn>
            <AvatarProfile src={avatar} />

            <Title as="h2" isCenter>
              {display_name}
            </Title>
          </Flex>

          <Flex isColumn>
            <ProfileRow name="Email" value={email} />
            <ProfileRow name="Login" value={login} />
            <ProfileRow name="First name" value={first_name} />
            <ProfileRow name="Last name" value={second_name} />
            <ProfileRow name="Display name" value={display_name} />
            <ProfileRow name="Phone" value={phone} />
          </Flex>
        </div>
      );
    }

    return <Loading />;
  }
}
