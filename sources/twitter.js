import TwitterClient from "twitter"
import URL from "url"
import got from "got"

import { documentFetch } from "helpers/api"
import {
  TWITTER_SOURCE,
  TWITTER_API_HOST,
  TWITTER_TIMELINE_URL,
  TWITTER_OEMBED_URL,
} from "assets/constants"

export default (options = {}) => {
  return documentFetch({
    url: {
      ...TWITTER_TIMELINE_URL,
      query: {
        ...TWITTER_TIMELINE_URL.query,
        count: options.count
      }
    },
    format: ({ entities, text, id_str }) => {
      return got(
          URL.format({
            ...TWITTER_OEMBED_URL,
            query: { id: id_str }
          })
        )
        .then(({ body }) => ({
          type: "text",
          source: TWITTER_SOURCE,
          tags: entities.hashtags,
          body: JSON.parse(body)
            .html
        }));
    },
    fetcher: (url, callback) => {
      new TwitterClient({
          consumer_key: process.env["TWITTER_CONSUMER_KEY"],
          consumer_secret: process.env["TWITTER_CONSUMER_SECRET"],
          access_token_key: process.env["TWITTER_ACCESS_TOKEN"],
          access_token_secret: process.env["TWITTER_ACCESS_SECRET"]
        })
        .get(url, (error, body, response) => {
          callback(error, JSON.stringify(body))
        })
    },
    ...options
  })
}
