import Route from "helpers/route"
import { buildApplication } from "helpers/template"
import { fetchTweets, fetchTumblrs, fetchSounds } from "helpers/api"
import { getJPGURL, sanitizeFontIcons }from "helpers/asset"

export HealthRoute from "./health"
export PermalinkRoute from "./permalink"

export class IndexRoute extends Route {
  static path = "/"
  static cacheLifeInDays = 1

  prefetch() {
    return Promise.all([
      // fetchTweets  ({ count: 10 }),
      fetchTumblrs({ count: 3 }),
      fetchSounds({ count: 5 })
    ])
  }

  dispatch(data) {
    let documents = []
    let _len = data.length

    while (_len--)
      documents = documents.concat(data[_len])

    return buildApplication({
      meta: {
        type: "CreativeWork",
        title: "daniellacos.se",
        description: "",
        previewImage: "",
        url: "http://daniellacos.se/"
      },
      data: {
        documents: documents.sort((a, b) => {
          const dateA = new Date(a.date)
          const dateB = new Date(b.date)

          if (dateA == dateB) return 0
          return (dateA > dateB) ? -1 : 1
        }),
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
