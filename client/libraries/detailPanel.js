const DETAIL_PANEL_ID = "DetailPanel"
const DETAIL_CONTAINER_ID = `${DETAIL_PANEL_ID}-container`

const DETAIL_PANEL_STYLE = {
  "width": "100%",
  "max-width": "500px",
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
  "transform": "rotate(0)",
  "padding": "15px",
  "min-width": "315px",
  "z-index": "5"
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
       $renderMasterListCollapseButton()
     ]
  })
}

function $renderDetailPanelActiveDocument() {
  const { title, body, date, tags } = retrieveActiveDocument()

  let requriedChildren = [
    $createElement({ name: "h1", text: title }),
    $createElement({
      name: "time",
      text: new Date(date).toLocaleDateString(),
      style: {
        "font-size": "12px",
        "opacity": "0.5",
        "display": "block",
        "padding": "5px 0 15px 0",
        "border-bottom": "1px solid black",
        "margin-bottom": "30px"
      }
    }),
    $createElement({ name: "section", innerHTML: body })
  ]

  if (typeof tags === "object" && tags.length) {
    requriedChildren.push(
      $createElement({
        name: "footer",
        style: {
          "padding-top": "15px",
          "margin-top": "30px",
          "border-top": "1px solid rgba(0, 0, 0, 0.5)",
          "overflow-wrap": "break-word"
        },
        children: tags.map((tag) => {
          return $createElement({
            name: "a",
            text: `#${tag}`,
            style: {
              "cursor": "pointer",
              "padding-right": "15px"
            }
          })
        })
      })
    )
  }

  return requriedChildren
}
