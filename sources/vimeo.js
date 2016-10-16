import { privateFetchFactory } from "helpers/api"
import {
  VIMEO_SOURCE,
  VIMEO_API_HOST,
  VIMEO_VIDEOS_URL
} from "assets/constants"

const vimeoFetcher = privateFetchFactory({
  source: VIMEO_SOURCE,
  format: ({ uri, pictures, created_time, tags }) => ({
    id: uri.split("/")[1],
    type: "media",
    source: VIMEO_SOURCE,
    frame: `https://player.vimeo.com/video/${uri.split("/")[1]}`,
    picture: pictures.sizes[pictures.sizes.length - 1].link,
    date: created_time,
    tags: tags.map(({ tag }) => tag)
  })
})

export default ({ count, before } = {}) => {
  return vimeoFetcher({...VIMEO_VIDEOS_URL,
    query: {
      per_page: count
    }
  })
}
