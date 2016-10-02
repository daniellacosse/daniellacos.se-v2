import { publicFetch } from "./index"

import {
  YOUTUBE_SOURCE, YOUTUBE_API_HOST
} from "../constants"

const format = ({ items }) => {
  return items.map(({ snippet }) => snippet).map(({
    resourceId, title, description, publishedAt, thumbnails
  }) => {
    return {
      id: resourceId.videoId,
      type: "media",
      source: YOUTUBE_SOURCE,
      url: `https://www.youtube.com/watch?v=${resourceId.videoId}`,
      title,
      body: description,
      previewImage: thumbnails.default.url,
      frameHeight: 400,
      frameUrl: `https://www.youtube.com/embed/${resourceId.videoId}`,
      date: new Date(publishedAt).toLocaleDateString()
    }
  })
}

const error = ({ code }) => {
  if (!code) return null;

  return `${YOUTUBE_SOURCE}: (${code})`;
}

export default ({ count, since } = {}) => {
  return publicFetch({ format, error, url: {
    protocol: "https",
    hostname: YOUTUBE_API_HOST,
    query: {
      part: "snippet",
      playlistId: "UUAGXhqiwwgiWkZqK8jdKMgw",
      maxResults: count,
      key: process.env["GOOGLE_CONSUMER_KEY"]
    },
  }})
}
