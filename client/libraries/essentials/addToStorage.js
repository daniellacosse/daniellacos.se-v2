function addToStorage(data = window._RUNTIME_DATA_) {
  const dataKeys = Object.keys(data)

  let _len = dataKeys.length
  while (_len--) {
    const key = dataKeys[_len]
    sessionStorage.setItem(key, JSON.stringify(data[key]))
  }
}
