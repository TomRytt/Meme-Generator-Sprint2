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
