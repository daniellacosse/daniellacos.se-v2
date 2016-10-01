function $createElement(properties) {
  const { name } = properties

  return $changeElement(
    document.createElement(name || "div"), properties
  )
}

function $createIcon(iconName, style = {}) {
  return $createElement({
    name: "i",
    text: retrieve("fontIcons")[iconName],
    style: Object.assign(style, {
      "font-family": "daniellacosse-icons",
      "font-style": "normal"
    })
  })
}

function $createList() {
  
}
