import { sortByDate } from "../document"
import * as sources from "./sources"

export default (options = {}) => {
  const sourceKeys = Object.keys(sources)

  let _len = sourceKeys.length
  let fetchPromises = []
  while (_len--) {
    const key = sourceKeys[_len]
    const source = sources[key]

    fetchPromises.push(source(options))
  }

  return Promise.all(fetchPromises)
    .then((documentSets) => {
      let allDocuments = sortByDate(
        [].concat.apply([], documentSets)
      )

      // ensure temporal concurrency
      // gallerify

      // the above again if count length not met

      return allDocuments
    })
}
