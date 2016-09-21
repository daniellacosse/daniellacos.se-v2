import PageRoute                         from "helpers/Route"
import { buildApplication, loadScripts } from "helpers/Template"
import { fetchTweets, fetchTumblrs }     from "helpers/API"

export class IndexRoute extends PageRoute {
  static path = "/"
  static cacheLifeInDays = 1

  prefetch() {
    return Promise.all([
      // fetchTweets  ({ count: 10 }),
      fetchTumblrs ({ count: 3 })
    ])
  }

  dispatch(data) {
    let documents = []
    let _len = data.length

    while (_len--)
      documents = documents.concat(data[_len])

    // documents sort by date

    return buildApplication({
      data: { documents },
      script: loadScripts([
        "components/infoSidebar",
        "components/masterList",
        "components/detailPanel",
        "scripts/rootView"
      ])
    })
  }
}
