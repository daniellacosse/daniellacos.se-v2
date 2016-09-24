import PageRoute                        from "helpers/Route"
import { buildApplication, loadScript } from "helpers/Template"

export default class PermalinkRoute extends PageRoute {
  static path = "/:type/:hash"
  static cacheLifeInDays = 6

  prefetch({ type, hash }) {

  }

  dispatch(item) {
    return []
  }
}
