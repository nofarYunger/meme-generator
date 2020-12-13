'use strict'
// SAVE TO STORGE----------------------------------------

function onSaveCanvas() {
    if (gInputImgEv) renderCanvasFromInputForDownload()
    else renderCanvasForDownload()
    const data = gCanvas.toDataURL();
    var gSavedMemeImgs = loadFromStorage(SAVE_KEY)
    if (!gSavedMemeImgs) gSavedMemeImgs = []
    gSavedMemeImgs.push(data)

    saveToStorage(SAVE_KEY, gSavedMemeImgs)
}

function onShowSavedImgs() {
    renderSavedMemes()
    onShowSavedImgs()
}

function renderSavedMemes() {
    var gSavedMemeImgs = loadFromStorage(SAVE_KEY)
    if (!gSavedMemeImgs) return
    var savedImgs = gSavedMemeImgs.map(save => {
        return ` <img class="saved-meme" onclick="openSavedMeme()" src=${save} alt="">`
    })

    var elSavedImgs = document.querySelector('.saved-imgs')
    elSavedImgs.innerHTML = savedImgs.join('')

}