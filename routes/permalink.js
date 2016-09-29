import Route from "helpers/routing"
import { buildApplication, loadScript } from "helpers/template"

export default class PermalinkRoute extends Route {
  static path = "/:type/:hash"
  static cacheLifeInDays = 6

  prefetch({ type, hash }) {

  }

  dispatch(item) {
    return []
  }
}
