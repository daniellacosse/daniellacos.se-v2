import request from "request"

import fetch from "./index"

export default ({ source, format, error }) => {
  return fetch({ error, format, url, fetcher: request.get })
}
