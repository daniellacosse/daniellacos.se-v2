const APPLICATION_STYLE = {
  width: "100%",
  height: "100%",
  display: "flex"
}

function $renderApp(contents) {
  const mainContainer = $createElement({
    name: "article",
    id: "daniellacos.se-app",
    children: contents,
    style: APPLICATION_STYLE
  })

  document.body.appendChild(mainContainer)
}