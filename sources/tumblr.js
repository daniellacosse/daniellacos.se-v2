import { privateFetchFactory } from "helpers/api"
import {
  TUMBLR_SOURCE,
  TUMBLR_API_HOST,
  TUMBLR_TEXTS_URL
} from "assets/constants"

const tumblrFetcher = privateFetchFactory({
  entry: "response.posts",
  source: TUMBLR_SOURCE,
  format: {
    type: "text",
    source: TUMBLR_SOURCE
  },
  error: ({ meta, response }) => {
    if (meta.status < 299 || response.length) return null

    return `${TUMBLR_SOURCE}: ${meta.msg} (${meta.status})`
  }
});

export default ({ count, beforeDate } = {}) => {
  return tumblrFetcher({...TUMBLR_TEXTS_URL,
    query: {...TUMBLR_TEXTS_URL
      .query,
      limit: count,
      offset: beforeDate
    }
  })
}