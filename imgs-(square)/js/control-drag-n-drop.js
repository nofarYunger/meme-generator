'use strict'
var gIsMouseDown = false
var gLastTouchCords = { x: 0, y: 0 };

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
    activateRenderAccordingToImg()
    updateInputTxt()
}

function onMouseUp() {
    gIsMouseDown = false;
}

function onMouseDown(ev) {
    if (ev.type === 'mousedown') {
        canvasClicked(ev)
    } else {
        var cords = ev.touches[0]
        gLastTouchCords = { x: cords.screenX, y: cords.screenY }
        canvasClickedTouch(ev)
    }
    gIsMouseDown = true
}

function dragLine(ev) {
    if (!gIsMouseDown) return
    console.log(ev);
    ev.preventDefault()
    var { movementX, movementY } = ev;
    _updateLineCords(movementX, movementY)
    activateRenderAccordingToImg()
}


function _updateLineCords(diffX, diffY) {
    var line = getSelectedlineFromData()
    line.pos.x += diffX
    line.pos.y += diffY
}

function canvasClickedTouch(ev) {
    var { offsetX, offsetY } = ev;
    var lines = getTxtFeatuersFromData()

    var clickedLineIdx = lines.findIndex((line) => {
        let lineX = getStartX(line)
        return offsetX >= lineX && offsetX <= lineX + line.pos.width
            && offsetY <= line.pos.y && offsetY >= line.pos.y - line.fontSize
    })
    if (clickedLineIdx === undefined) return
    updateSelectedLineFromClick(clickedLineIdx)
    activateRenderAccordingToImg()
    updateInputTxt()
}


function dragLineOnMobile(ev) {
    if (!gIsMouseDown) return
    ev.preventDefault()
    console.log(ev);
    var cords = ev.touches[0]
    var currPos = { x: cords.screenX, y: cords.screenY }
    var diff = {
        x: currPos.x - gLastTouchCords.x,
        y: currPos.y - gLastTouchCords.y
    }
    _updateLineCords(diff.x, diff.y)
    gLastTouchCords = currPos
    activateRenderAccordingToImg()
}