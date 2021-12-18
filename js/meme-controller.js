'use strict';

// Global Variables
var gElCanvas;
var gCtx;
var gIsDrawing = false;
var pos = {x: 0, y: 0};
var gPrevPos = {x: 0, y: 0};
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

// Canvas Functions

function resizeCanvas() {
	const elContainer = document.querySelector('.canvas-container');
	gElCanvas.width = elContainer.offsetWidth;
	gElCanvas.height = elContainer.offsetHeight;
}

function onClearCanvas() {
	gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function onSetFont(value) {
	var meme = getMeme();
	if (meme.lines.length === 0) return;
	setFont(value);
	document.querySelector('.text-box-sizer').style.fontFamily = value;
	renderMeme();
}

function onImgSelect(elImg) {
	resetGmeme();
	showEditor();
	setImg(elImg);
	renderMeme();
}

function onSetText(value) {
	var meme = getMeme();
	if (meme.lines.length === 0) return;
	setLineText(value);
	renderMeme();
}

function onAddLine() {
	addLine();
	renderMeme();
}

function onArrowUp() {
	var meme = getMeme();
	if (meme.lines.length === 0) return;
	arrowUp();
	renderMeme();
}

function onArrowDown() {
	var meme = getMeme();
	if (meme.lines.length === 0) return;
	arrowDown();
	renderMeme();
}

function onSwitchLine() {
	var meme = getMeme();
	if (meme.lines.length === 0) return;
	switchLine();
	renderMeme();
}

function onSetColor(value) {
	var meme = getMeme();
	if (meme.lines.length === 0) return;
	setColor(value);
	renderMeme();
}

function onSetStrokeColor(value) {
	var meme = getMeme();
	if (meme.lines.length === 0) return;
	setStrokeColor(value);
	renderMeme();
}

function onIncFontSize() {
	var meme = getMeme();
	if (meme.lines.length === 0) return;
	incFontSize();
	renderMeme();
}

function onAlignLeft() {
	var meme = getMeme();
	if (meme.lines.length === 0) return;
	alignLeft();
	renderMeme();
}

function onAlignCenter() {
	var meme = getMeme();
	if (meme.lines.length === 0) return;
	alignCenter();
	renderMeme();
}

function onAlignRight() {
	var meme = getMeme();
	if (meme.lines.length === 0) return;
	alignRight();
	renderMeme();
}

function onDecFontSize() {
	var meme = getMeme();
	if (meme.lines.length === 0) return;
	decFontSize();
	renderMeme();
}

function onRemoveLine() {
	var meme = getMeme();
	if (meme.lines.length === 0) return;
	removeLine();
	renderMeme();
}

// Render Functions

function renderMeme() {
	var meme = getMeme();
	var img = new Image();
	if (meme.selectedImgId === gKeywords.length) {
		img.src = loadFromStorage('newImagesDB');
	} else {
		img.src = `images/square-meme-images/${meme.selectedImgId}.jpg`;
	}
	img.onload = () => {
		gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
		addText();
	};
}

function addText() {
	var meme = getMeme();
	// if (meme.selectedImgId === gKeywords.length) {
	// 	meme = getUserImg();
	// }
	if (meme.selectedLineIdx < 0) {
		meme.selectedLineIdx++;
		return;
	}
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
	var xSize = textSize.clientWidth + 20;
	var ySize = textSize.clientHeight + 5;
	if (currLine.align === 'left') {
		gCtx.beginPath();
		gCtx.rect(currLine.x - 2.5, currLine.y - ySize / 2, xSize, ySize);
		gCtx.lineWidth = 1;
		gCtx.strokeStyle = 'black';
		gCtx.stroke();
		gCtx.closePath();
	} else if (currLine.align === 'center') {
		gCtx.beginPath();
		gCtx.rect(currLine.x - xSize / 2, currLine.y - ySize / 2, xSize, ySize);
		gCtx.lineWidth = 1;
		gCtx.strokeStyle = 'black';
		gCtx.stroke();
		gCtx.closePath();
	} else if (currLine.align === 'right') {
		gCtx.beginPath();
		gCtx.rect(currLine.x + 2.5 - xSize, currLine.y - ySize / 2, xSize, ySize);
		gCtx.lineWidth = 1;
		gCtx.strokeStyle = 'black';
		gCtx.stroke();
		gCtx.closePath();
	}
}

// Modal Functions

function showEditor() {
	document.querySelector('.meme-editor').classList.remove('hide');
	document.querySelector('.img-gallery').classList.add('hide');
	document.querySelector('.search-bar').classList.add('hide');
}

function showGallery() {
	document.querySelector('.meme-editor').classList.add('hide');
	document.querySelector('.img-gallery').classList.remove('hide');
	document.querySelector('.search-bar').classList.remove('hide');
}

function renderShareModal() {
	var elModal = document.querySelector('.modal');
	elModal.classList.remove('about-modal');
	elModal.classList.add('share-modal');
	toggleModal();
	renderMemeWithoutBox();
	elModal.innerHTML = `
				<button class="share-btn">Share</button>
				<button class="save-btn" onclick="onSaveMeme()">Save</button>
				<button class="download-btn">
					<a
						class="download-btn"
						onclick="downloadImg(this)"
						download="my-img.jpg"
					>
						Download</a
					>
				</button>
	`;
}

function renderAboutModal() {
	var elModal = document.querySelector('.modal');
	elModal.classList.add('about-modal');
	elModal.classList.remove('share-modal');
	toggleModal();
	elModal.innerHTML = `
	Tom Rytt
	<a href="https://github.com/tomrytt"><img class="about-img" src="./images/Tom.png" alt="" /></a>
	Fullstack Developer Student
	@ Coding Academy
	`;
}

function toggleModal() {
	document.body.classList.toggle('modal-open');
	document.querySelector('.modal').classList.toggle('hide');
}

// Save Functions

function onSaveMeme() {
	saveMeme();
}

function renderMemeWithoutBox() {
	var meme = getMeme();
	console.log(meme);
	var img = new Image();
	if (meme.selectedImgId === gKeywords.length) {
		img.src = loadFromStorage('newImagesDB');
	} else {
		img.src = `images/square-meme-images/${meme.selectedImgId}.jpg`;
	}
	img.onload = () => {
		gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
		addTextWithoutBox();
	};
}

function addTextWithoutBox() {
	var meme = getMeme();
	if (meme.selectedLineIdx < 0) {
		meme.selectedLineIdx++;
		return;
	}
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
