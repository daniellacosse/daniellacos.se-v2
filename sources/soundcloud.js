import { publicFetchFactory } from "helpers/api"
import {
  SOUNDCLOUD_SOURCE,
  SOUNDCLOUD_API_HOST,
  SOUNDCLOUD_FAVORITES,
  SOUNDCLOUD_TRACKS_URL,
  SOUNDCLOUD_FRAME_URL
} from "assets/constants"

const soundcloudFetcher = publicFetchFactory({
  format: ({ artwork_url, genre, tag_list, uri }) => ({
    type: "media",
    source: SOUNDCLOUD_SOURCE,
    picture: artwork_url,
    frame: {...SOUNDCLOUD_FRAME_URL,
      query: {...SOUNDCLOUD_FRAME_URL
        .query,
        url: uri
      }
    },
    frameHeight: 160,
    tags: [genre, ...(tag_list || "")
      .split(/\s?\"/)
      .filter(tag => !!tag)
    ]
  }),
  favorites: SOUNDCLOUD_FAVORITES,
  error: (response) => {
    if (!response) return `${SOUNDCLOUD_SOURCE}: No response!`
    if (!response.statusCode) return null

    return `${SOUNDCLOUD_SOURCE}: ${response} (${statusCode})`
  }
})

export default (options = {}) => soundcloudFetcher(SOUNDCLOUD_TRACKS_URL,
  options)
