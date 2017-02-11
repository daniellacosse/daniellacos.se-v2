import { publicFetchFactory } from "helpers/api"
import {
  VINE_SOURCE,
  VINE_API_HOST,
  VINE_FAVORITES,
  VINE_TIMELINE,
  VINE_TIMELINE_URL
} from "assets/constants"

const vineFetcher = publicFetchFactory({
  entry: "data.records",
  filter: (post) => !post.repost,
  format: (post) => ({
    id: post.permalinkUrl.split("/")
      .reverse()[0],
    type: "media",
    source: VINE_SOURCE,
    picture: post.thumbnailUrl,
    frame: `${post.permalinkUrl}/embed/wide`,
    date: post.created,
    tags: post.entities
      .filter(({ type }) => type === "tag")
      .map(({ title }) => title)
  }),
  favorites: VINE_FAVORITES,
  error: (response) => {
    if (!response.code) return null;

    return `${VINE_SOURCE}: (${response.code})`;
  }
})

export default (options = {}) => vineFetcher(VINE_TIMELINE_URL, options)
