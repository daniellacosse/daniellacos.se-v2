///\///\ InfoSidebar - KEYS ///\///\\
const INFO_SIDEBAR_ID = "InfoSidebar";
const INFO_SIDEBAR_Z_INDEX = "1";
const INFO_SIDEBAR_TOGGLE_LIST_ID = `${INFO_SIDEBAR_ID}-toggleList`;
const INFO_SIDEBAR_TOGGLE_FILTER_LIST_KEY = `"${INFO_SIDEBAR_ID}-filters`;

///\///\ InfoSidebar - PROPERTIES ///\///\\
const INFO_SIDEBAR_STYLE = {
  "height": "100%",
  "min-width": "60px",
  "max-width": "60px",
  "position": "relative",
  "box-flex": "0",
  "flex-shrink": "1",
  "z-index": INFO_SIDEBAR_Z_INDEX
}

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
  "filter": "drop-shadow(0px 0px 0px rgba(255, 255, 255, 0))",
  "transition": `opacity ${DASE_DURATION} ${DASE_BEZIER}, filter ${DASE_DURATION} ${DASE_BEZIER}`
}

const FILTER_TOGGLE_ICON_STYLE$HOVER = {
  ...FILTER_TOGGLE_ICON_STYLE,
  "opacity": "1"
}

const FILTER_TOGGLE_ICON_STYLE$ACTIVE = {
  ...FILTER_TOGGLE_ICON_STYLE,
  "opacity": "1",
  "filter": "drop-shadow(0px 0px 7px rgba(255, 255, 255, 0.8))"
}

const FILTER_TOGGLE_ICON_PROPERTIES = (iconID = "") => ({
  style: FILTER_TOGGLE_ICON_STYLE,
  onClick: `activateFilterToggle("${iconID}")`,
  onMouseOver: `enterToggleIcon("${iconID}")`,
  onMouseOut: `exitToggleIcon("${iconID}")`
})

const FILTER_TOGGLE_ICON_PROPERTIES$ACTIVE = (iconID) => ({
  style: FILTER_TOGGLE_ICON_STYLE$ACTIVE,
  onClick: `deactivateFilterToggle("${iconID}")`,
  onMouseOver: `enterToggleIcon("${iconID}", true)`,
  onMouseOut: `exitToggleIcon("${iconID}", true)`
})

const FILTER_TOGGLE_TOOLTIP_STYLE = {
  "font-size": "16px",
  "font-weight": "bold",
  "position": "absolute",
  "top": "-4px",
  "left": "100%",
  "background": "#0d3622",
  "color": "white",
  "display": "block",
  "pointer-events": "none",
  "border-top-right-radius": "10px",
  "border-bottom-right-radius": "10px",
  "padding": "0 15px 3px 5px",
  "opacity": "0",
  "transform": "translateY(50%)",
  "transition": `all ${DASE_DURATION} ${DASE_BEZIER} 50ms`
}

const TOGGLE_TOOLTIP_TRIANGLE_SIZE = 11
const TOGGLE_TOOLTIP_TRIANGLE_STYLE = {
  "width": "0",
  "height": "0",
  "position": "absolute",
  "left": `-${TOGGLE_TOOLTIP_TRIANGLE_SIZE * 2}px`,
  "top": "0",
  "border-left": `${TOGGLE_TOOLTIP_TRIANGLE_SIZE}px solid transparent`,
  "border-top": `${TOGGLE_TOOLTIP_TRIANGLE_SIZE}px solid transparent`,
  "border-bottom": `${TOGGLE_TOOLTIP_TRIANGLE_SIZE}px solid transparent`,
  "border-right": `${TOGGLE_TOOLTIP_TRIANGLE_SIZE}px solid #0d3622`
}

const FILTER_TOGGLE_TOOLTIP_STYLE$HOVER = {
  ...FILTER_TOGGLE_TOOLTIP_STYLE,
  "opacity": "1",
  "left": "calc(100% + 20px)"
}

const INFO_SIDEBAR_TOGGLE_LIST_STYLE = {
  "margin-top": "15px"
}

