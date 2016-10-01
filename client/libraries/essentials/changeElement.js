function $changeElement(element, delta) {
  if (
    delta.innerHTML && delta.text ||
    delta.innerHTML && delta.children ||
    delta.text && delta.children
  ) {
    console.warn("It is not recommended to change the innerHTML/text/children in the same call to $changeElement")
  }

  let _keys = Object.keys(delta)
  let _len = _keys.length

  while(_len--) {
    const key = _keys[_len]

    switch (key) {
      case "class":
      case "className":
        element.setAttribute("className", delta[key])
        break
      case "style":
        const styleObject = delta["style"]
        const currentStyle = element.style
        const currentStyleKeys = Object.keys(currentStyle)

        let validCurrentStyle = {}
        let _len2 = currentStyleKeys.length

        while(_len2--) {
          const key = currentStyleKeys[_len2]
          const style = currentStyle[key]

          if (style && style != " ")
            validCurrentStyle[key] = style
        }

        const mergedStyle = Object.assign(
          {}, validCurrentStyle, styleObject
        )
        const styleKeys = Object.keys(mergedStyle)

        let styleString = ""
        let _len3 = styleKeys.length

        while(_len3--) {
          const key = styleKeys[_len3]
          const style = mergedStyle[key]

          styleString += `${key}:${style};`
        }

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

  return element
}

function $changeElementByID(elementID, delta) {
  const element = document.getElementById(elementID)

  return $changeElement(element, delta)
}

function $changeElementsByID(IDHash) {
  const elementIDs = Object.keys(IDHash)

  let _len = elementIDs.length
  while(_len--) {
    const ID = elementIDs[_len]
    const delta = IDHash[ID]

    $changeElementByID(ID, delta)
  }
}
