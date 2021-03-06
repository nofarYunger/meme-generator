'use strict'

// on submit call to this function
function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");
    
    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.publish-span').innerText = ''
        document.querySelector('.share-container').innerHTML = `
        <a class="btn-extra" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
        Share on facebook  
        </a>`
    }
    
    doUploadImg(elForm, onSuccess);
    setTimeout(resetBtn, 10000)
}

function doUploadImg(elForm, onSuccess) {

    var formData = new FormData(elForm);
    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function (err) {
            console.error(err)
        })
}

function resetBtn() {
    document.querySelector('.publish-span').innerText = 'Publish'
    document.querySelector('.share-container').innerText=''
}
