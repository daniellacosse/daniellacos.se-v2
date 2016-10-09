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

function retrieveDocuments() {
  return retrieve("documents") || []
}

function retrieveActiveDocumentIndex() {
  return retrieve(MASTER_LIST_ACTIVE_DOCUMENT_KEY) || 0
}

function retrieveActiveDocument() {
  const activeIndex = retrieveActiveDocumentIndex()

  return retrieveDocuments()[activeIndex] || {}
}
