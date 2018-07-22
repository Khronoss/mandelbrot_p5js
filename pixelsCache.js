pxCache = []

function saveCache(array) {
    pxCache = array
}

function drawCache() {
    loadPixels()
    for (var i = 0; i < pxCache.length; i++) {
        pixels[i] = pxCache[i]
    }
    updatePixels()
}
