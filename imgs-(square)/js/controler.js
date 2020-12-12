'use strict'

var gCanvas;
var gCtx;
var gInputImgEv = null;

//INITING THE PAGE---------------------------

function onInit() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
    var imgs = getImgsFromData()
    renderGallery(imgs)
}


function renderGallery(imgs) {

    // opening error modal
    if (imgs.length === 0) {
        document.querySelector('.modal-gallery').style.display = 'block'
    } else document.querySelector('.modal-gallery').style.display = 'none'
    var innerHTMLs = imgs.map(img => {
        return `<a href="#"><img class="gallery-img" onclick="onOpenMemeEditor(this.id) "
        id="${img.id}" src="imgs-(square)/${img.id}.jpg" ></a>`
    })
    document.querySelector('.img-container').innerHTML = innerHTMLs.join(' ')
}


// activate when gallery is clicked on nav-bar
function showGallery() {

    // deleting the input file 
    gInputImgEv = null;
    document.querySelector('input[type=file]').value = ''

    // hiding the editor and sowing the gallery
    document.querySelector('.gallery').style.display = 'block'
    document.querySelector('.canvas-editor-modal').style.display = 'none'
    document.querySelector('.control-box').style.display = 'none'
    document.querySelector('.search-bar').style.display = 'flex'

    // closing the menu on mobile 
    onToggleMenu()

    var imgs = getImgsFromData()
    renderGallery(imgs)
    wrapperDisplayGallery()
    onClearCanvas()
}

// activate when clicking an img
function onOpenMemeEditor(id) {
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.search-bar').style.display = 'none'
    document.querySelector('.canvas-editor-modal').style.display = 'flex'
    document.querySelector('.control-box').style.display = 'grid'
    updateCurrImgIdToData(id)
    activateRenderAccordingToImg()
    createNewLine()
    wrapperDisplayEditor()
}

// RENDER FUNCTIONS -------------------------------------------------------------------------------------------------

// idntifying if the img is from the user or the gallery and activating the right func
function activateRenderAccordingToImg() {
    if (gInputImgEv) renderCanvasFromInput()
    else renderCanvasFromData()
}


function renderCanvasFromData() {
    //getting the img from data and rendering it on the canvas
    let imgId = getImgIdFromData();
    let img = new Image();
    img.src = `imgs-(square)/${imgId}.jpg`;
    // after the img loads prints the content on the canvas
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        _renderText();
        _setTxtInputOnFocus()
        _highLightSelectedLine()
    }
}


// render before downloading without the outline 
function renderCanvasForDownload() {
    let imgId = getImgIdFromData();
    let img = new Image();
    img.src = `imgs-(square)/${imgId}.jpg`;
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
    _renderText();
    _setTxtInputOnFocus()
}


// getting the featurs from data and rendering the content on the canvass
function _renderText() {
    let lines = getTxtFeatuersFromData()
    // for each line:
    lines.forEach((line) => {
        gCtx.lineWidth = `1.5`
        gCtx.font = `${line.fontSize}px ${line.font}`
        gCtx.textAlign = `${line.align}`
        gCtx.strokeStyle = `${line.outline}`
        gCtx.fillStyle = `${line.color}`
        let pos = line.pos
        gCtx.fillText(line.txt, pos.x, pos.y)
        gCtx.strokeText(line.txt, pos.x, pos.y)

    })
}

function _highLightSelectedLine() {
    var line = getSelectedlineFromData()
    _renderFocusedOutline(line)
}

function _renderFocusedOutline(line) {
    const height = line.fontSize
    const pos = line.pos
    const startX = getStartX(line)
    const startY = pos.y - height
    gCtx.beginPath()
    gCtx.strokeStyle = 'white'
    gCtx.rect(startX, startY, pos.width, height + 10) // x,y,widht,height
    gCtx.stroke()
}

// update the data after each change
function _measureTxtOnCanvas() {
    const txt = getSelectedTxtFromData()
    const width = gCtx.measureText(txt).width
    updateWidthToData(width)
}

// returns the x cords of the line according to the align of the line
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



// CONTROL BTNS FUNC---------------------------------------

function onMoveToNextLine() {
    updateLineIdx();
    activateRenderAccordingToImg();
    updateInputTxt()
}

function ondeleteLine() {
    deleteLineFromData();
    activateRenderAccordingToImg();
    updateInputTxt()
}

function onAddNewLine() {
    document.querySelector('input[name=text]').value = ''
    createNewLine();
    activateRenderAccordingToImg();
}


function onChangeFeature(value, feature) {
    if (feature === 'fontSize') updatefontSize(value);
    else updateMemeFeatures(value, feature);
    _measureTxtOnCanvas();
    activateRenderAccordingToImg();
}


function onClearCanvas() {
    deleteLinesFromData();
    updateLineIdx();
    onAddNewLine();
}


function onDownloadCanvas(elLink) {
    // render image without highlights:
    // rendering the img from the input or from the data
    if (gInputImgEv) renderCanvasFromInputForDownload()
    else renderCanvasForDownload()
    // download rendered image
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-img.jpg';
}





// CHANGING CSS FROM JS : --------------------------------------------------------------

// on mobile to open and close the nav-bar
function onToggleMenu() {
    if (document.body.classList.contains('open-modal')) return
    document.body.classList.toggle('open-menu');
}

function onToggleModal() {
    document.body.classList.toggle('open-modal');
    document.body.classList.remove('open-menu');
}

function onCloseModal() {
    document.querySelector('.modal-gallery').style.display = 'none'
}


function wrapperDisplayEditor() {
    document.querySelector('.wrapper').classList.remove('wrapper-gallery');
}
function wrapperDisplayGallery() {
    document.querySelector('.wrapper').classList.add('wrapper-gallery');
}



function _setTxtInputOnFocus() {
    document.querySelector('input[name=text]').focus()
}

function updateInputTxt() {
    let txt = getSelectedTxtFromData()
    document.querySelector('input[name=text]').value = txt
}



// SEARCH BY KEY----------------------------------------

function onSearchForKeys(key) {
    let imgs = getImgsFromData()
    var filteredGallery = imgs.filter(img => {
        let keywords = img.keywords
        return keywords.some(function (keyword) {
            console.log(keyword);
            return keyword.includes(`${key.toLowerCase()}`)
        })
    })
    renderGallery(filteredGallery)
}


