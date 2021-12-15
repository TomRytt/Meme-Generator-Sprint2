'use strict';

// Global Variables
var gElCanvas;
var gCtx;
var gIsDrawing = false;
var pos = {x: 0, y: 0};
var gPrevPos = {x: 0, y: 0};

// function renderMeme() {}

function resizeCanvas() {
	const elContainer = document.querySelector('.canvas-container');
	gElCanvas.width = elContainer.offsetWidth;
	gElCanvas.height = elContainer.offsetHeight;
}

// Canvas Functions
function onClearCanvas() {
	gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function addListeners() {
	// addMouseListeners();
	// addTouchListeners();
	window.addEventListener('resize', () => {
		resizeCanvas();
	});
}

function onImgSelect(elImg) {
	var memeImg = getImgById(elImg.id);
	setImg(memeImg);
	renderMeme();
}

function onSelectText(value) {
	setText(value);
	renderMeme();
}

function renderMeme() {
	var meme = getMeme();
	console.log(meme);
	var img = new Image();
	img.src = `images/square-meme-images/${meme.selectedImgId}.jpg`;
	img.onload = () => {
		gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
		addText(500, 50);
	};
}

// function drawMeme()

function addText(x, y) {
	var meme = getMeme();
	var txt = meme.lines.txt;
	if (meme.lines.txt === undefined) txt = '';
	// gCtx.font = '48px serif';
	// gCtx.fillText(txt, x, y);
	gCtx.textBaseline = 'middle';
	gCtx.textAlign = 'center';
	// 	gCtx.lineWidth = 2;
	// 	gCtx.strokeStyle = 'red';
	gCtx.font = '50px monospace';
	gCtx.fillStyle = 'black';
	gCtx.fillText(txt, x, y);
	gCtx.strokeText(txt, x, y);
}
