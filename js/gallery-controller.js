'use strict';

function onInit() {
	// Gmeme
	resetGmeme();
	// Gallery
	_createGallery();
	renderGallery();
	// Canvas
	gElCanvas = document.querySelector('canvas');
	gCtx = gElCanvas.getContext('2d');
	resizeCanvas();
}

function onSetKeyword(elKeyword) {
	console.log(elKeyword);
	if (elKeyword === 'all') {
		renderGallery();
	}
	var filteredImgs = gImgs.filter(
		(img) =>
			img.keyWords[0]['keyword1'] === elKeyword ||
			img.keyWords[0]['keyword2'] === elKeyword
	);
	const strHTMLs = filteredImgs.map((img) => {
		return `
	    <div id="${img.id}" onclick="onImgSelect(this)" class="img img${img.id}"><img src="${img.url}" alt=""></div>
	    `;
	});
	document.querySelector('.img-gallery').innerHTML = strHTMLs.join('');
}

function renderGallery() {
	document.querySelector('.search-bar').innerHTML = `
					<div class="search-keyword">
					<input
						onchange="onSetKeyword(value)"
						list="keywords"
						type="text"
						name="keywords"
						placeholder="Enter search keyword🔎"
					/>
					<datalist id="keywords">
						<option value="all"></option>
						<option value="funny"></option>
						<option value="political"></option>
						<option value="animal"></option>
						<option value="cute"></option>
						<option value="movie"></option>
					</datalist>
				</div>
				<div class="keywords main-layout">
					<span onclick="renderGallery()">All</span>
					<span onclick="onSetKeyword('funny')">Funny </span
					><span onclick="onSetKeyword('political')">Political </span
					><span onclick="onSetKeyword('animal')">Animal</span
					><span onclick="onSetKeyword('cute')">Cute </span
					><span onclick="onSetKeyword('movie')">Movie</span>
				</div>`;
	var imgs = getImgs();
	const strHTMLs = imgs.map((img) => {
		return `
        <div id="${img.id}" onclick="onImgSelect(this)" class="img img${img.id}"><img src="${img.url}" alt=""></div>
        `;
	});
	document.querySelector('.img-gallery').innerHTML = strHTMLs.join('');
	showGallery();
}

function renderSavedMemesGallery() {
	var savedMemes = loadFromStorage(STORAGE_KEY);
	if (!savedMemes || savedMemes.length === 0) return;
	document.querySelector(
		'.search-bar'
	).innerHTML = `<h1>Click on Image to download</h1> <button class="clear-memes-btn" onclick="onClearMemesStorage()">Clear Saved Memes</button>`;
	const strHTMLs = savedMemes.map((meme) => {
		return `
        <a href="${meme.url}" download="my-meme.jpg"><img src="${meme.url}" alt=""></a>
        `;
	});
	document.querySelector('.img-gallery').innerHTML = strHTMLs.join('');
	showGallery();
}

function toggleMenu() {
	document.body.classList.toggle('menu-open');
}

function onClearMemesStorage() {
	clearMemesStorage();
}
