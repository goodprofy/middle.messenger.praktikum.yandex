export class Route {
  constructor(
    public pathname: string,
    public component: () => JSX.Element
  ) {}

  public match(pathname: typeof this.pathname) {
    return pathname === this.pathname;
  }
}
