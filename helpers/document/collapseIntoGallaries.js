import { startCase, toLower, flow } from "lodash"

import Document from "./index"

// TODO: may have off by one error
export default function collapseIntoGallaries(documents) {
  if (documents.length === 1)
    return documents;

  let cursor = 0
  let resultingDocuments = []

  while (cursor < documents.length - 1) {
    const nextCursor = cursor + 1
    const targetDocument = documents[cursor] || {}
    const nextDocument = documents[nextCursor] || {}

    if (targetDocument.source === nextDocument.source) {
      const targetSource = targetDocument.source

      let subdocuments = []
      let tagAggregation = []
      let subcursor = 0
      let currentSource = targetSource

      while (currentSource === targetSource) {
        const currentDocument = documents[cursor + subcursor] || {}

        if (currentDocument) {
          currentSource = currentDocument.source
          tagAggregation = tagAggregation.concat(currentDocument.tags)

          delete currentDocument.tags
          subdocuments.push(currentDocument)
        }

        subcursor++ // advance cursor
        currentSource = (documents[cursor + subcursor] || {})
          .source
      }

      const startDoc = subdocuments[subdocuments.length - 1];
      const startDate = startDoc.date.toLocaleDateString()
      const endDoc = subdocuments[0];
      const endDate = endDoc.date.toLocaleDateString()
      resultingDocuments.push(
        new Document({
          id: `${startDoc.id}-${endDoc.id}`,
          type: "gallery",
          source: targetSource,
          picture: startDoc.picture,
          title: `${flow([ toLower, startCase ])(targetSource)} activity from ${startDate} to ${endDate}`,
          date: startDate,
          subdocuments,
          tags: tagAggregation.filter((el, i) => tagAggregation.indexOf(el) ===
            i)
        })
      )

      cursor += subcursor
    } else {
      resultingDocuments.push(documents[cursor])
      cursor++
    }
  }

  return resultingDocuments
}
