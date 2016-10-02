import Connection from "oauth"

import fetch from "./index"

export default ({ url, source, format, error, version }) => {
  const fetchConnector = new Connection.OAuth(
    null,
    null,
    process.env[`${source}_CONSUMER_KEY`],
    process.env[`${source}_CONSUMER_SECRET`],
    version || "1.0A",
    null,
    "HMAC-SHA1"
  )

  return fetch({
    error, format, url,
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
