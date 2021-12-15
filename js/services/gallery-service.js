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

// function getImgs() {
// 	var books = gBooks;
// 	const startIdx = gPageIdx * PAGE_SIZE;
// 	books = books.slice(startIdx, startIdx + PAGE_SIZE);
// 	return books;
// }

// Utils- delete
// function _createBooks(name, imgIdx) {
// 	var books = loadFromStorage(STORAGE_KEY);
// 	if (!books || !books.length) {
// 		var books = (gBooks = gNames.map((name) => {
// 			return _createBook(name);
// 		}));
// 	}
// 	gBooks = books;
// 	_saveBooksToStorage();
// }

// function _createBook(name, price = getRandomIntInclusive(10, 100)) {
// 	gNextId++;
// 	return {
// 		id: gNextId,
// 		name: name,
// 		price: price + '₪',
// 		img: `<img src="imgs/${gNextId}.jpg" alt="">`,
// 		rate: 0,
// 	};
// }

// function addImage () {
//     gMaxIdx++
// }
