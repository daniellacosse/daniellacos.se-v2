import { flow } from "lodash"

import { sortByDate, collapseIntoGallaries } from "../document"
import * as sources from "sources"

export default (options = {}) => {
  const sourceKeys = Object.keys(sources)

  let _len = sourceKeys.length
  let fetchPromises = []
  while (_len--) {
    const key = sourceKeys[_len]
    const source = sources[key]

    fetchPromises.push(source(options))
  }

  // TODO: ensure temporal concurrecy across sources
  // TODO: keep hitting all endpoints until you've gotten the proper # of records
  return Promise.all(fetchPromises)
    .then((documentSets) => {
      let allDocuments = flow([
        sortByDate,
        collapseIntoGallaries
      ])([].concat.apply([], documentSets))

      if (options.count)
        allDocuments = allDocuments.slice(0, options.count)

      return allDocuments
    })
}
