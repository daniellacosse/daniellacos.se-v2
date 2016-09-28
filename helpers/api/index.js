import { isObject, isFunction } from "lodash"
import URL from "url"

export publicFetch from "./public"
export privateFetch from "./private"
export twitterFetch from "./twitter"
export tumblrFetch from "./tumblr"
export soundcloudFetch from "./soundcloud"

// TODO: 'fetchDocuments'
export default function fetch({ url, fetcher, error, format }) {
  const URLString = isObject(url)
    ? URL.format(url)
    : url

    return new Promise((resolve, reject) => {
      fetcher(URLString, (error, body) => {
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
      })
    })
}
