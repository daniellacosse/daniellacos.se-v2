(function () {
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
  const masterList = $renderMasterList();
  const detailPanel = $renderDetailPanel();

  $renderApp([
    infoSidebar,
    masterList,
    detailPanel
  ]);

  window.addEventListener("keydown", ({ keyCode }) => {
    const activeDocumentIndex = retrieveActiveDocumentIndex()

    switch (keyCode) {
    case LEFT_ARROW:
      collapseMasterList()
      break
    case UP_ARROW:
      if (activeDocumentIndex > 0)
        setActiveDocument(activeDocumentIndex -
          1, { keepListOpen: true })
      break
    case RIGHT_ARROW:
      openMasterList()
      break
    case DOWN_ARROW:
      setActiveDocument(activeDocumentIndex + 1, { keepListOpen: true })
      break
    }
  })

  window.addEventListener("resize", () => {
    const resizeDefererId = retrieve("resizeDefererId")
    const resizeDefererWidth = retrieve("resizeDefererWidth")

    if (resizeDefererId) {
      clearTimeout(resizeDefererId);
      addToStorage({ resizeDefererId: null });
    }

    addToStorage({
      resizeDefererWidth: freezeDetailPanel(resizeDefererWidth),
      resizeDefererId: setTimeout(unfreezeDetailPanel, 300)
    })
  })
})();
