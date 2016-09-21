import PageRoute                        from "helpers/Route"
import { buildApplication, loadScript } from "helpers/Template"

export class PermalinkRoute extends PageRoute {
  static path = "/:type/:hash"
  static cacheLifeInDays = 6

  prefetch({ type, hash }) {

  }

  dispatch(item) {
    return []
  }
}
