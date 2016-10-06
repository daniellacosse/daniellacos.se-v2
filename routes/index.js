import Route from "helpers/routing"
import { buildApplication } from "helpers/template"
import { fetchAll } from "helpers/api"
import { getJPEG } from "helpers/asset"

export HealthRoute from "./health"
export PermalinkRoute from "./permalink"
  // export BannerRoute from "./banner"

export default class IndexRoute extends Route {
  static path = "/"
  static cacheLifeInDays = 1

  prefetch() {
    return fetchAll({ count: 50 })
  }

  dispatch(documents) {
    return buildApplication({
      meta: {
        type: "CreativeWork",
        title: "daniellacos.se",
        description: "The Creative Works of Daniel LaCosse.",
        previewImage: "http://daniellacos.se/banner.jpg",
        url: "http://daniellacos.se/"
      },
      data: {
        documents: documents.map(doc => doc.toJSON()),
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
