import Route from "helpers/routing"
import { getJPEG } from "helpers/asset"

export default class BannerRoute extends Route {
  static path = "/banner.jpg"

  dispatch() {
    return getJPEG("banner")
  }
}
