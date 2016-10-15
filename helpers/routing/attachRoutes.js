import { whileInObject } from "../iterators"

export default (app, routes) => {
  whileInObject(routes, (key, Route) => {
    app.get(Route.path, (request, response) => {
      const handledRoute = new Route(request, response)
        .handler()

      if (handledRoute.catch)
        handledRoute.catch(console.trace)
    })
  })
}
