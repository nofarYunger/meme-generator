'use strict'
var gKeywords = {}
var gImgs;
var gIdx = 1;
var gEmojis = [, '😎', '😍', '🤩', '😴', '🥱','🎁','😛', '😈', '🦄', '👓', '👑', '🎩', '💋', '💖','🎈']
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: []
}

_createImgs()

function _createImgs() {
    gImgs = [
        _createImg('trump', 'politics', 'dark', 'funny'),
        _createImg('cute', 'puppy', 'animal'),
        _createImg('cute', 'puppy', 'baby'),
        _createImg('cute', 'cat', 'animal'),
        _createImg('baby', 'funny'),
        _createImg('profesor', 'school', 'funny', 'aliensS'),
        _createImg('baby', 'funny'),
        _createImg('curious', 'tell me more'),
        _createImg('baby', 'dark'),
        _createImg('politics', 'obama', 'funny'),
        _createImg('funny'),
        _createImg('pointing', 'funny'),
        _createImg('cheers'),
        _createImg('agent', 'funny'),
        _createImg('pointing', 'funny'),
        _createImg('funny'),
        _createImg('politics'),
        _createImg('funny', 'toy story'),
        _createImg('funny', 'profesor', 'aliens'),
        _createImg('opra', 'winning'),
        _createImg('women', 'dancing', 'peace'),
        _createImg('baby', 'dancing', 'funny'),
        _createImg('trump', 'politics', 'dark', 'funny'),
    ]
}

function _createImg(...keys) {
    return {
        id: gIdx,
        url: `img/${gIdx++}.jpg`,
        keywords: [keys]
    }
}

function createNewLine() {
    let posCords = getNewLinePosOnCanvas()
    // let posCordsForMobile =getScreenCords()

    let newLine = {
        txt: '',
        fontSize: 40,
        pos: {
            x: posCords.x,
            y: posCords.y,
            width: 0,
            // screenX: posCordsForMobile.screenX,
            // screenY: posCordsForMobile.screenY
        },
        align: 'center',
        color: 'white',
        outline: 'black',
        font: 'impact',

    }
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function getScreenCords() {

}

function getEmojisFromData() {
    return gEmojis
}



//updating the data from the controler------------------------ 

function updateCurrImgIdToData(newId) {
    gMeme.selectedImgId = newId
}
function updateMemeFeatures(value, feature) {
    gMeme.lines[gMeme.selectedLineIdx][feature] = value
}
function updateWidthToData(width) {
    gMeme.lines[gMeme.selectedLineIdx].pos.width = width
}
function updatefontSize(value) {
    gMeme.lines[gMeme.selectedLineIdx].fontSize += value
}
function updateLineIdx() {
    if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
}
function updateSelectedLineFromClick(idx) {
    gMeme.selectedLineIdx = idx
}

function deleteLineFromData() {
    var currLine = gMeme.selectedLineIdx
    gMeme.lines.splice(currLine, 1)
    if (gMeme.lines.length === 0) createNewLine()
    else gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function deleteLinesFromData() {
    gMeme.lines = []
}

// geting data from the service to the controler----------------------

function getImgsFromData() {
    return gImgs
}
function getTxtFeatuersFromData() {
    return gMeme.lines
}
function getImgIdFromData() {
    return gMeme.selectedImgId
}
function getSelectedLineIdxFromData() {
    return gMeme.selectedLineIdx
}
function getSelectedTxtFromData() {
    return gMeme.lines[gMeme.selectedLineIdx].txt
}
function getSelectedlineFromData() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

