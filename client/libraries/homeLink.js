const HOME_LINK_ID = "HomeLink";
const HOME_LINK_STYLE = {
  "background-size": "cover",
  "background-position": "center",
  "border-radius": "100%",
  "width": "35px",
  "height": "35px",
  "position": "absolute",
  "bottom": "11px",
  "left": "49%",
  "transform": "translateX(-50%)",
  "opacity": "0.7",
  "transition": `opacity ${DASE_DURATION} ${DASE_BEZIER}`,
  "border": "1px solid white"
}

function $renderHomeLink() {
  return $createElement({
    name: "a",
    href: "/",
    id: HOME_LINK_ID,
    style: Object.assign(
      HOME_LINK_STYLE,
      { "background-image": `url(${retrieve("avatarURL")})` }
    ),
    onMouseOver: "this.style.opacity='1'",
    onMouseOut: "this.style.opacity='0.7'"
  })
}
