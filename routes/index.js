import Route from "helpers/routing"
import { buildApplication } from "helpers/template"
import { tumblrFetch, soundcloudFetch } from "helpers/api"
import { getJPEG }from "helpers/asset"

export HealthRoute from "./health"
export PermalinkRoute from "./permalink"

export class IndexRoute extends Route {
  static path = "/"
  static cacheLifeInDays = 1

  prefetch() {
    return Promise.all([
      // fetchTweets  ({ count: 10 }),
      tumblrFetch({ count: 3 })
      // soundcloudFetch({ count: 5 })
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
        avatarURL: getJPEG("avatar")
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
