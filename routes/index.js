import PageRoute                         from "helpers/Route"
import { buildApplication } from "helpers/Template"
import { fetchTweets, fetchTumblrs }     from "helpers/API"
import { getJPGURL, sanitizeFontIcons }                     from "helpers/Asset"

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

    // documents fuzzy sort by date

    return buildApplication({
      data: {
        documents,
        avatarURL: getJPGURL("avatar"),
        fontIcons: sanitizeFontIcons()
      },
      scripts: [ "rootView" ],
      libraries: [
        "homeLink",
        "infoSidebar",
        "masterList",
        "detailPanel"
      ]
    })
  }
}
