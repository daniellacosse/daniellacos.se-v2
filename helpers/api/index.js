import {
  isObject,
  isFunction,
  get
} from "lodash"
import URL from "url"

import Document from "../document"

export const documentFetch = ({
  url,
  entry,
  postEntry,
  format,
  error,
  fetcher,
  count,
  beforeDate
}) => {
  return fetch({ url, error, fetcher })
    .then((parsedBody) => {
      const resultCollection = get(parsedBody, entry, parsedBody)
      const formatter = (post) => {
        const unwrappedPost = get(post, postEntry, post)
        const additionalProperties = isFunction(format) ?
          format(unwrappedPost) : format

        return new Document(unwrappedPost, additionalProperties)
      }

      let documents = resultCollection.map(formatter)
      if (beforeDate) {
        const beforeDateObject = new Date(beforeDate)

        documents = documents.filter(({ date }) => date <
          beforeDateObject)
      }

      if (count) documents = documents.slice(0, count)

      // if (document.length < count) try to fetch again

      return documents
    })
    .catch((error) => {
      console.trace(error)

      return []
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
        reject(
          new Error(
            "Unfortunately, the request body could not be parsed."
          )
        )
      }

      if (isFunction(error) && error(parsedBody))
        reject(error(parsedBody))

      resolve(parsedBody)
    })
  })
}

export fetchAll from "./fetchAll"
export { publicFetchFactory, privateFetchFactory }
from "./factory"
