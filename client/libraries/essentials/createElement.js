function $createElement(properties) {
  const { name, id } = properties

  if (!window._COMPONENT_REGISTRY_)
    window._COMPONENT_REGISTRY_ = {};

  window._COMPONENT_REGISTRY_[id] = document.createElement(name || "div");

  return $changeElement(id, properties)
}

function $createIcon(iconName, properties = {}) {
  return $createElement({
    ...properties,
    ...{
      name: "i",
      class: `icon-${iconName}`
    }
  })
}

function $createList() {
  // ul
  // li
  // li.map(liTemplate)
  // updateList(list of things)
}

function $createInput() {

}
