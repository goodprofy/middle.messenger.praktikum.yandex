import { isDefined } from '../utils';

export class Route {
  constructor(
    public pathname: string,
    public component: () => JSX.Element
  ) {}

  public match(pathname: typeof this.pathname) {
    const matched = this.matchUrl(pathname, this.pathname);
    return isDefined(matched);
  }

  public getUrlParams(pathname: typeof this.pathname) {
    return this.matchUrl(pathname, this.pathname);
  }

  private matchUrl(url: string, pattern: string) {
    const patternParts = pattern.split('/').filter((part) => part !== '');
    const urlParts = url.split('/').filter((part) => part !== '');

    if (patternParts.length !== urlParts.length) {
      return null;
    }

    const params: Record<string, string> = {};
    for (let i = 0; i < patternParts.length; i++) {
      const patternPart = patternParts[i];
      if (isDefined(patternPart) && patternPart.startsWith(':')) {
        const paramName = patternPart.substring(1);
        const urlPart = urlParts[i];
        if (isDefined(urlPart)) {
          params[paramName] = urlPart;
        }
      } else if (patternParts[i] !== urlParts[i]) {
        return null;
      }
    }

    return params;
  }
}
