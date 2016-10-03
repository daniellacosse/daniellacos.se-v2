export default function sortByDate(documents) {
  return documents.sort((doc1, doc2) => {
    const dateA = new Date(doc1.date)
    const dateB = new Date(doc2.date)

    if (dateA == dateB) return 0
    return (dateA > dateB) ? -1 : 1
  })
}
