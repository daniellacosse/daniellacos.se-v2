import {
  isObject,
  isFunction
} from "lodash"
import got from "got"
import URL from "url"

export privateFetch from "./private"
export twitterFetch from "./twitter"
export tumblrFetch from "./tumblr"
export soundcloudFetch from "./soundcloud"
  // export vimeoFetch from "./vimeo"
  // export driveFetch from "./drive"
export youtubeFetch from "./youtube"
export githubFetch from "./github"
export vineFetch from "./vine"

export const publicFetch = ({
  url,
  format,
  error
}) => {
  return fetch({
    error,
    format,
    url,
    fetcher: (url, callback) => {
      got(url)
        .then(({
          body
        }) => callback(null, body))
        .catch(error => callback(error, null))
    }
  })
}

export default function fetch({
  url,
  format,
  error,
  fetcher
}) {
  const URLString = isObject(url) ?
    URL.format(url) :
    url

  return new Promise((resolve, reject) => {
    fetcher(URLString, (fetchError, body, request) => {
      if (fetchError) reject(fetchError)

      let parsedBody;

      try {
        parsedBody = JSON.parse(body)
      } catch (parseError) {
        reject(parseError)
      }

      if (!parsedBody) {
        console.log("body:", body);
        console.log("request:", request);
        console.log("fetchError:", fetchError);
        reject("Unfortunately, the request body could not be parsed.")
      }

      if (isFunction(error) && error(parsedBody))
        reject(error(parsedBody))

      if (isFunction(format))
        resolve(format(parsedBody))

      resolve(parsedBody)
    })
  })
}
