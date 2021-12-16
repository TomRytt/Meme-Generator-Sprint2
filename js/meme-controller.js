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
	// 	window.addEventListener('resize', () => {
	// 		resizeCanvas();
	// 	});
}

function onSetFont(value) {
	setFont(value);
	renderMeme();
}

function onImgSelect(elImg) {
	var memeImg = getImgById(elImg.id);
	showEditor();
	setImg(memeImg);
	renderMeme();
}

function onSetText(value) {
	setLineText(value);
	renderMeme();
}

function onAddLine() {
	addLine();
	renderMeme();
}

function onArrowUp() {
	arrowUp();
	renderMeme();
}

function onArrowDown() {
	arrowDown();
	renderMeme();
}

function onSwitchLine() {
	switchLine();
	renderMeme();
}

function onSetColor(value) {
	setColor(value);
	renderMeme();
}

function onSetStrokeColor(value) {
	setStrokeColor(value);
	renderMeme();
}

function onIncFontSize() {
	incFontSize();
	renderMeme();
}

function onAlignLeft() {
	alignLeft();
	renderMeme();
}

function onAlignCenter() {
	alignCenter();
	renderMeme();
}

function onAlignRight() {
	alignRight();
	renderMeme();
}

function onDecFontSize() {
	decFontSize();
	renderMeme();
}

function renderMeme() {
	var meme = getMeme();
	// var idx = meme.selectedLineIdx;
	console.log(meme);
	var img = new Image();
	img.src = `images/square-meme-images/${meme.selectedImgId}.jpg`;
	img.onload = () => {
		gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
		addText();
	};
}

function showEditor() {
	document.querySelector('.meme-editor').classList.remove('hide');
	document.querySelector('.img-gallery').classList.add('hide');
}

function showGallery() {
	document.querySelector('.meme-editor').classList.add('hide');
	document.querySelector('.img-gallery').classList.remove('hide');
}

// function drawMeme()

function addText() {
	var meme = getMeme();
	gCtx.beginPath();
	gCtx.rect(
		meme.lines[meme.selectedLineIdx].x - 130,
		meme.lines[meme.selectedLineIdx].y - 30,
		meme.lines[meme.selectedLineIdx].x + 225,
		60
	);
	gCtx.lineWidth = 2;
	gCtx.strokeStyle = 'black';
	gCtx.stroke();
	gCtx.closePath();
	meme.lines.forEach((line) => {
		var txt = line.txt;
		var fontSize = line.size;
		var txtColor = line.color;
		var txtStrokeColor = line.strokeColor;
		var font = line.font;
		gCtx.textBaseline = 'middle';
		gCtx.textAlign = 'center';
		gCtx.fillStyle = txtColor;
		gCtx.strokeStyle = txtStrokeColor;
		gCtx.font = `${fontSize}px ${font}`;
		console.log(gCtx.font);
		gCtx.fillText(txt, line.x, line.y);
		gCtx.strokeText(txt, line.x, line.y);
	});
	// console.log(meme.selectedLineIdx);
	// var txt = meme.lines[meme.selectedLineIdx].txt;
	// var fontSize = meme.lines[meme.selectedLineIdx].size;
	// var txtColor = meme.lines[meme.selectedLineIdx].color;
	// // gCtx.font = '48px serif';
	// // gCtx.fillText(txt, x, y);
	// gCtx.textBaseline = 'middle';
	// gCtx.textAlign = 'center';
	// // 	gCtx.lineWidth = 2;
	// // 	gCtx.strokeStyle = 'red';
	// gCtx.font = `${fontSize}px monospace`;
	// gCtx.fillStyle = txtColor;
	// gCtx.fillText(txt, x, y);
	// gCtx.strokeText(txt, x, y);
}
