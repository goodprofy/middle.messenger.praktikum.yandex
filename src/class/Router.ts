import { Route } from './Route';
import { isDefined } from '../utils';

export class Router {
  static __instance: Router;
  private routes: Route[] = [];
  public currentRoute: (typeof this.routes)[number] | undefined;
  private history = window.history;

  constructor() {
    if (isDefined(Router.__instance)) {
      return Router.__instance;
    }
    Router.__instance = this;
  }

  public use = (pathname: Route['pathname'], component: Route['component']) => {
    const route = new Route(pathname, component);
    this.routes.push(route);
    return this;
  };

  public start = () => {
    window.addEventListener('popstate', () => {
      this.onLocationChange();
    });
    this.onLocationChange();
  };

  private onLocationChange = () => {
    const { pathname } = window.location;
    const route = this.getRoute(pathname);

    if (route) {
      this.currentRoute = route;
      //вместо медиатора
      document.dispatchEvent(new CustomEvent('routechange', { detail: route.component() }));
    }
  };

  private getRoute(pathname: Route['pathname']) {
    return this.routes.find((route) => route.match(pathname));
  }

  public navigate = (path: string) => {
    this.history.pushState({}, '', path);
    this.onLocationChange();
  };

  public back = () => {
    this.history.back();
  };

  public forward = () => {
    this.history.forward();
  };
}
