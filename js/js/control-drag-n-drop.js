'use strict'
var gIsMouseDown = false
var gLastTouchCords = { x: null, y: null };

function canvasClicked(ev) {
    var { offsetX, offsetY } = ev;
    var lines = getTxtFeatuersFromData()
    // console.log(ev);
    var clickedLineIdx = lines.findIndex((line) => {
        let lineX = getStartX(line)
        return offsetX >= lineX && offsetX <= lineX + line.pos.width
            && offsetY <= line.pos.y && offsetY >= line.pos.y - line.fontSize
    })
    // console.log(clickedLineIdx);
    if (clickedLineIdx === -1) return
    
    if (ev.type === 'touchstart') {
        var cords = ev.touches[0]
        gLastTouchCords = { x: cords.clientX, y: cords.clientY }
    }
    updateSelectedLineFromClick(clickedLineIdx)
    activateRenderAccordingToImg()
    updateInputTxt()
}

function onMouseUp() {
    gIsMouseDown = false;
    gLastTouchCords = { x: null, y: null };
}



function onMouseDown(ev) {
    gIsMouseDown = true
    // console.log(ev);
    canvasClicked(ev)


}

function dragLine(ev) {
    if (!gIsMouseDown) return
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




function dragLineOnMobile(ev) {
   
    ev.preventDefault()
    if (!gIsMouseDown) return
    console.log('line moved on mobile');
    // console.log(ev);
    var cords = ev.touches[0]
    var currPos = { x: cords.clientX, y: cords.clientY }
    var diff = {
        x: currPos.x - gLastTouchCords.x,
        y: currPos.y - gLastTouchCords.y
    }
    _updateLineCordsForTouch(x, y)
    // _updateLineCords(diff.x, diff.y)
    gLastTouchCords = currPos
    activateRenderAccordingToImg()
}



// function dragLineOnTouch(ev) {
//     ev.preventDefault()
//     if (!gIsMouseDown) return
//     console.log('line moved on mobile');
//     console.log(ev);
//     let x = ev.touches[0].clientX
//     let y = ev.touches[0].clienty
//     _updateLineCordsForTouch(x, y)
//     activateRenderAccordingToImg()
// }


function _updateLineCordsForTouch(x, y) {
    var line = getSelectedlineFromData()
    line.pos.x = x
    line.pos.y = y
}



// function handleTouch(ev) {
    
//     ev.preventDefault()
//     gCanvas = document.querySelector('.my-canvas')
//     const gCan = new Hammer(gCanvas);
//     gCan.on('pan', function (ev) {
//         touchAndDrop((ev.center.x), (ev.center.y))
//         activateRenderAccordingToImg()
//     });
// }

// function touchAndDrop(x,y){
//     console.log('xx',x)
//     console.log('ofset',gCtx.canvas.offsetLeft)
//     var X = x-gCtx.canvas.offsetLeft
//     var Y = y-gCtx.canvas.offsetTop
//     // console.log(x)
//     // console.log(y)
//     _updateLineCordsForTouch(X, Y)
// }