function addToStorage(data = window._RUNTIME_DATA_, isForced) {
  const dataKeys = Object.keys(data)

  let _len = dataKeys.length
  while (_len--) {
    const key = dataKeys[_len]

    if (!sessionStorage.getItem(key) || isForced)
      sessionStorage.setItem(key, JSON.stringify(data[key]))
  }
}
