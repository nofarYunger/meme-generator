'use strict'

function onImgInput(ev) {
    loadImageFromInput(ev, renderCanvas)
    setTimeout(resetBtn,2000)
}
function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader();
    
    reader.onload = function (event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}

function resetBtn(){
    document.querySelector('.publish-span').innerText = 'Publish'
}