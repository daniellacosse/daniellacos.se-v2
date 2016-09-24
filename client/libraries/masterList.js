///\///\ MasterList - KEYS ///\///\\
const MASTER_LIST_ID = "MasterList"
const MASTER_LIST_COLLAPSE_BUTTON_ID = `${MASTER_LIST_ID}-collapseButton`
const MASTER_LIST_NAVIGATION_ID = `${MASTER_LIST_ID}-articleListNavigation`

const MASTER_LIST_IS_CLOSED_KEY = `${MASTER_LIST_ID}-isClosed`
const MASTER_LIST_ACTIVE_DOCUMENT_KEY = `${MASTER_LIST_ID}-activeDocumentIndex`

///\\\////\\\ MasterList ///\\\///\\\
const MASTER_LIST_STYLE = {
  "flex-shrink": "1",
  "height": "100%",
  "max-width": "210px",
  "min-width": "210px",
  "position": "relative",
  "box-shadow": "-3px 0px 8px 1px rgba(0, 0, 0, 0.2)",
  "background": "rgba(255, 255, 255, 0.75)",
  "transform": "rotate(0)",
  "transition": `all ${DASE_DURATION} ${DASE_BEZIER}`
}

const MASTER_LIST_STYLE$CLOSED = Object.assign({}, MASTER_LIST_STYLE,
  {
    "max-width": "0px",
    "min-width": "0px"
  }
)

function $renderMasterList() {
  const style = retrieve(MASTER_LIST_IS_CLOSED_KEY)
    ? MASTER_LIST_STYLE$CLOSED
    : MASTER_LIST_STYLE

  return $createElement({
    name: "nav",
    id: MASTER_LIST_ID,
    style, children: [
      $renderMasterListNavigation()
    ]
  })
}

function $renderMasterListNavigation() {
  const documents = retrieveDocuments()

  return $createElement({
   name: "ul",
   id: MASTER_LIST_NAVIGATION_ID,
   style: {
     "height": "100%",
     "overflow-y": "scroll"
   },
   children: documents.map($renderMasterListItem)
 })
}

///\\\///\\\ MasterList - ACTIONS ///\\\///\\\
function collapseMasterList() {
  addToStorage({ [MASTER_LIST_IS_CLOSED_KEY]: true })

  $changeElementsByID({
    [MASTER_LIST_ID]: { style: MASTER_LIST_STYLE$CLOSED },
    [MASTER_LIST_COLLAPSE_BUTTON_ID]: MASTER_LIST_PROPERTIES$CLOSED
  })
}

function openMasterList() {
  addToStorage({ [MASTER_LIST_IS_CLOSED_KEY]: false })

  $changeElementsByID({
    [MASTER_LIST_ID]: { style: MASTER_LIST_STYLE },
    [MASTER_LIST_COLLAPSE_BUTTON_ID]: MASTER_LIST_PROPERTIES$OPEN
  })
}

function setActiveDocument(documentIndex) {
  const activeDocument = retrieveDocuments()[documentIndex]

  addToStorage({ [MASTER_LIST_ACTIVE_DOCUMENT_KEY]: documentIndex })

  $changeElementsByID({
    [DETAIL_PANEL_ID]: { children: $renderDetailPanelActiveDocument() },
    [MASTER_LIST_ID]: {
      children: [
        $renderMasterListNavigation()
      ]
    }
  })

  collapseMasterList();
}

///\\\///\\\ MasterList - ListItem ///\\\///\\\
const LIST_ITEM_STYLE = {
  "padding": "5px 10px",
  "width": "100%",
  "max-width": "210px",
  "min-width": "210px",
  "height": "60px",
  "overflow": "hidden",
  "cursor": "pointer",
  "position": "relative",
  "border-bottom": "1px solid black",
  "font-size": "12px",
  "font-weight": "bold",
  "text-overflow": "ellipsis"
}

const LIST_ITEM_STYLE$ACTIVE = Object.assign({}, LIST_ITEM_STYLE, {
  "background": DASE_GREEN,
  "color": "white",
  "cursor": "initial"
})

