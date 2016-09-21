const DETAIL_PANEL_STYLE = {
  width: "100%",
  height: "100%",
  background: "blue"
}

function $renderDetailPanel() {
  return $createElement({
    name: "section",
    text: "Hello World!",
    style: DETAIL_PANEL_STYLE
  })
}
