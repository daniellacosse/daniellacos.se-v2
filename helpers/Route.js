// TODO
  // prefetching
  // caching
  // g-zipping

export const attachRoutes = (app, routes) => {
  let _keys = Object.keys(routes)
  let _len = _keys.length

  while(_len--) {
    const Route = routes[_keys[_len]]

    app.get(Route.path, (request, response) => {
      new Route(request, response).handler();
    })
  }
}

export default class PageRoute {
  constructor(request, response) {
    this.params = request.params;
    this.response = response;
  }

  handler() {
    this.response.send(
      this.dispatch()
    );
  }
}
