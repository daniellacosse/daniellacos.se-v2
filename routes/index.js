import Route from "helpers/routing"
import { buildApplication } from "helpers/templating"
import { fetchAll } from "helpers/api"
import { getJPEG } from "helpers/asset"

export HealthRoute from "./health"
export PermalinkRoute from "./permalink"
  // export BannerRoute from "./banner"

export default class IndexRoute extends Route {
  static path = "/"
  static cacheLifeInDays = 1

  prefetch() {
    return fetchAll({ count: 20 })
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
        documents: documents.map(doc => doc.curate()),
        avatarURL: getJPEG("avatar")
      },
      scripts: [
        "components/homeLink",
        "components/infoSidebar",
        "components/masterList",
        "components/detailPanel",
        "pages/indexPage"
      ]
    })
  }
}
