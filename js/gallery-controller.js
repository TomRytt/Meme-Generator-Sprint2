'use strict';

function onInit() {
	// Gallery
	_createGallery();
	renderGallery();
	// Canvas
	gElCanvas = document.querySelector('canvas');
	gCtx = gElCanvas.getContext('2d');
	resizeCanvas();
	addListeners();
}

function renderGallery() {
	const strHTMLs = gImgs.map((img) => {
		return `
        <div id="${img.id}" onclick="onImgSelect(this)" class="img img${img.id}"><img src="${img.url}" alt=""></div>
        `;
	});
	document.querySelector('.img-gallery').innerHTML = strHTMLs.join('');
}

function toggleMenu() {
	document.body.classList.toggle('menu-open');
}

// function addMouseListeners() {
// 	gElCanvas.addEventListener('mousemove', onDraw);
// 	gElCanvas.addEventListener('mousedown', onStartDrawing);
// 	gElCanvas.addEventListener('mouseup', onStopDrawing);
// 	gElCanvas.addEventListener('mouseleave', onStopDrawing);
// }

// function addTouchListeners() {
// 	gElCanvas.addEventListener('touchmove', onMove);
// 	gElCanvas.addEventListener('touchstart', onDown);
// 	gElCanvas.addEventListener('touchend', onUp);
// }

// function onSetFillColor(color) {
// 	setFillColor(color);
// }

// function onSetStrokeColor(color) {
// 	setStrokeColor(color);
// }

// function drawText(txt, x, y) {
// 	// gCtx.font = '48px serif';
// 	// gCtx.fillText(txt, x, y);
// 	gCtx.textBaseline = 'middle';
// 	gCtx.textAlign = 'center';
// 	// gCtx.lineWidth = 2;
// 	// gCtx.strokeStyle = 'red';
// 	gCtx.font = '50px monospace';
// 	gCtx.fillStyle = 'black';
// 	gCtx.fillText(txt, x, y);
// 	// gCtx.strokeText(txt, x, y);
// }
