import { publicFetchFactory } from "../factory"
import {
  VINE_SOURCE,
  VINE_API_HOST,
  VINE_TIMELINE,
  VINE_TIMELINE_URL
} from "../../constants"

const vineFetcher = publicFetchFactory({
  entry: "data.records",
  format: (post) => ({
    type: "media",
    source: VINE_SOURCE,
    picture: post.thumbnailUrl,
    frame: `${post.permalinkUrl}/embed/wide`,
    tags: post.entities
      .filter(({ type }) => type === "tag")
      .map(({ title }) => title)
  }),
  error: (response) => {
    if (!response.code) return null;

    return `${VINE_SOURCE}: (${response.code})`;
  }
})

export default () => publicFetchFactory(VINE_TIMELINE_URL)
