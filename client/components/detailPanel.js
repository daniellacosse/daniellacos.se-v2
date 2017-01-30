///\\\///\\\ DetailPanel - KEYS ///\\\///\\\
const DETAIL_PANEL_ID = "DetailPanel"
const DETAIL_CONTAINER_ID = `${DETAIL_PANEL_ID}-container`
const DETAIL_SHARE_BUTTON_ID = `${DETAIL_PANEL_ID}-shareButton`
const DETAIL_SHARE_BUTTON_ICON_ID = `${DETAIL_SHARE_BUTTON_ID}-icon`

///\\\///\\\ DetailPanel - PROPERTIES ///\\\///\\\
const DETAIL_PANEL_STYLE = {
  "width": "100%",
  "max-width": "720px",
  "margin": "75px 0",
  "position": "relative",
  "filter": "blur(0px)",
  "left": "50%",
  "transform": "translate3d(-50%, 0, 0)",
  "opacity": "1"
}

const DETAIL_CONTAINER_STYLE = {
  "width": "100%",
  "height": "100%",
  "flex-grow": "1",
  "overflow-y": "scroll",
  "overflow-x": "hidden",
  "box-shadow": "-3px 0px 8px 1px rgba(0, 0, 0, 0.2)",
  "background": "white",
  "position": "relative",
  "padding": "15px",
  "min-width": "285px"
}

const DETAIL_SHARE_BUTTON_STYLE = {
  "position": "fixed",
  "top": "15px",
  "right": "15px",
  "opacity": "0.25",
  "cursor": "pointer",
  "transition": `opacity ${DASE_DURATION} ${DASE_BEZIER}`
}

const DETAIL_PANEL_STYLE$FROZEN = (width) => ({
  ...DETAIL_PANEL_STYLE,
  "opacity": "0.75",
  "width": `${width}px`
})

const DETAIL_DOCUMENT_TIME_STYLE = {
  "font-size": "18px",
  "opacity": "0.25",
  "display": "block",
  "padding": "7px 0 18px 0",
  "border-bottom": "1px solid black",
  "margin-bottom": "32px"
}

const DETAIL_SUBDOCUMENT_TIME_STYLE = {
  "border-bottom": "0",
  "margin-bottom": "0",
  "padding": "0",
  "float": "right"
}

const DETAIL_SUBDOCUMENT_MINITIME_STYLE = {
  "font-size": "12px",
  "padding": "4px 0 8px 0",
  "margin-bottom": "14px"
}

const DETAIL_SUBDOCUMENT_TITLE_STYLE = {
  "font-family": "Helvetica, sans-serif",
  "font-size": "25px",
  "opacity": "0.25",
  "float": "left"
}

///\\\///\\\ DetailPanel - ACTIONS ///\\\///\\\
function freezeDetailPanel() {
  const { offsetWidth } = window._COMPONENT_REGISTRY_[DETAIL_PANEL_ID]

  $changeElement(
    DETAIL_PANEL_ID, {
      style: DETAIL_PANEL_STYLE$FROZEN(offsetWidth)
    }
  )
}

function unfreezeDetailPanel() {
  $changeElement(DETAIL_PANEL_ID, { style: DETAIL_PANEL_STYLE })
}

///\\\///\\\ DetailPanel ///\\\///\\\
function $renderDetailPanel() {
  const detailPanel = $createElement({
    name: "article",
    id: DETAIL_PANEL_ID,
    children: $renderDetailPanelActiveDocument(),
    style: DETAIL_PANEL_STYLE
  });

  return $createElement({
    name: "section",
    style: DETAIL_CONTAINER_STYLE,
    id: DETAIL_CONTAINER_ID,
    children: [
       detailPanel,
       $renderMasterListCollapseButton(),
      //  $renderActiveDocumentShareButton()
     ]
  })
}

function $renderDetailPanelActiveDocument() {
  return $renderDocument(retrieveActiveDocument())
}

