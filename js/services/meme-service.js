'use strict';

// Global Variables
// Canvas Colors
var gFillColor = '#e66465';
var gStrokeColor = '#f6b73c';
const STORAGE_KEY = 'memesDB';

// Canvas functions
function setFillColor(color) {
	gFillColor = color;
}

var gMeme = {
	selectedImgId: 5,
	selectedLineIdx: 0,
	lines: [
		{
			txt: '',
			size: 30,
			align: 'left',
			strokeColor: 'black',
			color: 'white',
			font: 'impact',
			x: 15,
			y: 50,
		},
		{
			txt: '',
			size: 30,
			align: 'left',
			strokeColor: 'black',
			color: 'white',
			font: 'impact',
			x: 15,
			y: 375,
		},
	],
};

function resetGmeme() {
	gMeme = {
		selectedImgId: 5,
		selectedLineIdx: 0,
		lines: [
			{
				txt: '',
				size: 30,
				align: 'left',
				strokeColor: 'black',
				color: 'white',
				font: 'impact',
				x: 15,
				y: 50,
			},
			{
				txt: '',
				size: 30,
				align: 'left',
				strokeColor: 'black',
				color: 'white',
				font: 'impact',
				x: 15,
				y: 375,
			},
		],
	};
}

function setImg(img) {
	gMeme.selectedImgId = img.id;
}

function setLineText(value) {
	gMeme.lines[gMeme.selectedLineIdx].txt = value;
}

function setColor(value) {
	gMeme.lines[gMeme.selectedLineIdx].color = value;
}

function setStrokeColor(value) {
	gMeme.lines[gMeme.selectedLineIdx].strokeColor = value;
}

function setFont(value) {
	gMeme.lines[gMeme.selectedLineIdx].font = value;
}

function incFontSize() {
	if (gMeme.lines[gMeme.selectedLineIdx].size === 65) return;
	gMeme.lines[gMeme.selectedLineIdx].size += 2.5;
}

function decFontSize() {
	if (gMeme.lines[gMeme.selectedLineIdx].size === 20) return;
	gMeme.lines[gMeme.selectedLineIdx].size -= 2.5;
}

function addLine() {
	gMeme.lines.push({
		txt: '',
		size: 30,
		align: 'left',
		strokeColor: 'black',
		color: 'white',
		font: 'impact',
		x: 165,
		y: 180,
	});
}

function arrowUp() {
	if (gMeme.lines[gMeme.selectedLineIdx].y === 40) return;
	gMeme.lines[gMeme.selectedLineIdx].y -= 10;
}

function arrowDown() {
	if (gMeme.lines[gMeme.selectedLineIdx].y === 400) return;
	gMeme.lines[gMeme.selectedLineIdx].y += 10;
}

function switchLine() {
	gMeme.selectedLineIdx++;
	if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0;
}

function alignLeft() {
	gMeme.lines[gMeme.selectedLineIdx].x = 15;
	gMeme.lines[gMeme.selectedLineIdx].align = 'left';
	renderMeme();
}

function alignCenter() {
	gMeme.lines[gMeme.selectedLineIdx].x = 200;
	gMeme.lines[gMeme.selectedLineIdx].align = 'center';
	renderMeme();
}

function alignRight() {
	gMeme.lines[gMeme.selectedLineIdx].x = 475;
	gMeme.lines[gMeme.selectedLineIdx].align = 'right';
	renderMeme();
}

function getImgById(elImgId) {
	var img = gImgs.find((img) => img.id === +elImgId);
	return img;
}

function getMeme() {
	return gMeme;
}
