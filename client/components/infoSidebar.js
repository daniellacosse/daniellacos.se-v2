///\\\///\\\ InfoSidebar - CloseButton ///\\\///\\\
const INFO_CLOSE_BUTTON_STYLE = {
  position: "absolute",
  top: "20px",
  right: "20px",
  color: "white"
}

// function closeClicked() {
//   alert("clicked")
// }

function $renderCloseButton() {
  return $createElement({
    name: "button",
    id: "InfoSidebar-closeButton",
    text: "<",
    style: INFO_CLOSE_BUTTON_STYLE,
    // onclick: "closeClicked()"
  })
}

///\\\///\\\ InfoSidebar ///\\\///\\\
const INFO_SIDEBAR_STYLE = {
  height: "100%",
  width: "75px",
  background: "green",
  position: "relative"
}

function $renderInfoSidebar() {
  return $createElement({
    name: "header",
    id: "InfoSidebar",
    style: INFO_SIDEBAR_STYLE,
    children: [ $renderCloseButton() ]
  })
}
