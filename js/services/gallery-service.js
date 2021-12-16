'use strict';
// Global variables
// var gKeywordSearchCountMap = {funny: 12, cat: 16, baby: 2};
const STORAGE_KEY = 'ImagesDB';
// Gallery
var gNextIdx = 0;
var gMAxIdx = 18;

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

function _createImg(keyword1, keyword2) {
	return {
		id: ++gNextIdx,
		url: `images/square-meme-images/${gNextIdx}.jpg`,
		keyWords: [keyword1, keyword2],
	};
}

function _createGallery() {
	var imgs = loadFromStorage(STORAGE_KEY);
	if (!imgs || !imgs.length) {
		var imgs = (gImgs = gKeywords.map((keyword1, keyword2) => {
			return _createImg(keyword1, keyword2);
		}));
	}
}
