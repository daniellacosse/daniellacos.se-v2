function $changeElement(id, delta) {
  const { innerHTML, text, children } = delta;
  if (!window._COMPONENT_STYLE_REGISTRY_)
    window._COMPONENT_STYLE_REGISTRY_ = {}

  if (
    innerHTML && text ||
    innerHTML && children ||
    text && children
  ) {
    console.warn("It is not recommended to change the innerHTML/text/children in the same call to $changeElement")
  }

  let element = window._COMPONENT_REGISTRY_[id]
  let elementStyle = window._COMPONENT_STYLE_REGISTRY_[id] || {}
  let _keys = Object.keys(delta)
  let _len = _keys.length

  while(_len--) {
    const key = _keys[_len]

    switch (key) {
      case "style":
        const styleDelta = delta["style"]
        const currentStyleKeys = Object.keys(elementStyle)

        const mergedStyle = { ...currentStyleKeys, ...styleDelta }
        const styleKeys = Object.keys(mergedStyle)

        let styleString = ""
        let _len3 = styleKeys.length

        while(_len3--) {
          const key = styleKeys[_len3]
          const style = mergedStyle[key]

          styleString += `${key}:${style};`
        }

        window._COMPONENT_STYLE_REGISTRY_[id] = mergedStyle;

        element.setAttribute("style", styleString)
        break
      case "text":
        const textNode = document.createTextNode(delta["text"])

        element.innerHTML = ""
        element.appendChild(textNode)
        break
      case "innerHTML":
        element.innerHTML = delta["innerHTML"]
        break
      case "children":
        element.innerHTML = ""
        element = $insertElements(element, delta["children"])
        break
      default:
        element.setAttribute(key, delta[key])
        break
    }
  }

  window._COMPONENT_REGISTRY_[id] = element

  return element
}

function $changeElements(idHash = {}) {
  const elementIDs = Object.keys(idHash)

  let _len = elementIDs.length
  while(_len--) {
    const id = elementIDs[_len]
    const delta = idHash[id]

    $changeElement(id, delta)
  }
}
