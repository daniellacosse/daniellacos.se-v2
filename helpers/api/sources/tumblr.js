import { privateFetchFactory } from "../factory"
import {
  TUMBLR_SOURCE,
  TUMBLR_API_HOST,
  TUMBLR_TEXTS_URL
} from "../../constants"

const tumblrFetcher = privateFetchFactory({
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

export default ({ count, since } = {}) => {
  return tumblrFetcher({...TUMBLR_TEXTS_URL,
    query: {...TUMBLR_TEXTS_URL
      .query,
      limit: count,
      offset: since
    }
  })
}
