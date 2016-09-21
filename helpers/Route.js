import { isArray, isString, isFunction } from "lodash"

import { loadScripts, buildApplication } from "./Template"

export const attachRoutes = (app, routes) => {
  let _keys = Object.keys(routes)
  let _len = _keys.length

  while(_len--) {
    const Route = routes[_keys[_len]]

    app.get(Route.path, (request, response) => {
      new Route(request, response)
        .handler()
        .catch(console.trace)
    })
  }
}

export default class PageRoute {
  constructor(request, response) {
    this.params = request.params;
    this.response = response;
  }

  handler() {
    const loadCache = this._loadCache(this.params)
    if (loadCache) return this.response.send(loadCache)

    return this._setupHandler(this)
      .then(HTMLString => {
        this._saveCache(this.params, HTMLString)

        return this.response.send(HTMLString)
      })
  }

  _loadCache(params) {
    // TODO
  }

  _saveCache(params, content) {
    // TODO
  }

  _setupHandler({ prefetch, params, dispatch }) {
    return new Promise((resolve, reject) => {
      if (!isFunction(prefetch)) resolve(dispatch())

      prefetch(params)
        .then(data => resolve(dispatch(data)))
        .catch(reject)
    })
  }
}
