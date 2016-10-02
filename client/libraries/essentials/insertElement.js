function $insertElements(parent, children) {
  let _len = children.length

  while (_len--) {
    const childElement = children[_len]

    parent.insertBefore(childElement, children[_len + 1])
  }

  return parent
}
