///\///\ MasterList - KEYS ///\///\\
const MASTER_LIST_ID = "MasterList"
const MASTER_LIST_COLLAPSE_BUTTON_ID = `${MASTER_LIST_ID}-collapseButton`
const MASTER_LIST_NAVIGATION_ID = `${MASTER_LIST_ID}-articleListNavigation`

const MASTER_LIST_IS_CLOSED_KEY = `${MASTER_LIST_ID}-isClosed`
const MASTER_LIST_ACTIVE_DOCUMENT_KEY = `${MASTER_LIST_ID}-activeDocumentId`
const MASTER_LIST_VISIBLE_DOCUMENTS_KEY =
  `${MASTER_LIST_ID}-visibleDocumentsList`

///\///\ MasterList - PROPERTIES ///\///\\
const MASTER_LIST_STYLE$OPEN = {
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
  ...MASTER_LIST_STYLE$OPEN,
  ...{
    "max-width": "0px",
    "min-width": "0px"
  }
}

const MASTER_LIST_COLLAPSE_BUTTON_PROPERTIES$OPEN = {
  onClick: "collapseMasterList()",
  style: MASTER_LIST_COLLAPSE_BUTTON_STYLE$OPEN,
  onMouseOver: "$masterListCollapseButtonOpenMouseOver()",
  onMouseOut: "$masterListCollapseButtonOpenMouseOut()"
}

const MASTER_LIST_COLLAPSE_BUTTON_PROPERTIES$CLOSED = {
  onClick: "openMasterList()",
  style: MASTER_LIST_COLLAPSE_BUTTON_STYLE$CLOSED,
  onMouseOver: "$masterListCollapseButtonClosedMouseOver()",
  onMouseOut: "$masterListCollapseButtonClosedMouseOut()"
}

const MASTER_LIST_COLLAPSE_BUTTON_STYLE = {
  "position": "sticky",
  "top": "0px",
  "left": "0px",
  "display": "inline-block",
  "padding": "24px",
  "cursor": "pointer",
  "font-size": "18px",
  "color": "rgba(24, 99, 63, 0.25)",
  "background": "rgba(255, 255, 255, 0.95)",
  "border-top-right-radius": "50%",
  "border-bottom-right-radius": "50%",
  "z-index": "15",
  "transition": `all 400ms ${DASE_BEZIER}`,
}

const MASTER_LIST_COLLAPSE_BUTTON_STYLE$OPEN = {
  ...MASTER_LIST_COLLAPSE_BUTTON_STYLE,
  "transform": "rotate(180deg)",
}

const MASTER_LIST_COLLAPSE_BUTTON_STYLE$CLOSED = {
  ...MASTER_LIST_COLLAPSE_BUTTON_STYLE,
  "transform": "rotate(0deg)",
}

const MASTER_LIST_COLLAPSE_BUTTON_STYLE$HOVER = {
  "color": "rgba(24, 99, 63, 1)",
}

const MASTER_LIST_COLLAPSE_BUTTON_STYLE$OPEN$HOVER = {
  ...MASTER_LIST_COLLAPSE_BUTTON_STYLE$OPEN,
  ...MASTER_LIST_COLLAPSE_BUTTON_STYLE$HOVER,
  "padding": "24px 19px 24px 29px",
}

const MASTER_LIST_COLLAPSE_BUTTON_STYLE$CLOSED$HOVER = {
  ...MASTER_LIST_COLLAPSE_BUTTON_STYLE$CLOSED,
  ...MASTER_LIST_COLLAPSE_BUTTON_STYLE$HOVER,
  "padding": "24px 19px 24px 29px",
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
  "text-overflow": "ellipsis",
  "transition": `all ${DASE_DURATION} ${DASE_BEZIER}`,
}

const LIST_ITEM_STYLE$ACTIVE = {
  ...LIST_ITEM_STYLE,
  ...{
    "background": DASE_GREEN,
    "color": "white",
    "cursor": "initial"
  }
}

const LIST_ITEM_PROPERTIES = {
  style: LIST_ITEM_STYLE,
  onMouseOver: `this.style.background='rgba(24, 99, 63, 0.25)'; this.style.color='rgba(255, 255, 255, 0.8)'`,
  onMouseOut: "this.style.background='transparent'; this.style.color='initial'",
}

const LIST_ITEM_PROPERTIES$ACTIVE = {
  style: LIST_ITEM_STYLE$ACTIVE
}

///\\\///\\\ MasterList - ACTIONS ///\\\///\\\
function $masterListCollapseButtonClosedMouseOver() {
  $changeElement(
    MASTER_LIST_COLLAPSE_BUTTON_ID, {
      style: MASTER_LIST_COLLAPSE_BUTTON_STYLE$CLOSED$HOVER
    }
  )
}

function $masterListCollapseButtonOpenMouseOut() {
  $changeElement(
    MASTER_LIST_COLLAPSE_BUTTON_ID, {
      style: MASTER_LIST_COLLAPSE_BUTTON_STYLE$OPEN
    }
  )
}

function $masterListCollapseButtonOpenMouseOver() {
  $changeElement(
    MASTER_LIST_COLLAPSE_BUTTON_ID, {
      style: MASTER_LIST_COLLAPSE_BUTTON_STYLE$OPEN$HOVER
    }
  )
}

function $masterListCollapseButtonClosedMouseOut() {
  $changeElement(
    MASTER_LIST_COLLAPSE_BUTTON_ID, {
      style: MASTER_LIST_COLLAPSE_BUTTON_STYLE$CLOSED
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
    [MASTER_LIST_COLLAPSE_BUTTON_ID]: MASTER_LIST_COLLAPSE_BUTTON_PROPERTIES$CLOSED
  })

  $masterListCollapseButtonClosedMouseOut();
}

function openMasterList() {
  addToStorage({
    [MASTER_LIST_IS_CLOSED_KEY]: false
  })

  $changeElements({
    [MASTER_LIST_ID]: {
      style: MASTER_LIST_STYLE$OPEN
    },
    [MASTER_LIST_COLLAPSE_BUTTON_ID]: MASTER_LIST_COLLAPSE_BUTTON_PROPERTIES$OPEN
  })

  $masterListCollapseButtonOpenMouseOut();
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
  resetDetailScrollDepth()
}


function setActiveDocument(documentId) {
  if (window.isMobile()) {
    collapseMasterList();
  }

  addToStorage({
    [MASTER_LIST_ACTIVE_DOCUMENT_KEY]: documentId
  })

  refreshListAndDetailContent()
  resetDetailScrollDepth()
}

///\\\////\\\ MasterList ///\\\///\\\
function $renderMasterList() {
  const style = retrieve(MASTER_LIST_IS_CLOSED_KEY, window.isMobile())
    ? MASTER_LIST_STYLE$CLOSED
    : MASTER_LIST_STYLE$OPEN

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
function $renderMasterListItem({ id, title, description, body, type, date }) {
  const availableText = title || description || body
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
  const isClosedProperties = retrieve(
    MASTER_LIST_IS_CLOSED_KEY, window.isMobile()
  ) ? MASTER_LIST_COLLAPSE_BUTTON_PROPERTIES$CLOSED
    : MASTER_LIST_COLLAPSE_BUTTON_PROPERTIES$OPEN;

  return $createIcon("arrow", {
    ...isClosedProperties,
    name: "button",
    id: MASTER_LIST_COLLAPSE_BUTTON_ID,
    style: MASTER_LIST_COLLAPSE_BUTTON_STYLE
  });
}
