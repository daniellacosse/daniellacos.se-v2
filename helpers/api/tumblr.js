import privateFetch from "./private"

import {
  TUMBLR_SOURCE, TUMBLR_API_HOST
} from "../constants"

const format = ({ response }) => {
  return response.posts.map(
    ({ id, post_url, date, tags, title, body }) => {
      return {
        id,
        type: "text",
        source: TUMBLR_SOURCE,
        url: post_url,
        title,
        date: new Date(date).toLocaleDateString(),
        body,
        tags
      }
    }
  )
}

const error = ({ meta, response }) => {
  if (meta.status < 299 || response.length) return null

  return `${TUMBLR_SOURCE}: ${meta.msg} (${meta.status})`
}

export default ({ count, since } = {}) => {
  return privateFetch({ format, error, source: TUMBLR_SOURCE, url: {
    protocol: "https",
    hostname: TUMBLR_API_HOST,
    pathname: "/posts/text",
    query: {
      limit: count,
      offset: since,
      filter: "raw"
    }
  }})
}
