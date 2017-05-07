function $changeElement(id, delta) {
  if (!window._COMPONENT_STYLE_REGISTRY_)
    window._COMPONENT_STYLE_REGISTRY_ = {}

  const { innerHTML, text, children } = delta;
  if (
    innerHTML && text ||
    innerHTML && children ||
    text && children
  ) {
    console.warn(
      "It is not recommended to change the innerHTML/text/children in the same call to $changeElement"
    )
  }

  let element = window._COMPONENT_REGISTRY_[id]
  let elementStyle = window._COMPONENT_STYLE_REGISTRY_[id] || {}
  whileInObject(delta, (key, value) => {
    switch (key) {
    case "style":
      const mergedStyle = {
        ...elementStyle,
        ...value
      }

      let styleString = ""
      whileInObject(mergedStyle, (prop, style) => {
        styleString += `${prop}:${style};`
      })

      window._COMPONENT_STYLE_REGISTRY_[id] = mergedStyle;

      element.setAttribute("style", styleString)
      break
    case "text":
      const textNode = document.createTextNode(value)

      element.innerHTML = ""
      element.appendChild(textNode)
      break
    case "innerHTML":
      element.innerHTML = value
      break
    case "children":
      element.innerHTML = ""
      element = $insertElements(element, value)
      break
    default:
      element.setAttribute(key, value)
      break
    }
  })

  window._COMPONENT_REGISTRY_[id] = element

  return element
}

function $changeElements(idHash = {}) {
  whileInObject(idHash, $changeElement)
}

function $insertElements(parent, children) {
  whileInList(children, (child) => parent.appendChild(child))

  return parent
}