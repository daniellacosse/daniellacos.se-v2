function retrieve(key) {
  let result;

  try {
    result = JSON.parse(
      sessionStorage.getItem(key)
    )
  } catch (error) {
    result = _RUNTIME_DATA_[key]
  }

  return result
}

function retrieveDocuments(documentOrder = retrieve("documentListOrder")) {
  const documentDictionary = retrieve("documentDictionary")

  let retrievedDocuments = []
  whileInList(documentOrder, (documentHash) => {
    retrievedDocuments.push(
      documentDictionary[documentHash]
    )
  })

  return retrievedDocuments || []
}

function retrieveDocument(id) {
  return retrieve("documentDictionary")[id]
}

function retrieveDocumentPosition(id) {
  return retrieve("documentListOrder")
    .indexOf(id)
}

function retrieveActiveDocumentPosition() {
  return retrieveDocumentPosition(retrieveActiveDocumentHash())
}

function retrieveVisibleDocumentList() {
  // const documentFilters = retrieve("filters")
  // const allDocuments = retrieveDocuments()


  return retrieveDocuments()
}

function retrieveActiveDocumentHash() {
  return (
    retrieve(MASTER_LIST_ACTIVE_DOCUMENT_KEY) ||
    retrieve("documentListOrder")[0]
  )
}

function retrieveActiveDocument() {
  const potentialActiveDocument = retrieveDocument(retrieveActiveDocumentHash())

  if (!potentialActiveDocument) {
    const firstVisibleDocument = retrieveVisibleDocumentList()[0]

    addToStorage({
      [MASTER_LIST_ACTIVE_DOCUMENT_KEY]: firstVisibleDocument.id
    })

    return firstVisibleDocument
  }

  return potentialActiveDocument
}
