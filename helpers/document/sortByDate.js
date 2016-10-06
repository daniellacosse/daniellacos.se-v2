export default function sortByDate(documents) {
  return documents.sort((doc1, doc2) => {
    if (doc1.date == doc2.date) return 0
    return (doc1.date > doc2.date) ? -1 : 1
  })
}
