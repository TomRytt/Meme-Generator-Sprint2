'use strict';
// Global variables
var gSavedImages = [];

// Gallery
var gNextIdx = 0;
var gImgs = [
	{
		id: gNextIdx,
		url: `images/square-meme-images/${gNextIdx}.jpg`,
		keywords: [],
	},
];
var gKeywords = [
	{keyword1: 'celebrity', keyword2: 'political'},
	{keyword1: 'animal', keyword2: 'cute'},
	{keyword1: 'animal', keyword2: 'cute'},
	{keyword1: 'animal', keyword2: 'cute'},
	{keyword1: 'funny', keyword2: 'cute'},
	{keyword1: 'funny', keyword2: 'political'},
	{keyword1: 'funny', keyword2: 'cute'},
	{keyword1: 'funny', keyword2: 'political'},
	{keyword1: 'funny', keyword2: 'cute'},
	{keyword1: 'celebrity', keyword2: 'political'},
	{keyword1: 'funny', keyword2: 'sport'},
	{keyword1: 'celebrity', keyword2: 'political'},
	{keyword1: 'celebrity', keyword2: 'movie'},
	{keyword1: 'celebrity', keyword2: 'movie'},
	{keyword1: 'celebrity', keyword2: 'movie'},
	{keyword1: 'celebrity', keyword2: 'movie'},
	{keyword1: 'celebrity', keyword2: 'political'},
	{keyword1: 'funny', keyword2: 'movie'},
];

function _createImg(keywords, keyword3) {
	if (keyword3) {
		var img = {
			id: ++gNextIdx,
			url: keyword3,
			keywords: keywords,
		};
		gSavedImages.push(img);
		saveToStorage('userImgs', gSavedImages);
		return img;
	}
	return {
		id: ++gNextIdx,
		url: `images/square-meme-images/${gNextIdx}.jpg`,
		keywords: keywords,
	};
}

function _createGallery() {
	gImgs = gKeywords.map((keywords) => {
		return _createImg(keywords);
	});
}

function getImgs() {
	return gImgs;
}

function addMeme(ev) {
	resetGmeme();
	showEditor();
	onImgInput(ev);
}

// var gKeywordSearchCountMap = {
// 	celebrity: 0,
// 	political: 0,
// 	cute: 0,
// 	funny: 0,
// 	animal: 0,
// 	sport: 0,
// 	movie: 0,
// };
