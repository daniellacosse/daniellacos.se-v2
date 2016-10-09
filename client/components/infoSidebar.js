///\///\ InfoSidebar - ACTIONS ///\///\\
function openToggleIcon(iconID) {
  const tooltipID = `${iconID}-tooltip`

  $changeElements({
    [iconID]: {
      style: FILTER_TOGGLE_ICON_STYLE$HOVER,
    },
    [tooltipID]: {
      style: FILTER_TOGGLE_TOOLTIP_STYLE$HOVER
    }
  })
}

function closeToggleIcon(iconID) {
  const tooltipID = `${iconID}-tooltip`

  $changeElements({
    [iconID]: {
      style: FILTER_TOGGLE_ICON_STYLE,
    },
    [tooltipID]: {
      style: FILTER_TOGGLE_TOOLTIP_STYLE
    }
  })
}

///\\\///\\\ InfoSidebar ///\\\///\\\
const INFO_SIDEBAR_ID = "InfoSidebar";
const INFO_SIDEBAR_STYLE = {
  "height": "100%",
  "min-width": "60px",
  "max-width": "60px",
  "position": "relative",
  "box-flex": "0",
  "flex-shrink": "1"
}

function $renderInfoSidebar() {
  return $createElement({
    name: "header",
    id: INFO_SIDEBAR_ID,
    style: INFO_SIDEBAR_STYLE,
    children: [
      // $renderInfoFilterToggleList(),
      $renderHomeLink()
    ]
  })
}

///\///\ InfoSidebar - FilterToggleList ///\///\\
const INFO_SIDEBAR_TOGGLE_LIST_ID = `${INFO_SIDEBAR_ID}-toggleList`;
const INFO_SIDEBAR_TOGGLE_LIST_STYLE = {
  "margin-top": "15px"
}

function $renderInfoFilterToggleList() {
  return $createElement({
    name: "ul",
    id: INFO_SIDEBAR_TOGGLE_LIST_ID,
    style: INFO_SIDEBAR_TOGGLE_LIST_STYLE,
    children: [
      $renderInfoToggleIcon("star", "favorites"),
      $renderInfoToggleIcon("text"),
      $renderInfoToggleIcon("gallery"),
      $renderInfoToggleIcon("media"),
      $renderInfoToggleIcon("code")
    ]
  })
}

///\///\ InfoSidebar - FilterToggles ///\///\\
const FILTER_TOGGLE_STYLE = {
  "cursor": "pointer",
  "color": "white",
  "position": "relative",
  "display": "block",
  "text-align": "center",
  "margin-bottom": "15px",
  "right": "1px"
}

const FILTER_TOGGLE_ICON_STYLE = {
  "font-size": "35px",
  "opacity": "0.5",
  "padding": "10px",
  "cursor": "pointer",
  "transform": "rotateZ(0)",
  "transition": `opacity ${DASE_DURATION} ${DASE_BEZIER}`
}

const FILTER_TOGGLE_ICON_STYLE$HOVER = {
  ...FILTER_TOGGLE_ICON_STYLE,
  "opacity": "1"
}

// TODO: obscuring tooltip bug
const FILTER_TOGGLE_TOOLTIP_STYLE = {
  "font-size": "16px",
  "font-weight": "bold",
  "position": "absolute",
  "top": "0",
  "left": "100%",
  "background": "#0d3622",
  "color": "white",
  "display": "block",
  "border-radius": "10px",
  "padding": "0 15px",
  "opacity": "0",
  "transform": "translateY(50%)",
  "transition": `all ${DASE_DURATION} ${DASE_BEZIER} 50ms`
}

const FILTER_TOGGLE_TOOLTIP_STYLE$HOVER = {
  ...FILTER_TOGGLE_TOOLTIP_STYLE,
  "opacity": "1",
  "left": "calc(100% + 10px)"
}

function $renderInfoToggleIcon(type, typeText) {
  const iconID = `${INFO_SIDEBAR_ID}-toggleIcon:${type}`
  const tooltipID = `${iconID}-tooltip`

  return $createElement({
    name: "li",
    children: [
      $createIcon(type, {
        id: iconID,
        style: FILTER_TOGGLE_ICON_STYLE,
        onMouseOver: `openToggleIcon("${iconID}")`,
        onMouseOut: `closeToggleIcon("${iconID}")`
      }),
      $createElement({
        id: tooltipID,
        text: typeText || type,
        style: FILTER_TOGGLE_TOOLTIP_STYLE
      })
    ],
    style: FILTER_TOGGLE_STYLE
  })
}
