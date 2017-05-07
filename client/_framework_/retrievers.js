function retrieve(key, fallback) {
  let result;

  try {
    result = JSON.parse(
      sessionStorage.getItem(key)
    );
  } catch (error) {
    result = _RUNTIME_DATA_[key];
  }

  return (typeof result !== "undefined")
    ? result
    : fallback;
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

// NOTE: arguably beyond the purview of this "framework"
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

function retrieveActiveDocumentPosition() {
  return retrieveDocumentPosition(retrieveActiveDocumentHash())
}

function retrieveActiveDocumentHash() {
  return (
    retrieve(MASTER_LIST_ACTIVE_DOCUMENT_KEY) ||
    retrieve("documentListOrder")[0]
  )
}

function retrieveVisibleDocumentList() {
  const documentFilters = retrieve(INFO_SIDEBAR_TOGGLE_FILTER_LIST_KEY)
  const allDocuments = retrieveDocuments()

  if (!documentFilters || !documentFilters.length)
    return allDocuments

  return allDocuments.filter(({ type }) => documentFilters.includes(type))
}