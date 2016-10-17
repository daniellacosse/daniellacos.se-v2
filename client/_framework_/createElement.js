function locateFreeRegistrySlot(properties = {}) {
  let keyHash;
  let testKey;
  let activeRegistrySlot = "INVALID";
  let registryString = ""

  const resetSlotAttempt = () => {
    keyHash = Math.floor(Math.random() * 10000)
      .toString(16)
    testKey = `${registryString}${keyHash}`
    activeRegistrySlot = window._COMPONENT_REGISTRY_[testKey]
  }

  if (properties.name)
    registryString += `${properties.name || "div"}-`
  if (properties.class)
    registryString += `${properties.class}-`

  while (!!activeRegistrySlot)
    resetSlotAttempt()

  return testKey
}

function $createElement(properties) {
  let { name, id } = properties

  if (!window._COMPONENT_REGISTRY_)
    window._COMPONENT_REGISTRY_ = {};

  if (!id)
    id = locateFreeRegistrySlot(properties)

  window._COMPONENT_REGISTRY_[id] =
    document.createElement(name || "div");

  return $changeElement(id, properties)
}

function $createIcon(iconName, properties = {}) {
  return $createElement({
    ...properties,
    name: "i",
    class: `icon icon-${iconName}`
  })
}
