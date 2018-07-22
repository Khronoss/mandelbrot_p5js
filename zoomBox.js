zooms = null

zoomStartPoint = null
zoomEndPoint = null

function mousePressed() {
    zoomStartPoint = {
        x: mouseX,
        y: mouseY
    }

    zoomEndPoint = null
}

function mouseReleased() {
    zoomEndPoint = {
        x: mouseX,
        y: mouseY
    }

    zooms.push(getBox(zoomStartPoint.x, zoomStartPoint.y, zoomEndPoint.x, zoomEndPoint.y))

    zoomStartPoint = null
    zoomEndPoint = null

    updateZoom()
}

function drawZoomBox() {
    if (zoomStartPoint != null && zoomEndPoint == null) {
        colorMode(RGB)
        stroke(100, 220, 100)
        noFill()

        let box = getBox(zoomStartPoint.x, zoomStartPoint.y, mouseX, mouseY)
        rect(box.x, box.y, box.width, box.height)
    }
}

function getBox(x1, y1, x2, y2) {
    minX = min(x1, x2)
    minY = min(y1, y2)
    maxX = max(x1, x2)
    maxY = max(y1, y2)

    width = x2 - x1
    height = y2 - y1
    size = min(abs(width), abs(height))

    // size = min(width, height)

    return {
        x: x1,
        y: y1,
        width: size * (width < 0 ? -1 : 1),
        height: size * (height < 0 ? -1 : 1)
    }
}
