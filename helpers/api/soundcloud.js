import URL from "url"

import { publicFetch } from "./index"
import {
  SOUNDCLOUD_SOURCE, SOUNDCLOUD_API_HOST
} from "../constants"

const format = (data) => {
  const mappedData = data.map(({
    id, uri, title, description, created_at, tag_list, permalink_url, artwork_url
  }) => {
    return {
      id,
      type: "media",
      source: SOUNDCLOUD_SOURCE,
      url: permalink_url,
      title,
      previewImage: artwork_url,
      frameUrl: URL.format({
        protocol: "https",
        hostname: "w.soundcloud.com",
        pathname: "/player",
        query: {
          url: uri,
          show_artwork: true
        }
      }),
      body: description,
      date: new Date(created_at).toLocaleDateString(),
      tags: tag_list
    }
  })

  if (count)
    return mappedData.slice(0, count)

  return mappedData
}

const error = (data) => {
  if (!data) return `${SOUNDCLOUD_SOURCE}: No data!`
  if (!data.statusCode) return null

  return `${SOUNDCLOUD_SOURCE}: ${data} (${statusCode})`
}

export default ({ count, since } = {}) => {
  return publicFetch({ format, error, url: {
    protocol: "https",
    hostname: SOUNDCLOUD_API_HOST,
    pathname: "/tracks",
    query: {
      client_id: process.env["SOUNDCLOUD_CONSUMER_KEY"]
    }
  }})
}
