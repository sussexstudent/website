type Route = RegExp | string;

export class PreRouter {
  private routes: RegExp[];

  constructor(routes: Route[]) {
    this.routes = routes.map((route) => {
      if (!(route instanceof RegExp)) {
        return new RegExp(`^${route}`);
      }

      return route;
    });
  }

  public matches(path: string) {
    const normalisedPath = path.slice(-1) === '/' ? path.slice(0, -1) : path;

    return this.routes.find((route) => route.test(normalisedPath));
  }
}
