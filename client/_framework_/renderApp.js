function $renderApp(contents) {
  const mainContainer = $createElement({
    name: "article",
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
