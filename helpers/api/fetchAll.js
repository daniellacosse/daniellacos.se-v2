import { flow } from "lodash"

import { sortByDate, collapseIntoGallaries } from "../document"
import { whileInObject } from "../iterators"
import * as sources from "sources"

export default (options = {}) => {
  let fetchPromises = []

  whileInObject(sources, (key, source) => {
    fetchPromises.push(source(options))
  })

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
