registerShortcut("Maximize but Not", "Maximize but Not", "Meta+Z", () => {
    const activeWindow = workspace.activeWindow
    const area = workspace.clientArea(KWin.MaximizeArea, activeWindow)

    const newGeometry = Object.assign({}, activeWindow.frameGeometry)
    newGeometry.x = area.left
    newGeometry.y = area.top
    newGeometry.width = area.width
    newGeometry.height = area.height

    activeWindow.frameGeometry = newGeometry
});
