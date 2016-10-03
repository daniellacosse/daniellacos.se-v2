import {
  isObject,
  isFunction,
  get
} from "lodash"
import got from "got"
import URL from "url"

import Document from "../document"

export const documentFetch = ({ url, entry, format, error, fetcher }) => {
  return fetch({ url, error, fetcher })
    .then((parsedBody) => {
      return get(parsedBody, entry)
        .map((post) => new Document(post, format(post)))
    })
}

export default function fetch({ url, error, fetcher }) {
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

      resolve(parsedBody)
    })
  })
}

export * as sources from "./sources"
export fetchAll from "./fetchAll"
export {
  publicFetchFactory,
  privateFetchFactory
}
from "./factory"
