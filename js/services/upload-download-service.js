// Meme Handling
// Downloads and Uploads

function drawImgFromlocal() {
	var img = new Image();
	img.src = 'img/1.jpg';
	img.onload = () => {
		gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height); //img,x,y,xend,yend
	};
}

// Image handling

function downloadImg(elLink) {
	var imgContent = gElCanvas.toDataURL('img/jpeg');
	elLink.href = imgContent;
}

function onImgInput(ev) {
	loadImageFromInput(ev, renderMeme);
}

function loadImageFromInput(ev, onImageReady) {
	document.querySelector('.share-container').innerHTML = '';
	var reader = new FileReader();
	reader.onload = (event) => {
		var img = new Image();
		img.onload = onImageReady.bind(null, img);
		img.src = event.target.result;
		saveToStorage('newImg', img.src);
		gMeme.selectedImgId = gKeywords.length;
		_createImg('user', img.src);
	};
	reader.readAsDataURL(ev.target.files[0]);
}

function uploadImg() {
	const imgDataUrl = gElCanvas.toDataURL();
	function onSuccess(uploadedImgUrl) {
		const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);
		document.querySelector('.modal').innerHTML = `<a class="btn fb-share"
       href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" 
       title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.
       php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">Share On FaceBook!</a>`;
	}
	doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {
	const formData = new FormData();
	formData.append('img', imgDataUrl);

	fetch('//ca-upload.com/here/upload.php', {
		method: 'POST',
		body: formData,
	})
		.then((res) => res.text())
		.then((url) => {
			console.log('Got back live url:', url);
			onSuccess(url);
		})
		.catch((err) => {
			console.error(err);
		});
}

// function renderImg(img) {
// 	gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
// }

// Upload Service
// function uploadImg() {
// 	const imgDataUrl = gElCanvas.toDataURL('img/jpeg');
// 	console.log(imgDataUrl);

// 	// A function to be called if request succeeds
// 	function onSuccess(uploadedImgUrl) {
// 		const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);
// 		document.querySelector(
// 			'.user-msg'
// 		).innerText = `Your photo is available here: ${uploadedImgUrl}`;

// 		document.querySelector('.share-container').innerHTML = `
//         <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
//            Share
//         </a>`;
// 	}
// 	doUploadImg(imgDataUrl, onSuccess);
// }
