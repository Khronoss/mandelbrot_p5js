winSize = {
    width: 1200,
    height: 600
}

mandelbrotPlan = {
    minX: -2.25,
    maxX: 1,
    minY: -1.5,
    maxY: 1.5
}

maxIterations = 500
divergenceThreshold = 500

function setup() {
    zooms = [
        {
            x: 0,
            y: 0,
            width: winSize.width / 2,
            height: winSize.height
        }
    ]

    createCanvas(winSize.width, winSize.height)
}

mandelbrotCalculated = false

function draw() {
    if (!mandelbrotCalculated) {
        print("Draw mandelbrot")
        colorMode(HSB)
        loadPixels()
        displayMandelbrot()
        saveCache(pixels)
        updatePixels()

        mandelbrotCalculated = true
    } else {
        drawCache()
    }

    drawZoomBox()

    loadPixels()
    displayJuliaSet()
    updatePixels()
}

function updateZoom() {
    let lastZoom = zooms[zooms.length - 1]

    let newMinX = map(lastZoom.x, 0, winSize.width / 2, mandelbrotPlan.minX, mandelbrotPlan.maxX)
    let newMaxX = map(lastZoom.x + lastZoom.width, 0, winSize.width / 2, mandelbrotPlan.minX, mandelbrotPlan.maxX)

    let newMinY = map(lastZoom.y, 0, winSize.height, mandelbrotPlan.maxY, mandelbrotPlan.minY)
    let newMaxY = map(lastZoom.y + lastZoom.height, 0, winSize.height, mandelbrotPlan.maxY, mandelbrotPlan.minY)

    mandelbrotPlan = {
        minX: newMinX,
        maxX: newMaxX,
        minY: min(newMinY, newMaxY),
        maxY: max(newMinY, newMaxY)
    }

    console.log(mandelbrotPlan)

    mandelbrotCalculated = false
}

function displayJuliaSet() {
    if (mouseX > winSize.width / 2 ||
        mouseX < 0 ||
        mouseY > winSize.height ||
        mouseY < 0) {
            return
    }

    let cReal = map(mouseX, 0, winSize.width / 2, mandelbrotPlan.minX, mandelbrotPlan.maxX)
    let cImagin = map(mouseY, 0, winSize.height, mandelbrotPlan.maxY, mandelbrotPlan.minY)

    let juliaSize = {
        width: 500,
        height: 500
    }
    let minX = winSize.width / 2
    let maxX = minX + juliaSize.width
    let minY = 0
    let maxY = minY + juliaSize.height

    for (var x = minX; x < maxX; x++) {
        for (var y = minY; y < maxY; y++) {
            let zReal = map(x, minX, maxX, -2, 2)
            let zImagin = map(y, minY, maxY, 2, -2)

            let count = isInMandelbrot(cReal, cImagin, zReal, zImagin)

            var hue = map(count, 0, maxIterations, 0, 255);
            var brightness = 255

            if (count >= maxIterations) {
                brightness = 0
            }

            set(x, y, color(hue, 255, brightness))
        }
    }
}

function displayMandelbrot() {
    for (var x = 0; x < winSize.width / 2; x++) {
        for (var y = 0; y < winSize.height; y++) {
            let cReal = map(x, 0, winSize.width / 2, mandelbrotPlan.minX, mandelbrotPlan.maxX)
            let cImagin = map(y, 0, winSize.height, mandelbrotPlan.maxY, mandelbrotPlan.minY)

            let count = isInMandelbrot(cReal, cImagin, 0, 0)

            var hue = map(count, 0, maxIterations, 0, 255);
            var brightness = 255

            if (count >= maxIterations) {
                brightness = 0
            }

            set(x, y, color(hue, 255, brightness))
        }
    }
}

function isInMandelbrot(cReal, cImagin, zReal, zImagin) {
    repeatCount = 0

    while (repeatCount < maxIterations && (zReal * zReal + zImagin * zImagin) < divergenceThreshold) {
        let zReal_new = zReal * zReal - (zImagin * zImagin) + cReal
        let zImagin_new = 2 * zReal * zImagin + cImagin

        zReal = zReal_new
        zImagin = zImagin_new

        repeatCount++
    }

    return repeatCount
}
