import PageRoute                        from "helpers/Route"
import { buildApplication, loadScript } from "helpers/Template"

export class IndexRoute extends PageRoute {
  static path = "/"
  static cacheLifeInDays = 1

  dispatch(data) {
    return [
      "components/infoSidebar",
      "components/masterList",
      "components/detailPanel",
      "scripts/rootView"
    ]
  }
}
