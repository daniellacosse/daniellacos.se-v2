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

function retrieveActiveDocument() {
  const activeIndex = retrieve(MASTER_LIST_ACTIVE_DOCUMENT_KEY) || 0

  return retrieveDocuments()[activeIndex] || {}
}
