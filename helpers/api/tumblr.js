import publicFetch from "./public"

import {
  TUMBLR_SOURCE, TUMBLR_API_HOST
} from "../constants"

const format = ({ response }) => {
  return response.posts.map(
    ({ id, post_url, date, tags, title, body }) => {
      return {
        id,
        url: post_url,
        date: new Date(date).toLocaleDateString(),
        tags,
        title,
        body,
        type: "text",
        source: TUMBLR_SOURCE
      }
    }
  )
}

const error = ({ meta, response }) => {
  if (meta.status < 299 || response.length) return null

  return `${TUMBLR_SOURCE}: ${meta.msg} (${meta.status})`
}

export default ({ count, since } = {}) => {
  return publicFetch({
    url: {
      protocol: "https",
      hostname: TUMBLR_API_HOST,
      pathname: "/posts/text",
      query: {
        limit: count,
        offset: since,
        filter: "raw"
      }
    }, format, error
  })
}
