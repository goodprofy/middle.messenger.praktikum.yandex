import { Component, Router } from './class';

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
    document.addEventListener('routechange', (event: Event) => {
      const newPage = (event as CustomEvent<HTMLElement>).detail;

      const rootNode = document.getElementById('root');
      if (rootNode) {
        this.replacePage(rootNode, newPage);
        this.setState({ currentRoute: newPage });
      }
    });

    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  //костыль, решает проблему потери parentNode
  replacePage(rootElement: Node, newComponent: HTMLElement) {
    while (rootElement.firstChild) {
      rootElement.removeChild(rootElement.firstChild);
    }

    rootElement.appendChild(newComponent);
  }

  render() {
    //нужно возвращать currentRoute, но есть проблемы с шаблонизатором.
    return null;
  }
}
