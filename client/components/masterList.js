///\///\ MasterList - KEYS ///\///\\
const MASTER_LIST_ID = "MasterList"
const MASTER_LIST_COLLAPSE_BUTTON_ID = `${MASTER_LIST_ID}-collapseButton`
const MASTER_LIST_NAVIGATION_ID = `${MASTER_LIST_ID}-articleListNavigation`

const MASTER_LIST_IS_CLOSED_KEY = `${MASTER_LIST_ID}-isClosed`
const MASTER_LIST_ACTIVE_DOCUMENT_KEY = `${MASTER_LIST_ID}-activeDocumentId`
const MASTER_LIST_VISIBLE_DOCUMENTS_KEY =
  `${MASTER_LIST_ID}-visibleDocumentsList`

///\///\ MasterList - PROPERTIES ///\///\\
const MASTER_LIST_STYLE = {
  "flex-shrink": "1",
  "height": "100%",
  "max-width": "210px",
  "min-width": "210px",
  "position": "relative",
  "box-shadow": "-3px 0px 8px 1px rgba(0, 0, 0, 0.2)",
  "background": "rgba(255, 255, 255, 0.75)",
  "transition": `all ${DASE_DURATION} ${DASE_BEZIER}`
}

const MASTER_LIST_STYLE$CLOSED = {
  ...MASTER_LIST_STYLE,
  ... {
    "max-width": "0px",
    "min-width": "0px"
  }
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

const MASTER_LIST_COLLAPSE_BUTTON_STYLE = {
  "position": "sticky",
  "top": "0px",
  "left": "0px",
  "padding": "24px",
  "cursor": "pointer",
  "font-size": "18px",
  "opacity": "0.25",
  "color": DASE_GREEN,
  "transition": `all ${DASE_DURATION} ${DASE_BEZIER}`
}

const MASTER_LIST_COLLAPSE_BUTTON_STYLE$HOVER = {
  ...MASTER_LIST_COLLAPSE_BUTTON_STYLE,
  "opacity": "1"
}

const MASTER_LIST_COLLAPSE_BUTTON_STYLE$HOVER$CLOSED = {
  ...MASTER_LIST_COLLAPSE_BUTTON_STYLE$HOVER,
  "padding": "24px 19px 24px 29px"
}

const MASTER_LIST_COLLAPSE_BUTTON_STYLE$HOVER$OPEN = {
  ...MASTER_LIST_COLLAPSE_BUTTON_STYLE$HOVER,
  "padding": "24px 29px 24px 19px"
}

const LIST_ITEM_STYLE = {
  "padding": "5px 10px",
  "width": "100%",
  "max-width": "210px",
  "min-width": "210px",
  "height": "60px",
  "margin": "0",
  "overflow": "hidden",
  "cursor": "pointer",
  "position": "relative",
  "display": "flex",
  "align-items": "center",
  "border-bottom": "1px solid black",
  "font-size": "12px",
  "font-weight": "bold",
  "text-overflow": "ellipsis"
}

const LIST_ITEM_STYLE$ACTIVE = {
  ...LIST_ITEM_STYLE,
  ... {
    "background": DASE_GREEN,
    "color": "white",
    "cursor": "initial"
  }
}

const LIST_ITEM_PROPERTIES = {
  style: LIST_ITEM_STYLE,
  onMouseOver: `this.style.background='${DASE_GREEN}'; this.style.color='white'`,
  onMouseOut: "this.style.background='transparent'; this.style.color='initial'",
}

const LIST_ITEM_PROPERTIES$ACTIVE = {
  style: LIST_ITEM_STYLE$ACTIVE
}

///\\\///\\\ MasterList - ACTIONS ///\\\///\\\
function $masterListCollapseButtonClosedMouseOver() {
  $changeElement(
    MASTER_LIST_COLLAPSE_BUTTON_ID, {
      style: MASTER_LIST_COLLAPSE_BUTTON_STYLE$HOVER$CLOSED
    }
  )
}

function $masterListCollapseButtonOpenMouseOver() {
  $changeElement(
    MASTER_LIST_COLLAPSE_BUTTON_ID, {
      style: MASTER_LIST_COLLAPSE_BUTTON_STYLE$HOVER$OPEN
    }
  )
}

function $masterListCollapseButtonMouseOut() {
  $changeElement(
    MASTER_LIST_COLLAPSE_BUTTON_ID, {
      style: MASTER_LIST_COLLAPSE_BUTTON_STYLE
    }
  )
}

function collapseMasterList() {
  addToStorage({
    [MASTER_LIST_IS_CLOSED_KEY]: true
  })

  $changeElements({
    [MASTER_LIST_ID]: {
      style: MASTER_LIST_STYLE$CLOSED
    },
    [MASTER_LIST_COLLAPSE_BUTTON_ID]: MASTER_LIST_PROPERTIES$CLOSED
  })
}

function openMasterList() {
  addToStorage({
    [MASTER_LIST_IS_CLOSED_KEY]: false
  })

  $changeElements({
    [MASTER_LIST_ID]: {
      style: MASTER_LIST_STYLE
    },
    [MASTER_LIST_COLLAPSE_BUTTON_ID]: MASTER_LIST_PROPERTIES$OPEN
  })
}

function refreshListAndDetailContent() {
  $changeElements({
    [DETAIL_PANEL_ID]: {
      children: $renderDetailPanelActiveDocument()
    },
    [MASTER_LIST_ID]: {
      children: [
        $renderMasterListNavigation()
      ]
    }
  })

  window.loadTwitterWidgets();
}

function setActiveVisibleDocument(documentIndex, { keepListOpen } = {}) {
  if (!keepListOpen) collapseMasterList()

  addToStorage({
    [MASTER_LIST_ACTIVE_DOCUMENT_KEY]: retrieveVisibleDocumentList()[
      documentIndex].id
  })

  refreshListAndDetailContent()
}


function setActiveDocument(documentId) {
  if (window.isMobile()) {
    collapseMasterList();    
  }

  addToStorage({
    [MASTER_LIST_ACTIVE_DOCUMENT_KEY]: documentId
  })

  refreshListAndDetailContent()
}

///\\\////\\\ MasterList ///\\\///\\\
function $renderMasterList() {
  const style = retrieve(MASTER_LIST_IS_CLOSED_KEY) ?
    MASTER_LIST_STYLE$CLOSED :
    MASTER_LIST_STYLE

  return $createElement({
    name: "nav",
    id: MASTER_LIST_ID,
    style,
    children: [
      $renderMasterListNavigation()
    ]
  })
}

function $renderMasterListNavigation() {
  const documents = retrieveVisibleDocumentList()

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

///\\\///\\\ MasterList - ListItem ///\\\///\\\
function $renderMasterListItem({ id, title, body, type, date }) {
  const availableText = title || body
  const truncatedPreview = availableText.length > 50 ?
    `${availableText.slice(0, 50)}...` : availableText

  const listItemText = (type === "gallery") ? [
    $createElement({
      name: "b",
      text: availableText
    })
  ] : [
    $createElement({
      name: "b",
      innerHTML: `${truncatedPreview} — `,
      style: { "line-height": "1" }
    }),
    $createElement({
      name: "time",
      text: date,
      style: {
        "opacity": "0.5",
        "font-weight": "normal"
      }
    })
  ]

  const listItemProperties = (retrieveActiveDocumentHash() === id) ?
    LIST_ITEM_PROPERTIES$ACTIVE : {...LIST_ITEM_PROPERTIES,
      onClick: `setActiveDocument("${id}")`
    }

  return $createElement({...listItemProperties,
    name: "li",
    children: [
      $createIcon(type, {
        style: {
          "font-size": "15px",
          "margin-right": "10px"
        }
      }),
      $createElement({
        children: listItemText
      })
    ]
  })
}

///\\\///\\\ MasterList - CollapseButton ///\\\///\\\
function $renderMasterListCollapseButton() {
  const isClosedProperties = retrieve(MASTER_LIST_IS_CLOSED_KEY) ?
    MASTER_LIST_PROPERTIES$CLOSED :
    MASTER_LIST_PROPERTIES$OPEN

  return $createElement({
    ...isClosedProperties,
    name: "button",
    id: MASTER_LIST_COLLAPSE_BUTTON_ID,
    style: MASTER_LIST_COLLAPSE_BUTTON_STYLE
  })
}
