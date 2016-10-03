import Connection from "oauth"

import { documentFetch } from "./index"

export const publicFetchFactory = (props) => {
  return (url) => documentFetch({...props,
    fetcher: (URLString, callback) => {
      got(URLString)
        .then(({ body }) => callback(null, body))
        .catch(error => callback(error, null))
    }
  })
}

export const privateFetchFactory = (props) => {
  const fetchConnector = new Connection.OAuth(
    null,
    null,
    process.env[`${source}_CONSUMER_KEY`],
    process.env[`${source}_CONSUMER_SECRET`],
    props.version || "1.0A",
    null,
    "HMAC-SHA1"
  )

  return (url) => documentFetch({...props,
    fetcher: (URLString, callback) => {
      return fetchConnector.get(
        URLString,
        process.env[`${source}_ACCESS_KEY`],
        process.env[`${source}_ACCESS_SECRET`],
        callback
      )
    }
  })
}
