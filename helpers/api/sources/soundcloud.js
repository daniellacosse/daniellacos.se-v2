import { publicFetchFactory } from "../factory"
import {
  SOUNDCLOUD_SOURCE,
  SOUNDCLOUD_API_HOST,
  SOUNDCLOUD_TRACKS_URL,
  SOUNDCLOUD_FRAME_URL
} from "../../constants"

const soundcloudFetcher = publicFetchFactory({
  format: ({ artwork_url, genre, tag_list, uri }) => ({
    type: "media",
    source: SOUNDCLOUD_SOURCE,
    picture: post.artwork_url,
    frame: {...SOUNDCLOUD_FRAME_URL,
      query: {...SOUNDCLOUD_FRAME_URL
        .query,
        url: uri
      }
    },
    tags: [genre, ...tag_list.split(/\s?\"/)
      .filter(tag => !!tag)
    ]
  }),
  error: (response) => {
    if (!response) return `${SOUNDCLOUD_SOURCE}: No response!`
    if (!response.statusCode) return null

    return `${SOUNDCLOUD_SOURCE}: ${response} (${statusCode})`
  }
})

export default () => soundcloudFetcher(SOUNDCLOUD_TRACKS_URL)
