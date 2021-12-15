'use strict';

function saveToStorage(key, val) {
	localStorage.setItem(key, JSON.stringify(val));
}

function loadFromStorage(key) {
	var val = localStorage.getItem(key);
	return JSON.parse(val);
}

// Meme Handling
// Downloads and Uploads
function downloadCanvas(elLink) {
	const data = gCanvas.toDataURL();
	elLink.href = data;
	elLink.download = 'my-img.jpg';
}

function drawImgFromlocal() {
	var img = new Image();
	img.src = 'img/1.jpg';
	img.onload = () => {
		gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height); //img,x,y,xend,yend
	};
}

// Image handling

function downloadImg(elLink) {
	var imgContent = gCanvas.toDataURL('img/jpeg');
	elLink.href = imgContent;
}

function onImgInput(ev) {
	loadImageFromInput(ev, renderImg);
}

function loadImageFromInput(ev, onImageReady) {
	document.querySelector('.share-container').innerHTML = '';
	var reader = new FileReader();

	reader.onload = (event) => {
		console.log('onload');
		var img = new Image();
		img.onload = onImageReady.bind(null, img);
		img.src = event.target.result;
	};
	console.log('after');
	reader.readAsDataURL(ev.target.files[0]);
}

function renderImg(img) {
	gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

// Upload Service
function uploadImg() {
	const imgDataUrl = gCanvas.toDataURL('img/jpeg');
	console.log(imgDataUrl);

	// A function to be called if request succeeds
	function onSuccess(uploadedImgUrl) {
		const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);
		document.querySelector(
			'.user-msg'
		).innerText = `Your photo is available here: ${uploadedImgUrl}`;

		document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`;
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
