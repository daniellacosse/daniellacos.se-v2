///\\\////\\\ MasterList - ListItem ///\\\///\\\
const LIST_ITEM_STYLE = {
  padding: "20px",
  width: "100%",
  height: "100px",
  background: "red",
  overflow: "hidden"
}

function $renderListItem({ title }) {
  return $createElement({
    name: "li",
    text: title,
    style: LIST_ITEM_STYLE
  })
}

///\\\////\\\ MasterList ///\\\///\\\
const MASTER_LIST_STYLE = {
  height: "100%",
  width: "200px"
}

function $renderMasterList() {
  const documents = (sessionStorage && sessionStorage.getItem("documents"))
    ? JSON.parse(sessionStorage.getItem("documents"))
    : []

  return $createElement({
    name: "ul",
    id: "MasterList",
    style: MASTER_LIST_STYLE,
    children: documents.map($renderListItem)
  })
}

function refreshMasterList() {
  const masterList = document.getElementById("MasterList")
  const documents = (sessionStorage && sessionStorage.documents)
    ? sessionStorage.documents
    : []

  masterList.innerHTML = "";
  $insertElements(masterList, documents.map($renderListItem))
}