function $renderDocument({
  title,
  body,
  date,
  tags,
  frame,
  frameHeight,
  type,
  subdocuments
}, { asSubdocument } = {}) {
  const $titleElement = (style) => {
    return $createElement({
      name: "h1",
      text: title,
      style
    })
  }

  const $frameElement = () => {
    return $createElement({
      name: "iframe",
      src: frame,
      id: "ActiveDocumentFrame",
      width: "100%",
      height: frameHeight || 350,
      style: {
        "background": DASE_GREEN,
        "border-radius": "2px",
        "margin-bottom": "5px"
      }
    })
  }
  const $timeElement = (style) => {
    return $createElement({
      name: "time",
      text: date,
      style: {
        ...DETAIL_DOCUMENT_TIME_STYLE,
        ...style
      }
    })
  }

  let children = [];
  if (!asSubdocument && title && frame && type !== "gallery") {
    children = [
      $titleElement(),
      $timeElement(),
      $frameElement()
    ]
  } else if (!asSubdocument && title && !frame && type !== "gallery") {
    children = [
      $titleElement(),
      $timeElement()
    ]
  } else if (!asSubdocument && !title && frame && type !== "gallery") {
    children = [
      $frameElement(),
      $timeElement()
    ]
  } else if (!asSubdocument && title && type === "gallery") {
    children = [
      $titleElement({
        "margin-bottom": "32px"
      })
    ]
  } else if (asSubdocument && title && frame) {
    children = [
      $createElement({
        name: "header",
        class: "clearfix",
        style: {
          "margin": "15px 0 10px 0"
        },
        children: [
          $titleElement(DETAIL_SUBDOCUMENT_TITLE_STYLE),
          $timeElement(DETAIL_SUBDOCUMENT_TIME_STYLE)
        ]
      }),
      $frameElement()
    ]
  } else if (asSubdocument && title && !frame) {
    children = [
      $createElement({
        name: "header",
        class: "clearfix",
        style: {
          "margin": "15px 0 10px 0"
        },
        children: [
          $titleElement(DETAIL_SUBDOCUMENT_TITLE_STYLE),
          $timeElement(DETAIL_SUBDOCUMENT_TIME_STYLE)
        ]
      })
    ]
  } else if (asSubdocument && !title && frame) {
    children = [
      $frameElement(),
      $timeElement(DETAIL_SUBDOCUMENT_MINITIME_STYLE)
    ]
  }

  if (body && asSubdocument) {
    children.push($createElement({
      name: "p",
      innerHTML: body
    }));
  } else if (body) {
    children.push($createElement({
      name: "section",
      innerHTML: body
    }))
  }

  if (typeof subdocuments === "object" && subdocuments.length) {
    const flattenedSubdocumentElements = [].concat.apply([], subdocuments.map(
      (
        doc) => $renderDocument(doc, { asSubdocument: true })))

    children.push(
      $createElement({
        name: "section",
        children: flattenedSubdocumentElements
      })
    )
  }

  // if (typeof tags === "object" && tags.length) {
  //   children.push(
  //     $createElement({
  //       name: "footer",
  //       style: {
  //         "margin-top": "30px",
  //         "overflow-wrap": "break-word",
  //         "line-height": "1.75"
  //       },
  //       children: tags.map((tag) => {
  //         return $createElement({
  //           name: "a",
  //           text: `#${tag}`,
  //           style: {
  //             "cursor": "pointer",
  //             "background-color": "#f70000",
  //             "padding": "4px 10px",
  //             "color": "white",
  //             "border-radius": "5px",
  //             "margin-right": "10px",
  //             "transition": `background-color ${DASE_DURATION} ${DASE_BEZIER}`
  //           },
  //           onMouseOver: "this.style.backgroundColor='#9c0909'",
  //           onMouseOut: "this.style.backgroundColor='#f70000'"
  //         })
  //       })
  //     })
  //   )
  // }

  return children
}

function $renderActiveDocumentShareButton() {
  return $createElement({
    name: "button",
    id: DETAIL_SHARE_BUTTON_ID,
    style: DETAIL_SHARE_BUTTON_STYLE,
    onMouseOver: "this.style.opacity=1",
    onMouseOut: "this.style.opacity=0.25",
    children: [
      $createIcon("share", {
        id: DETAIL_SHARE_BUTTON_ICON_ID,
        style: {
          "color": DASE_GREEN,
          "font-size": "20px"
        }
      })
    ]
  })
}
