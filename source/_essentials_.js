///\\\///\\\ MAIN RESOURCES ///\\\///\\\
function $createElement(properties) {
  const { name } = properties

  let element = document.createElement(name || "div")
  let _keys = Object.keys(properties)
  let _len = _keys.length

  while(_len--) {
    const key = _keys[_len]

    switch (key) {
      case "class":
      case "className":
        element.setAttribute("className", properties[key])
        break
      case "style":
        const styleObject = properties["style"]
        const styleKeys = Object.keys(styleObject)

        let styleString = ""
        let _len2 = styleKeys.length

        while(_len2--) {
          const key = styleKeys[_len2]
          const style = styleObject[key]

          styleString += `${key}:${style};`
        }

        element.setAttribute("style", styleString)
        break
      case "text":
        const textNode = document.createTextNode(properties["text"])

        element.appendChild(textNode)
        break
      case "children":
        element = $insertElements(element, properties["children"])
        break
      default:
        element.setAttribute(key, properties[key])
        break
    }
  }

  return element
}

function $insertElements(parent, children) {
  let _len = children.length

  while(_len--) {
    const childElement = children[_len]

    parent.insertBefore(childElement, children[_len + 1])
  }

  return parent
}

function $renderAppView(contents) {
  const mainContainer = $createElement({
    name:  "article",
    id: "daniellacos.se-app",
    children: contents,
    style: {
      width: "100%",
      height: "100%",
      display: "flex"
    }
  })

  document.body.appendChild(mainContainer)
}

function addToStorage(data = window._RUNTIME_DATA_) {
  window.sessionStorage = Object.assign({}, window.sessionStorage, data)
}

///\\\///\\\ MAIN SCRIPT ///\\\///\\\
console.log("daniellacos.se v2.0.0");

addToStorage();
