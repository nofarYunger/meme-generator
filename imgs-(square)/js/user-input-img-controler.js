'use strict'


function onImgInput(ev) {
    loadImageFromInput(ev, renderImgFromInput)
    onOpenMemeEditor()
}

// taking the img from the input and saving the event to a global so we can render the canvas after each change
function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader();
    gInputImgEv = ev;
    reader.onload = function (ev) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = ev.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}

function renderImgFromInput(img) {
    // drawing the img on the canvas 
    gCanvas.width = img.width;
    gCanvas.height = img.height;
    gCtx.drawImage(img, 0, 0);

    // rendering txt
    _renderText();
    _setTxtInputOnFocus()
    _highLightSelectedLine()
}

// useing the global gInputImgEv and printing the user img on the canvas
function renderCanvasFromInput() {
    var img = new Image();
    img.src = URL.createObjectURL(gInputImgEv.target.files[0]);
    img.onload = renderImgFromInput.bind(null, img)

}

// render last time before printing without the outline
function renderCanvasFromInputForDownload() {
    var img = new Image();
    img.src = URL.createObjectURL(gInputImgEv.target.files[0]);
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        _renderText();
        _setTxtInputOnFocus()
    }
}


