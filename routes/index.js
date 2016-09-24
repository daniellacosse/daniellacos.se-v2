import PageRoute                         from "helpers/Route"
import { buildApplication } from "helpers/Template"
import { fetchTweets, fetchTumblrs }     from "helpers/API"
import { getJPGURL, sanitizeFontIcons }                     from "helpers/Asset"

export HealthRoute from "./health"
export PermalinkRoute from "./permalink"

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

    // TODO documents fuzzy sort by date
    return buildApplication({
      meta: {
        type: "CreativeWork",
        title: "daniellacos.se",
        description: "",
        previewImage: "",
        url: "http://daniellacos.se/"
      },
      data: {
        documents,
        avatarURL: getJPGURL("avatar"),
        fontIcons: sanitizeFontIcons()
      },
      scripts: [
        "libraries/homeLink",
        "libraries/infoSidebar",
        "libraries/masterList",
        "libraries/detailPanel",
        "scripts/rootView"
      ]
    })
  }
}
