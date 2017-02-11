import Route from "helpers/routing"
import { fetchAll } from "helpers/api"
import { getJPEG } from "helpers/asset"

import { DEFAULT_DOCUMENT_COUNT } from "assets/constants"

export default class TimelineRoute extends Route {
  static path = "/timeline"

  prefetch({ count, before }) {
    return fetchAll({
      count: count || DEFAULT_DOCUMENT_COUNT,
      before: before || new Date()
    })
  }

  dispatch(documents) {
    return documents.map(doc => doc.curate())
  }
}
