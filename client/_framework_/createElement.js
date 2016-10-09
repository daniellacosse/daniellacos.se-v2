function locateFreeRegistrySlot(properties = {}) {
  let registryString = ""

  if (properties.name) registryString += `${properties.name || "div"}-`
  if (properties.class) registryString += `${properties.class}-`

  let keyNumber = 0
  let testKey = `${registryString}${keyNumber}`
  let activeRegistrySlot = window._COMPONENT_REGISTRY_[testKey]

  while (!!activeRegistrySlot) {
    keyNumber++
    testKey = `${registryString}${keyNumber}`
    activeRegistrySlot = window._COMPONENT_REGISTRY_[testKey]
  }

  return testKey
}

function $createElement(properties) {
  let {
    name,
    id
  } = properties

  if (!window._COMPONENT_REGISTRY_)
    window._COMPONENT_REGISTRY_ = {};

  if (!id)
    id = locateFreeRegistrySlot(properties)

  window._COMPONENT_REGISTRY_[id] = document.createElement(name || "div");

  return $changeElement(id, properties)
}

function $createIcon(iconName, properties = {}) {
  return $createElement({
    ...properties,
    name: "i",
    class: `icon icon-${iconName}`
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
