'use strict'

var gCanvas;
var gCtx;
var gIsItAPrint = false;

//INITING THE PAGE---------------------------

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
    onClearCanvas()
}

function onOpenMemeEditor(id) {
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.canvas-editor-modal').style.display = 'flex'
    document.querySelector('.control-box').style.display = 'grid'

    updateCurrImgIdToData(id)
    _renderCanvas()
    createNewLine()
}

// CANVAS FUNCTIONS -------------------------

function _renderCanvas() {
    let imgId = getImgIdFromData();
    let img = new Image();
    img.src = `imgs-(square)/${imgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        _renderText();
    }
}

function _renderText() {
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

        if (gIsItAPrint) return
        if (!gIsItAPrint && idx === getSelectedLineFromData()) {
            _renderFocusedLine(line)
            console.log('painted the outline');
        }
    })
}

function _renderFocusedLine(line) {
    const height = line.fontSize
    const pos = line.pos
    const startX = _getStartX(line)
    const startY = pos.y - height
    gCtx.beginPath()
    gCtx.strokeStyle = 'black'
    gCtx.rect(startX, startY, pos.width, height + 10) // x,y,widht,height
    gCtx.stroke()
}

function _measureTxtOnCanvas() {
    const txt = getSelectedTxtFromData()
    const width = gCtx.measureText(txt).width

    updateWidthToData(width)
}

function _getStartX(line) {
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
    updateLineIdx();
    _renderCanvas();
    _updateInputTxt()
}

function ondeleteLine() {
    deleteLineFromData();
    _renderCanvas();
}

function onAddNewLine() {
    document.querySelector('input[name=text]').value = ''
    createNewLine();
    _renderCanvas();
}

function onChangeFeature(value, feature) {
    if (feature === 'fontSize') updatefontSize(value);
    else updateMemeFeatures(value, feature);
    _measureTxtOnCanvas();
    _renderCanvas();
}

function onOpenMenu() {

}

function onClearCanvas() {
    deleteLinesFromData();
    updateLineIdx();
    onAddNewLine();
}

function onDownloadCanvas(elLink) {
    gIsItAPrint = true;
    _renderCanvas();
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-img.jpg';
    _toggleIsPrint()
}

function _toggleIsPrint() {
    gIsItAPrint = !gIsItAPrint;
}

function _updateInputTxt() {
    let txt = getSelectedTxtFromData()
    document.querySelector('input[name=text]').value = txt
}