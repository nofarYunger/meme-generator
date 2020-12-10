'use strict'

var gCanvas;
var gCtx;


//INITING...

function onInit() {
    renderGallery()
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
}

function renderGallery() {
    var imgs = getImgsFromData()
    var innerHTMLs = imgs.map(img => {
        return `<a href="#"><img class="gallery-img" onclick="onOpenMemeEditor(this.id) "
         id="${img.id}" src="imgs-(square)/${img.id}.jpg" ></a>`
    })
    document.querySelector('.img-container').innerHTML = innerHTMLs.join(' ')
}

function showGallery() {
    document.querySelector('.gallery').style.display = 'block'
    document.querySelector('.canvas-editor-modal').style.display = 'none'
    document.querySelector('.control-box').style.display = 'none'
    clearCanvas()
}

function onOpenMemeEditor(id) {
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.canvas-editor-modal').style.display = 'flex'
    document.querySelector('.control-box').style.display = 'grid'

    updateCurrImgIdToData(id)
    renderCanvas()
    createNewLine()
}

// CANVAS FUNCTIONS -------------------------

function renderCanvas() {
    let imgId = getImgIdFromData()
    let img = new Image();
    img.src = `imgs-(square)/${imgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        renderText()
    }
}

function renderText() {
    let lines = getTxtFeatuersFromData()
    lines.forEach((line, idx) => {
        gCtx.lineWidth = `1.5`
        gCtx.font = `${line.fontSize}px ${line.font}`
        gCtx.textAlign = `${line.align}`
        gCtx.strokeStyle = `${line.outline}`
        gCtx.fillStyle = `${line.color}`
        let pos = line.pos
        gCtx.fillText(line.txt, pos.x, pos.y)
        gCtx.strokeText(line.txt, pos.x, pos.y)

        if (idx === getSelectedLineFromData()) {
            renderFocusedLine(line)
        }
    })
}

function renderFocusedLine(line) {
    const height = line.fontSize
    const pos = line.pos
    const startX = getStartX(line)
    const startY = pos.y - height
    gCtx.beginPath()
    gCtx.strokeStyle = 'black'
    gCtx.rect(startX, startY, pos.width, height) // x,y,widht,height
    gCtx.stroke()
}

function measureTxtOnCanvas() {
    const txt = getSelectedTxtFromData()
    const width = gCtx.measureText(txt).width

    updateWidthToData(width)
}

function getStartX(line) {
    const align = line.align;
    switch (align) {
        case 'left':
            return line.pos.x
        case 'center':
            return line.pos.x - (line.pos.width / 2)
        case 'right':
            return line.pos.x - line.pos.width
        default: return line.pos.x
    }
}

// CONTROL BTNS FUNC----------------------------------

function onMoveToNextLine() {
    updateLineIdx()
    renderCanvas()
}

function ondeleteLine() {
    deleteLineFromData()
    renderCanvas()
}

function onAddNewLine() {
    document.querySelector('input[name=text]').value = ''
    createNewLine()
    renderCanvas()
}

function onChangeFeature(value, feature) {
    if (feature === 'fontSize') updatefontSize(value)
    else updateMemeFeatures(value, feature)
    measureTxtOnCanvas()
    renderCanvas()
}

function clearCanvas() {
    gCtx.clearRect(0, 0, 500, 500);
}

function onOpenMenu() {

}