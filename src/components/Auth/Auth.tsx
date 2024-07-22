import { Component } from '../../class';
import { client } from '../../client';
import { useRouter, useStore } from '../../hooks';
import { Loading } from '../Loading';

type Props = PropsWithChildren;

type State = {
  isAuth: boolean;
  isLoading: boolean;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export class Auth extends Component<Props, State> {
  state: State = {
    isAuth: false,
    isLoading: true
  };
  constructor(props: Props) {
    super(props);

    client
      .getCurrentUser()
      .then((user) => {
        const store = useStore();
        store.set('user', user);
        this.setState({ isAuth: true });
      })

      .catch(() => {
        const { navigate } = useRouter();
        navigate('/sign-in');
      })

      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { children } = this.props;
    const { isLoading } = this.state;

    if (isLoading) {
      return (
        <div>
          <Loading />
        </div>
      );
    }

    return <div>{children}</div>; //TODO Remove <div>
  }
}
