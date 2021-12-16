'use strict';

// Global Variables
var gElCanvas;
var gCtx;
var gIsDrawing = false;
var pos = {x: 0, y: 0};
var gPrevPos = {x: 0, y: 0};
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

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

// function addTouchListeners() {
// 	gElCanvas.addEventListener('touchmove', onMove);
// 	gElCanvas.addEventListener('touchstart', onDown);
// 	gElCanvas.addEventListener('touchend', onUp);
// }

// function addMouseListeners() {
// 	gElCanvas.addEventListener('mousemove');
// 	gElCanvas.addEventListener('mousedown');
// 	gElCanvas.addEventListener('mouseup');
// 	gElCanvas.addEventListener('mouseleave');
// }

function onSetFont(value) {
	setFont(value);
	renderMeme();
}

function onImgSelect(elImg) {
	resetGmeme();
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
	drawRect(meme);
	meme.lines.forEach((line) => {
		var txt = line.txt;
		var fontSize = line.size;
		var txtColor = line.color;
		var txtStrokeColor = line.strokeColor;
		var font = line.font;
		var align = line.align;
		gCtx.textBaseline = 'middle';
		gCtx.textAlign = align;
		gCtx.fillStyle = txtColor;
		gCtx.strokeStyle = txtStrokeColor;
		gCtx.font = `${fontSize}px ${font}`;
		gCtx.fillText(txt, line.x, line.y);
		gCtx.strokeText(txt, line.x, line.y);
	});
}

function drawRect(meme) {
	var currLine = meme.lines[meme.selectedLineIdx];
	if (!currLine.txt) return;
	var textSize = document.querySelector('.text-box-sizer');
	textSize.style.textAlign = currLine.align;
	textSize.innerText = currLine.txt;
	textSize.style.fontSize = currLine.size + 'px';
	var xSize = textSize.clientWidth + 25;
	var ySize = textSize.clientHeight + 5;
	if (currLine.align === 'left') {
		console.log('left');
		gCtx.beginPath();
		gCtx.rect(currLine.x, currLine.y - ySize / 2, xSize, ySize);
		gCtx.lineWidth = 1;
		gCtx.strokeStyle = 'black';
		gCtx.stroke();
		gCtx.closePath();
	} else if (currLine.align === 'center') {
		console.log('center');
		gCtx.beginPath();
		gCtx.rect(currLine.x - xSize / 2, currLine.y - ySize / 2, xSize, ySize);
		gCtx.lineWidth = 1;
		gCtx.strokeStyle = 'black';
		gCtx.stroke();
		gCtx.closePath();
	} else if (currLine.align === 'right') {
		console.log('right');
		gCtx.beginPath();
		gCtx.rect(currLine.x - xSize, currLine.y - ySize / 2, xSize, ySize);
		gCtx.lineWidth = 1;
		gCtx.strokeStyle = 'black';
		gCtx.stroke();
		gCtx.closePath();
	}
}

// Save Without Box

function renderMemeWithoutBox(elLink) {
	let link = elLink;
	var meme = getMeme();
	var img = new Image();
	img.src = `images/square-meme-images/${meme.selectedImgId}.jpg`;
	img.onload = () => {
		gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
		addTextWithoutBox();
		downloadImg(link);
	};
}

function addTextWithoutBox() {
	var meme = getMeme();
	meme.lines.forEach((line) => {
		var txt = line.txt;
		var fontSize = line.size;
		var txtColor = line.color;
		var txtStrokeColor = line.strokeColor;
		var font = line.font;
		var align = line.align;
		gCtx.textBaseline = 'middle';
		gCtx.textAlign = align;
		gCtx.fillStyle = txtColor;
		gCtx.strokeStyle = txtStrokeColor;
		gCtx.font = `${fontSize}px ${font}`;
		gCtx.fillText(txt, line.x, line.y);
		gCtx.strokeText(txt, line.x, line.y);
	});
}
