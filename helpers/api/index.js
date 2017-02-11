import {
  isObject,
  isFunction,
  get
} from "lodash"
import URL from "url"

import { reportError } from "../system"
import Document from "../document"

export const documentFetch = ({
  url,
  entry,
  postEntry,
  format,
  favorites,
  filter,
  error,
  fetcher,
  count,
  before
}) => {
  return fetch({ url, error, fetcher })
    .then((parsedBody) => {
      const resultCollection = get(parsedBody, entry, parsedBody)
      const filterer = (post) => {
        const unwrappedPost = get(post, postEntry, post)

        return isFunction(filter) ? filter(unwrappedPost) : true
      }

      const formatter = (post) => {
        const unwrappedPost = {
          ...get(post, postEntry, post), favorites
        };

        const formattedProperties = isFunction(format)
          ? format(unwrappedPost)
          : format;

        if (formattedProperties.then) { // check if it's a promise
          return formattedProperties.then((resultingProperties) => {
            return new Document(unwrappedPost, resultingProperties)
          })
        } else {
          return Promise.resolve(
            new Document(unwrappedPost, formattedProperties)
          )
        }
      }

      return Promise.all(
          resultCollection
            .filter(filterer)
            .map(formatter)
        )
        .then((documents) => {
          if (before) {
            const beforeObject = new Date(before)

            documents = documents.filter(({ date }) => date <
              beforeObject)
          }

          if (count)
            documents = documents.slice(0, count)
            // TODO: if (document.length < count) try to fetch again

          return documents
        })
    })
    .catch((error) => {
      reportError(error);

      return []
    })
}

export default function fetch({ url, error, fetcher }) {
  const URLString = isObject(url) ?
    URL.format(url) :
    url

  return new Promise((resolve, reject) => {
    fetcher(URLString, (fetchError, body) => {
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
