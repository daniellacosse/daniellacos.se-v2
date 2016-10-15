function $insertElements(parent, children) {
  whileInList(children, (child) => parent.appendChild(child))

  return parent
}
