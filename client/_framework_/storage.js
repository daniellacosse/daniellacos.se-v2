function addToStorage(data = window._RUNTIME_DATA_) {
  whileInObject(data, (key, value) => {
    if (key === "documents")
      return addDocumentsToStorage(value)

    sessionStorage.setItem(key, JSON.stringify(value))
  })
}

function removeFromStorage(keys = []) {
  whileInList(keys, (key) => {
    sessionStorage.setItem(key, null)
  })
}

function addDocumentsToStorage(documents) {
  let documentDictionary = {};
  let documentListOrder = [];

  whileInList(documents, (doc) => {
    documentListOrder.push(doc.id);
    documentDictionary[doc.id] = doc;
  })

  addToStorage({
    documentDictionary,
    documentListOrder
  })
}
