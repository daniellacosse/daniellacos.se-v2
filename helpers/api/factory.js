import Connection from "oauth"
import got from "got"

import { documentFetch } from "./index"

export const publicFetchFactory = (props = {}) => {
  return (url, options = {}) => documentFetch({
    url, ...props, ...options, fetcher: (URLString, callback) => {
      got(URLString)
        .then(({ body }) => callback(null, body))
        .catch(error => callback(error, null));
    }
  });
}

export const privateFetchFactory = (props = {}) => {
  const fetchConnector = new Connection.OAuth(
    null, null,
    process.env[`${props.source}_CONSUMER_KEY`],
    process.env[`${props.source}_CONSUMER_SECRET`],
    props.protocol || "1.0A",
    null,
    "HMAC-SHA1"
  )

  return (url, options = {}) => documentFetch({
    url, ...props, ...options, fetcher: (URLString, callback) => {
      return fetchConnector.get(
        URLString,
        process.env[`${props.source}_ACCESS_KEY`],
        process.env[`${props.source}_ACCESS_SECRET`],
        callback
      )
    }
  })
}
