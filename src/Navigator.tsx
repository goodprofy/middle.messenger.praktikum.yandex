import { Component, Router } from './class';
import { User, client } from './client';
import { useStore } from './hooks';
import { isDefined, logError } from './utils';

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

    const rootNode = document.getElementById('root');
    //вместо медиатора
    document.addEventListener('routechange', (event: Event) => {
      this.checkAuth(() => {
        const newPage = (event as CustomEvent<HTMLElement>).detail;

        if (rootNode) {
          this.replacePage(rootNode, newPage);
          this.setState({ currentRoute: newPage });
        }
      });
    });

    this.checkAuth(() => {
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
  }

  //TODO Remove
  private checkAuth = (callback: () => void) => {
    const store = useStore();
    const { user } = store.getState<{ user: User }>();
    if (!isDefined(user)) {
      client
        .getCurrentUser()
        .then((data) => {
          store.set('user', data);
        })
        .catch((err) => {
          logError(err);
        })
        .finally(() => {
          callback();
        });
    } else {
      callback();
    }
  };

  //костыль, решает проблему потери parentNode
  replacePage(rootElement: Node, newComponent: HTMLElement) {
    while (rootElement.firstChild) {
      rootElement.removeChild(rootElement.firstChild);
    }

    rootElement.appendChild(newComponent);
  }

  render() {
    //нужно возвращать currentRoute, но есть проблемы с шаблонизатором.
    return <span />;
  }
}
