'use strict'
var gKeywords = {}
var gImgs;
var gIdx = 1;
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
        _createImg('profesor', 'school', 'funny'),
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
    let newLine = {
        txt: '',
        fontSize: 40,
        pos: { x: 250, y: 150, width: 0 },
        align: 'center',
        color: 'white',
        outline: 'black',
        font: 'impact',

    }
    gMeme.lines.push(newLine)
    _positionNewLineOnCanvas()
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function _positionNewLineOnCanvas() {
    const currLine = gMeme.selectedLineIdx
    if (currLine === 0) {
        gMeme.lines[0].pos.x = 250
        gMeme.lines[0].pos.y = 50
    } else if (currLine === 1) {
        gMeme.lines[1].pos.x = 250
        gMeme.lines[1].pos.y = 450
    } else {
        gMeme.lines[currLine].pos.x = 250
        gMeme.lines[currLine].pos.y = 50 * currLine
    }
}


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
function deleteLineFromData() {
    var currLine = gMeme.selectedLineIdx
    gMeme.lines.splice(currLine, 1)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}
function deleteLinesFromData() {
    gMeme.lines =[]
}


function getImgsFromData() {
    return gImgs
}
function getTxtFeatuersFromData() {
    return gMeme.lines
}
function getImgIdFromData() {
    return gMeme.selectedImgId
}
function getSelectedLineFromData() {
    return gMeme.selectedLineIdx
}
function getSelectedTxtFromData() {
    return gMeme.lines[gMeme.selectedLineIdx].txt
}

