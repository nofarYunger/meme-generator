'use strict'
var gIsMouseDown = false

function canvasClicked(ev) {
    var { offsetX, offsetY } = ev;
    var lines = getTxtFeatuersFromData()

    var clickedLineIdx = lines.findIndex((line) => {
        let lineX = getStartX(line)
        return offsetX >= lineX && offsetX <= lineX + line.pos.width
            && offsetY <= line.pos.y && offsetY >= line.pos.y - line.fontSize
    })
    if (clickedLineIdx === undefined) return
    updateSelectedLineFromClick(clickedLineIdx)
    renderCanvas()
    updateInputTxt()
}

function onMouseUp() {
    gIsMouseDown = false;
}

function onMouseDown(ev) {
    gIsMouseDown = true
    canvasClicked(ev)
}

function dragLine(ev) {
    if (!gIsMouseDown) return
    ev.preventDefault()
    var { movementX, movementY } = ev;
    updateLineCords(movementX, movementY)
    renderCanvas()
}


function updateLineCords(diffX, diffY) {
    var line = getSelectedlineFromData()
    line.pos.x += diffX
    line.pos.y += diffY
}