///\///\ InfoSidebar - ACTIONS ///\///\\
function enterToggleIcon(iconID, isActive) {
  const tooltipID = `${iconID}-tooltip`

  $changeElements({
    [iconID]: isActive ? {} : {
      style: FILTER_TOGGLE_ICON_STYLE$HOVER,
    },
    [tooltipID]: {
      style: FILTER_TOGGLE_TOOLTIP_STYLE$HOVER
    }
  })
}

function exitToggleIcon(iconID, isActive) {
  const tooltipID = `${iconID}-tooltip`

  $changeElements({
    [iconID]: isActive ? {} : {
      style: FILTER_TOGGLE_ICON_STYLE,
    },
    [tooltipID]: {
      style: FILTER_TOGGLE_TOOLTIP_STYLE
    }
  })
}

function activateFilterToggle(iconID) {
  const tooltipID = `${iconID}-tooltip`

  let activeFilters = retrieve(INFO_SIDEBAR_TOGGLE_FILTER_LIST_KEY) || []

  activeFilters.push(iconID.split(":")[1])

  addToStorage({
    [INFO_SIDEBAR_TOGGLE_FILTER_LIST_KEY]: activeFilters
  })

  $changeElements({
    [iconID]: FILTER_TOGGLE_ICON_PROPERTIES$ACTIVE(iconID),
    [tooltipID]: {
      style: FILTER_TOGGLE_TOOLTIP_STYLE
    }
  })

  refreshListAndDetailContent()
  openMasterList()
}

function deactivateFilterToggle(iconID) {
  const tooltipID = `${iconID}-tooltip`
  const iconIDType = iconID.split(":")[1]
  const activeFilters = retrieve(INFO_SIDEBAR_TOGGLE_FILTER_LIST_KEY)

  addToStorage({
    [INFO_SIDEBAR_TOGGLE_FILTER_LIST_KEY]: activeFilters
      .filter(typeInList => typeInList !== iconIDType)
  })

  $changeElements({
    [iconID]: FILTER_TOGGLE_ICON_PROPERTIES(iconID),
    [tooltipID]: {
      style: FILTER_TOGGLE_TOOLTIP_STYLE
    }
  })

  refreshListAndDetailContent()
  openMasterList()
}

///\\\///\\\ InfoSidebar ///\\\///\\\
function $renderInfoSidebar() {
  return $createElement({
    name: "header",
    id: INFO_SIDEBAR_ID,
    style: INFO_SIDEBAR_STYLE,
    children: [
      $renderInfoFilterToggleList(),
      $renderHomeLink()
    ]
  })
}

///\///\ InfoSidebar - FilterToggleList ///\///\\
function $renderInfoFilterToggleList() {
  return $createElement({
    name: "ul",
    id: INFO_SIDEBAR_TOGGLE_LIST_ID,
    style: INFO_SIDEBAR_TOGGLE_LIST_STYLE,
    children: [
      // $renderInfoToggleIcon("star", "favorites"),
      $renderInfoToggleIcon("text"),
      $renderInfoToggleIcon("gallery"),
      $renderInfoToggleIcon("media"),
      $renderInfoToggleIcon("code")
    ]
  })
}

///\///\ InfoSidebar - FilterToggles ///\///\\
function $renderInfoToggleIcon(type, typeOverride) {
  const iconID = `${INFO_SIDEBAR_ID}-toggleIcon:${type}`
  const tooltipID = `${iconID}-tooltip`
  const filters = retrieve(INFO_SIDEBAR_TOGGLE_FILTER_LIST_KEY) || []
  const iconProperties = filters.includes(iconID.split(":")[1]) ?
    FILTER_TOGGLE_ICON_PROPERTIES$ACTIVE(iconID) :
    FILTER_TOGGLE_ICON_PROPERTIES(iconID)

  return $createElement({
    name: "li",
    children: [
      $createIcon(type, {...iconProperties,
        id: iconID
      }),
      $createElement({
        id: tooltipID,
        style: FILTER_TOGGLE_TOOLTIP_STYLE,
        children: [
          $createElement({
            style: TOGGLE_TOOLTIP_TRIANGLE_STYLE
          }),
          $createElement({
            name: "span",
            text: typeOverride || type
          })
        ]
      })
    ],
    style: FILTER_TOGGLE_STYLE
  })
}
