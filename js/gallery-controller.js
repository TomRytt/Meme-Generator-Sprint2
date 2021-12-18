'use strict';

function onInit() {
	// Gallery
	_createGallery();
	renderGallery();
	// Canvas
	gElCanvas = document.querySelector('canvas');
	gCtx = gElCanvas.getContext('2d');
	resizeCanvas();
}

function onSetKeyword(elKeyword) {
	console.log(elKeyword);
	if (elKeyword === 'all') {
		renderGallery();
		showGallery();
	}
	var filteredImgs = gImgs.filter(
		(img) =>
			img.keyWords[0]['keyword1'] === elKeyword ||
			img.keyWords[0]['keyword2'] === elKeyword
	);
	const strHTMLs = filteredImgs.map((img) => {
		return `
	    <div id="${img.id}" onclick="onImgSelect(this)" class="img img${img.id}"><img src="${img.url}" alt=""></div>
	    `;
	});
	document.querySelector('.img-gallery').innerHTML = strHTMLs.join('');
}

function renderGallery() {
	showGallery();
	const strHTMLs = gImgs.map((img) => {
		return `
        <div id="${img.id}" onclick="onImgSelect(this)" class="img img${img.id}"><img src="${img.url}" alt=""></div>
        `;
	});
	document.querySelector('.img-gallery').innerHTML = strHTMLs.join('');
}

function renderSavedMemesGallery() {
	showGallery();
	var savedMemes = loadFromStorage(STORAGE_KEY);
	const strHTMLs = savedMemes.map((meme) => {
		return `
        <a href="${meme.url}" download="my-meme.jpg"><img src="${meme.url}" alt=""></a>
        `;
	});
	document.querySelector('.img-gallery').innerHTML = strHTMLs.join('');
}

function toggleMenu() {
	document.body.classList.toggle('menu-open');
}
