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
	selectedImgId: '',
	selectedLineIdx: 0,
	lines: [
		{
			txt: '',
			size: 50,
			align: 'align',
			color: 'color',
			x: 250,
			y: 50,
		},
		{
			txt: '',
			size: 50,
			align: 'align',
			color: 'color',
			x: 250,
			y: 450,
		},
	],
};

function setImg(img) {
	gMeme.selectedImgId = img.id;
}

function setLineText(value) {
	gMeme.lines[gMeme.selectedLineIdx].txt = value;
}

function setColor(value) {
	gMeme.lines[gMeme.selectedLineIdx].color = value;
	console.log(gMeme);
}

function incFontSize() {
	gMeme.lines[gMeme.selectedLineIdx].size += 5;
}

function decFontSize() {
	gMeme.lines[gMeme.selectedLineIdx].size -= 5;
}

function addLine() {
	gMeme.lines.push({
		txt: '',
		size: 50,
		align: 'align',
		color: 'color',
		x: 250,
		y: 250,
	});
}

function switchLine() {
	gMeme.selectedLineIdx++;
	if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0;
}

function getImgById(elImgId) {
	var img = gImgs.find((img) => img.id === +elImgId);
	return img;
}

function getMeme() {
	return gMeme;
}
