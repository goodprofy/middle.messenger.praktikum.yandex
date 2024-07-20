import { Component, Router } from './class';
import { NotFound } from './pages';
import { Public as LayoutPublic } from './layout';
import { isDefined } from './utils';

type Props = {
  router: Router;
};

type State = {
  currentRoute: HTMLElement | undefined;
};

export class Navigator extends Component<Props, State> {
  state: State = {
    currentRoute: undefined
  };

  constructor(props: Props) {
    super(props);

    //вместо медиатора
    document.addEventListener('routechange', (event) => {
      this.setState({ currentRoute: event.detail });
    });

    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  render() {
    const { currentRoute } = this.state;
    if (!isDefined(currentRoute)) {
      return (
        <LayoutPublic>
          <NotFound />
        </LayoutPublic>
      );
    }

    return currentRoute;
  }
}
