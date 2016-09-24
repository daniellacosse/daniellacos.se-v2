(function(){
  /// DEPENDENCIES
    /*
      detailPanel,
      infoSidebar,
      masterList
    */
  ///

  console.log("daniellacos.se v2.0.0");

  addToStorage();

  const infoSidebar = $renderInfoSidebar();
  const masterList  = $renderMasterList();
  const detailPanel = $renderDetailPanel();

  $renderAppView([
    infoSidebar,
    masterList,
    detailPanel
  ]);
})();
