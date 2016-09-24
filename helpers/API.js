import URL from "url"
import Connection from "oauth"
import { isObject, isFunction } from "lodash";

export const TWITTER_SOURCE = "TWITTER"
export const TWITTER_API_HOST = "api.twitter.com/1.1"

export const TUMBLR_SOURCE = "TUMBLR"
export const TUMBLR_API_HOST = "api.tumblr.com/v2/blog/daniellacosse.tumblr.com"

export const fetchTweets = ({ count, since }) => {
  return fetch({
    source: TWITTER_SOURCE,
    url: {
      protocol: "https",
      hostname: TWITTER_API_HOST,
      pathname: "/statuses/user_timeline.json",
      query: {
        contributor_details: false,
        exclude_replies: true,
        include_rts: false,
        trim_user: true,
        count
      }
    },
    // TODO: curate into documents
    format: (data) => {
      return data
    },
    error: ({ errors }) => {
      if (!errors) return null

      return errors.map(({ code, message }) => {
        return `${TWITTER_SOURCE}: ${message} (${code})`
      }).join(", ")
    }
  })
}

export const fetchTumblrs = ({ count, since }) => {
  return fetch({
    source: TUMBLR_SOURCE,
    url: {
      protocol: "https",
      hostname: TUMBLR_API_HOST,
      pathname: "/posts/text",
      query: {
        limit: count,
        offset: since,
        filter: "raw"
      }
    },
    format: ({ response }) => {
      return response.posts.map(
        ({ id, post_url, date, tags, title, body }) => ({
          id, url: post_url, date, tags, title, body, type: "text", source: TUMBLR_SOURCE
        })
      )
    },
    error: ({ meta, response }) => {
      if (meta.status < 299 || response.length) return null

      return `${TUMBLR_SOURCE}: ${meta.msg} (${meta.status})`
    }
  })
}

// TODO: 'fetchDocuments'

export default function fetch ({ source, url, format, error }) {
  const URLString = isObject(url)
    ? URL.format(url)
    : url

  const fetchConnector = new Connection.OAuth(
    null,
    null,
    process.env[`${source}_CONSUMER_KEY`],
    process.env[`${source}_CONSUMER_SECRET`],
    "1.0A",
    null,
    "HMAC-SHA1"
  )

  return new Promise((resolve, reject) => {
    fetchConnector.get(
      URLString,
      process.env[`${source}_ACCESS_KEY`],
      process.env[`${source}_ACCESS_SECRET`],
      function (fetchError, body, response) {
        if (fetchError) reject(fetchError)

        let parsedBody;

        try {
          parsedBody = JSON.parse(body)
        } catch (parseError) {
          reject(parseError)
        }

        if (isFunction(error) && error(parsedBody))
          reject(error(parsedBody))

        if (isFunction(format))
          resolve(format(parsedBody))

        resolve(parsedBody)
      }
    )
  })
}
