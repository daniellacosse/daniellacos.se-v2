function addToStorage(data = window._RUNTIME_DATA_) {
  whileInObject(data, (key) => {
    sessionStorage.setItem(key, JSON.stringify(data[key]))
  })
}

function removeFromStorage(keys = []) {
  whileInList(keys, (key) => {
    sessionStorage.setItem(key, null)
  })
}
