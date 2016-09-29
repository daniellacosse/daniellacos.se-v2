export default (app, routes) => {
  let _keys = Object.keys(routes)
  let _len = _keys.length

  while(_len--) {
    const Route = routes[_keys[_len]]

    app.get(Route.path, (request, response) => {
      const handledRoute = new Route(request, response).handler()

      if (handledRoute.catch)
        handledRoute.catch(console.trace)
    })
  }
}
