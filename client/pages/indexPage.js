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
  const contactCard = $renderContactCard();

  $renderApp([
    infoSidebar,
    masterList,
    detailPanel,
    contactCard
  ]);

  window.addEventListener("keydown", ({ keyCode }) => {
    const activeDocumentIndex = retrieveActiveDocumentPosition()

    switch (keyCode) {
    case LEFT_ARROW:
      collapseMasterList()
      break
    case UP_ARROW:
      if (activeDocumentIndex > 0)
        setActiveVisibleDocument(activeDocumentIndex -
          1, { keepListOpen: true })
      break
    case RIGHT_ARROW:
      openMasterList()
      break
    case DOWN_ARROW:
      setActiveVisibleDocument(activeDocumentIndex + 1, { keepListOpen: true })
      break
    }
  })

  window.addEventListener("resize", () => {
    const resizeDefererId = retrieve("resizeDefererId")

    if (resizeDefererId)
      clearTimeout(resizeDefererId)
    else
      freezeDetailPanel()

    addToStorage({
      resizeDefererId: setTimeout(() => {
        unfreezeDetailPanel()
        removeFromStorage(["resizeDefererId"])
      }, 600)
    })
  })
})();
