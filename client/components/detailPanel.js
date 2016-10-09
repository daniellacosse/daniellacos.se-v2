const DETAIL_PANEL_ID = "DetailPanel"
const DETAIL_CONTAINER_ID = `${DETAIL_PANEL_ID}-container`
const DETAIL_SHARE_BUTTON_ID = `${DETAIL_PANEL_ID}-shareButton`
const DETAIL_SHARE_BUTTON_ICON_ID = `${DETAIL_SHARE_BUTTON_ID}-icon`

const DETAIL_PANEL_STYLE = {
  "width": "100%",
  "max-width": "720px",
  "margin": "75px auto 75px auto"
}

const DETAIL_CONTAINER_STYLE = {
  "width": "100%",
  "height": "100%",
  "flex-grow": "1",
  "overflow-y": "scroll",
  "box-shadow": "-3px 0px 8px 1px rgba(0, 0, 0, 0.2)",
  "background": "white",
  "position": "relative",
  "transform": "rotateZ(0)",
  "padding": "15px",
  "min-width": "285px"
}

const DETAIL_SHARE_BUTTON_STYLE = {
  "position": "fixed",
  "top": "15px",
  "right": "15px",
  "opacity": "0.25",
  "transform": "rotateZ(0)",
  "cursor": "pointer",
  "transition": `opacity ${DASE_DURATION} ${DASE_BEZIER}`
}

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
  "float": "right"
}

const DETAIL_SUBDOCUMENT_TITLE_STYLE = {
  "font-family": "Helvetica, sans-serif",
  "font-size": "25px",
  "opacity": "0.25"
}

function $renderDocument({
  title,
  body,
  date,
  tags,
  frame,
  frameHeight,
  subdocuments
}, { asSubdocument } = {}) {
  const $frameElement = () => {
    return $createElement({
      name: "iframe",
      src: frame,
      id: "ActiveDocumentFrame",
      width: "100%",
      height: 350 || frameHeight,
      style: {
        "background": DASE_GREEN,
        "border-radius": "2px",
        "margin-bottom": "5px"
      }
    })
  }
  const $timeElement = () => {
    return $createElement({
      name: "time",
      text: date,
      style: {
        ...DETAIL_DOCUMENT_TIME_STYLE,
        ...asSubdocument ? DETAIL_SUBDOCUMENT_TIME_STYLE : {}
      }
    })
  }

  let children = []

  if (title && asSubdocument) {
    children.push($createElement({
      name: "h1",
      text: title,
      style: DETAIL_SUBDOCUMENT_TITLE_STYLE,
      children: [timeElement()]
    }))
  } else if (title && !frame) {
    children.push($createElement({
      name: "h1",
      text: title
    }))
  } else if (frame && !title) {
    children.push($frameElement())
    children.push($timeElement())
  } else if (frame && title) {
    children.push($timeElement())
    children.push($frameElement())
  } else {
    children.push($timeElement())
  }

  if (body) {
    children.push($createElement({
      name: "section",
      innerHTML: body
    }))
  }

  if (typeof subdocuments === "object" && subdocuments.length) {
    const flattenedSubdocumentElements = [].concat.apply([], subdocuments.map((
      doc) => $renderDocument(doc, { asSubdocument: true })))

    children.push(
      $createElement({
        name: "section",
        children: flattenedSubdocumentElements
      })
    )
  }

  if (typeof tags === "object" && tags.length) {
    children.push(
      $createElement({
        name: "footer",
        style: {
          "margin-top": "30px",
          "overflow-wrap": "break-word",
          "line-height": "1.75"
        },
        children: tags.map((tag) => {
          return $createElement({
            name: "a",
            text: `#${tag}`,
            style: {
              "cursor": "pointer",
              "background-color": "#f70000",
              "padding": "4px 10px",
              "color": "white",
              "border-radius": "5px",
              "margin-right": "10px",
              "transition": `background-color ${DASE_DURATION} ${DASE_BEZIER}`
            },
            onMouseOver: "this.style.backgroundColor='#9c0909'",
            onMouseOut: "this.style.backgroundColor='#f70000'"
          })
        })
      })
    )
  }

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