function $renderMasterListItem({ title, type, date }, index) {
  const activeDocumentKey = retrieve(MASTER_LIST_ACTIVE_DOCUMENT_KEY) || 0
  const isActiveProperties = (activeDocumentKey === index)
    ? { style: LIST_ITEM_STYLE$ACTIVE }
    : {
      style: LIST_ITEM_STYLE,
      onMouseOver: `this.style.background='${DASE_GREEN}'; this.style.color='white'`,
      onMouseOut: "this.style.background='transparent'; this.style.color='initial'",
      onClick: `setActiveDocument(${index})`
    }

  return $createElement(
    Object.assign(
      {},
      isActiveProperties,
      {
        name: "li",
        children: [
          $createElement({
            style: {
              "display": "flex",
              "align-items": "center",
              "margin-top": "-13px"
            },
            children: [
              $createIcon(type, { "padding-right": "5px" }),
              $createElement({
                name: "b",
                text: title
              })
            ]
          }),
          $createElement({
            name: "time",
            text: new Date(date).toLocaleDateString(),
            style: {
              "opacity": "0.5",
              "font-weight": "normal",
              "position": "absolute",
              "bottom": "7px",
              "left": "10px"
            }
          })
        ]
      }
    )
  )
}

///\\\///\\\ MasterList - CollapseButton ///\\\///\\\
const MASTER_LIST_COLLAPSE_BUTTON_STYLE = {
  "position": "absolute",
  "top": "0px",
  "left": "0px",
  "padding": "15px",
  "cursor": "pointer",
  "font-size": "16px",
  "opacity": "0.25",
  "color": DASE_GREEN,
  "transform": "rotate(0)",
  "transition": `all ${DASE_DURATION} ${DASE_BEZIER}`
}

const MASTER_LIST_COLLAPSE_BUTTON_STYLE$HOVER = Object.assign({},
  MASTER_LIST_COLLAPSE_BUTTON_STYLE,
  {
    "opacity": "1"
  }
)

const MASTER_LIST_COLLAPSE_BUTTON_STYLE$HOVER$CLOSED = Object.assign({},
  MASTER_LIST_COLLAPSE_BUTTON_STYLE$HOVER,
  {
    "padding": "15px 10px 15px 20px"
  }
)

const MASTER_LIST_COLLAPSE_BUTTON_STYLE$HOVER$OPEN = Object.assign({},
  MASTER_LIST_COLLAPSE_BUTTON_STYLE$HOVER,
  {
    "padding": "15px 20px 15px 10px"
  }
)

function $masterListCollapseButtonClosedMouseOver() {
  $changeElementByID(
    MASTER_LIST_COLLAPSE_BUTTON_ID,
    {
      style: MASTER_LIST_COLLAPSE_BUTTON_STYLE$HOVER$CLOSED
    }
  )
}

function $masterListCollapseButtonOpenMouseOver() {
  $changeElementByID(
    MASTER_LIST_COLLAPSE_BUTTON_ID,
    {
      style: MASTER_LIST_COLLAPSE_BUTTON_STYLE$HOVER$OPEN
    }
  )
}

function $masterListCollapseButtonMouseOut() {
  $changeElementByID(
    MASTER_LIST_COLLAPSE_BUTTON_ID,
    {
      style: MASTER_LIST_COLLAPSE_BUTTON_STYLE
    }
  )
}

const MASTER_LIST_PROPERTIES$CLOSED = {
  text: "▶",
  onClick: "openMasterList()",
  style: MASTER_LIST_COLLAPSE_BUTTON_STYLE,
  onMouseOver: "$masterListCollapseButtonClosedMouseOver()",
  onMouseOut: "$masterListCollapseButtonMouseOut()"
}

const MASTER_LIST_PROPERTIES$OPEN = {
  text: "◀",
  onClick: "collapseMasterList()",
  style: MASTER_LIST_COLLAPSE_BUTTON_STYLE,
  onMouseOver: "$masterListCollapseButtonOpenMouseOver()",
  onMouseOut: "$masterListCollapseButtonMouseOut()"
}



function $renderMasterListCollapseButton() {
  const isClosedProperties = retrieve(MASTER_LIST_IS_CLOSED_KEY)
    ? MASTER_LIST_PROPERTIES$CLOSED
    : MASTER_LIST_PROPERTIES$OPEN

  return $createElement(Object.assign({}, isClosedProperties, {
    name: "button",
    id: MASTER_LIST_COLLAPSE_BUTTON_ID,
    style: MASTER_LIST_COLLAPSE_BUTTON_STYLE,
  }))
}
