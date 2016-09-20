import { isArray, isString } from "lodash"

import { loadScripts, buildApplication } from "./Template"

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
    const dispatch = this.dispatch()

    // TODO: if response in cache with timestamp < this.cacheLifeInDays
      // send cached response
      // else prefetch (if there's something to prefetch), run through dispatch, compress, save in cache, then send

    // manner of dispatch determined by return type
    if (isArray(dispatch)) {
      this.response.send(
        buildApplication({
          script: loadScripts(dispatch)
        })
      )
    } else if (isString(dispatch)) {
      this.response.send(dispatch)
    }
  }
}
