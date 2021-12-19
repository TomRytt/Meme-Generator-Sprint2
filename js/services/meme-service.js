'use strict';

// Global Variables
var gSavedMemes = [];
var gSavedImages = [];
var gNewMemeIdx = 19;
var gElCanvas = 5;
const STORAGE_KEY = 'memesDB';
var gUserImg = loadFromStorage('newImagesDB');
var gIsShare = false;
var gMeme;
var gSelectedLine = getSelectedLine();

// Canvas functions

// Functions

function resetGmeme() {
	gMeme = {
		selectedImgId: 5,
		selectedLineIdx: 0,
		lines: [
			{
				txt: 'Enter Text Here',
				size: 30,
				align: 'center',
				strokeColor: 'black',
				color: 'white',
				font: 'impact',
				x: gElCanvas.width / 2,
				y: 50,
			},
			{
				txt: 'Enter Text Here',
				size: 30,
				align: 'center',
				strokeColor: 'black',
				color: 'white',
				font: 'impact',
				x: gElCanvas.width / 2,
				y: gElCanvas.height - 30,
			},
		],
	};
}

function setImg(img) {
	gMeme.selectedImgId = img.id;
}

function setLineText(value) {
	getSelectedLine().txt = value;
}

function setColor(value) {
	getSelectedLine().color = value;
}

function setStrokeColor(value) {
	getSelectedLine().strokeColor = value;
}

function setFont(value) {
	getSelectedLine().font = value;
}

function setFontSize(value) {
	if (value === 'inc') {
		if (getSelectedLine().size === 65) return;
		getSelectedLine().size += 2.5;
	} else if (value === 'dec') {
		if (getSelectedLine().size === 20) return;
		getSelectedLine().size -= 2.5;
	}
}

function addLine() {
	gMeme.lines.push({
		txt: 'New Line',
		size: 30,
		align: 'center',
		strokeColor: 'black',
		color: 'white',
		font: 'impact',
		x: gElCanvas.width / 2,
		y: gElCanvas.height / 2,
	});
}

function moveText(value) {
	if (value === 'up') {
		if (getSelectedLine().y === 30) return;
		getSelectedLine().y -= 10;
	} else if (value === 'down') {
		if (gMeme.lines[gMeme.selectedLineIdx].y === gElCanvas.height - 50) return;
		gMeme.lines[gMeme.selectedLineIdx].y += 10;
	}
}

function switchLine() {
	gMeme.selectedLineIdx++;
	if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0;
}

function removeLine() {
	gMeme.lines.splice(gMeme.selectedLineIdx, 1);
	if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx--;
}

function alignLine(value) {
	if (value === 'left') {
		getSelectedLine().x = 15;
		getSelectedLine().align = 'left';
	} else if (value === 'center') {
		getSelectedLine().x = gElCanvas.width / 2;
		getSelectedLine().align = 'center';
	} else if (value === 'right') {
		getSelectedLine().x = gElCanvas.width - 10;
		getSelectedLine().align = 'right';
	}
}

function getImgById(elImgId) {
	var img = gImgs.find((img) => img.id === +elImgId);
	return img;
}

function getMeme() {
	return gMeme;
}

function saveMeme() {
	var currMeme = gMeme;
	currMeme.url = gElCanvas.toDataURL('img/jpeg');
	currMeme.id = gNewMemeIdx;
	gSavedMemes.push(currMeme);
	saveToStorage(STORAGE_KEY, gSavedMemes);
	gNewMemeIdx++;
}

function getUserImg() {
	return gUserImg;
}

function getSelectedLine() {
	if (!gMeme) return;
	return gMeme.lines[gMeme.selectedLineIdx];
}

function clearMemesStorage() {
	localStorage.clear('memesDB');
	renderGallery();
}

function getSavedImgs() {
	gSavedImages = loadFromStorage('userImgs');
	return gSavedImages;
}
