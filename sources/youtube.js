import { publicFetchFactory } from "helpers/api"
import {
  YOUTUBE_SOURCE,
  YOUTUBE_API_HOST,
  YOUTUBE_CHANNEL,
  YOUTUBE_UPLOADS_URL
} from "assets/constants"

const youtubeFetcher = publicFetchFactory({
  entry: "items",
  postEntry: "snippet",
  format: ({ thumbnails, resourceId, publishedAt }) => ({
    id: resourceId.videoId,
    type: "media",
    source: YOUTUBE_SOURCE,
    picture: thumbnails.default.url,
    frame: `https://www.youtube.com/embed/${resourceId.videoId}`,
    date: publishedAt
  }),
  error: (response) => {
    if (!response.code) return null;

    return `${YOUTUBE_SOURCE}: (${response.code})`;
  }
})

export default ({ count, before } = {}) => {
  return youtubeFetcher({...YOUTUBE_UPLOADS_URL,
    query: {...YOUTUBE_UPLOADS_URL
      .query,
      maxResults: count
    }
  })
}
