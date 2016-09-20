import PageRoute                        from "helpers/Route"
import { buildApplication, loadScript } from "helpers/Template"

export class PermalinkRoute extends PageRoute {
  static path = "/:hash"
  static cacheLifeInDays = 6

  prefetch({ hash }) {

  }

  dispatch(data) {
    return []
  }
}
