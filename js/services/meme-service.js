'use strict';

// Global Variables
// Canvas Colors
var gFillColor = '#e66465';
var gStrokeColor = '#f6b73c';

// Canvas functions
function setFillColor(color) {
	gFillColor = color;
}

var gMeme = {
	selectedImgId: 5,
	selectedLineIdx: 0,
	lines: [
		{
			// document.getElementById('#custom-text').innerText,
			txt: '',
			size: 'size',
			align: 'align',
			color: 'color',
		},
	],
};

function setStrokeColor(color) {
	gStrokeColor = color;
}

function setImg(img) {
	gMeme.selectedImgId = img.id;
}

function setText(value) {
	gMeme.lines.txt = value;
	console.log(gMeme);
}

function getImgById(elImgId) {
	var img = gImgs.find((img) => img.id === +elImgId);
	return img;
}

function getMeme() {
	return gMeme;
}
