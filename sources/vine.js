require("babel-polyfill");

import fetch, { publicFetchFactory } from "helpers/api"
import got from "got"
import {
  VINE_SOURCE,
  VINE_API_HOST,
  VINE_FAVORITES,
  VINE_PROFILE_URL,
  VINE_POST_URL_FACTORY
} from "assets/constants"

const vineFetcher = publicFetchFactory({
  entry: "posts",
  documentUrlFactory: VINE_POST_URL_FACTORY,
  format: (post) => ({
      id: post.postId,
      type: "media",
      source: VINE_SOURCE,
      picture: post.thumbnailUrl,
      frame: `${post.permalinkUrl}/embed/wide`,
      date: post.created,
      tags: (post.entities || [])
        .filter(({ type }) => type === "tag")
        .map(({ title }) => title)
  }),
  favorites: VINE_FAVORITES,
  error: (response) => {
    if (!response || !response.code) return null;

    return `${VINE_SOURCE}: (${response.code})`;
  }
})

export default (options = {}) => vineFetcher(VINE_PROFILE_URL, options)
