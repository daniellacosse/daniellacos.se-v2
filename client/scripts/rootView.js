/// DEPENDENCIES
  /*
    detailPanel,
    infoSidebar,
    masterList
  */
///

const infoSidebar = $renderInfoSidebar();
const masterList  = $renderMasterList();
const detailPanel = $renderDetailPanel();

$renderAppView([
  infoSidebar,
  masterList,
  detailPanel
]);
