import { Component } from '../../class';
import { client } from '../../client';
import { useRouter } from '../../hooks';
import { logError } from '../../utils';
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
      .then(({ response }) => {
        console.log(response);
        super.setState({ isAuth: true });
      })

      .catch((err) => {
        logError(err);
        const { navigate } = useRouter();
        navigate('/sign-in');
      })

      .finally(() => {
        super.setState({ isLoading: false });
      });
  }

  render(): JSX.Element | null {
    const { children } = this.props;
    const { isLoading } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return <>{children}</>;
  }
}
