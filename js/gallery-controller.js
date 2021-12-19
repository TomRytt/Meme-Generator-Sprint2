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
	var keyword = document.querySelector(`.${elKeyword}`);
	var style = window
		.getComputedStyle(keyword, null)
		.getPropertyValue('font-size');
	var fontSize = parseFloat(style);
	keyword.style.fontSize = fontSize + 2 + 'px';
	if (elKeyword === 'all') {
		renderGallery();
	} else if (elKeyword === 'user') {
		var userImgs = getSavedImgs();
		if (!userImgs || userImgs.length === 0) {
			keyword.style.fontSize = fontSize = 1.2 + 'rem';
			flash('No saved images');
			return;
		}
		var strHTMLs = userImgs.map((img) => {
			return `
        <div id="${img.id}" onclick="onImgSelect(this)" class="img img${img.id}"><img src="${img.url}" alt=""></div>
        `;
		});
		document.querySelector('.img-gallery').innerHTML = strHTMLs.join('');
	} else {
		var filteredImgs = gImgs.filter(
			(img) =>
				img.keywords.keyword1 === elKeyword ||
				img.keywords.keyword2 === elKeyword
		);
		var strHTMLs = filteredImgs.map((img) => {
			return `
	    <div id="${img.id}" onclick="onImgSelect(this)" class="img img${img.id}"><img src="${img.url}" alt=""></div>
	    `;
		});
		document.querySelector('.img-gallery').innerHTML = strHTMLs.join('');
	}
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
						<option value="user"></option>
					</datalist>
				</div>
				<div class="keywords main-layout">

					<span class= "all" onclick="renderGallery()"">All</span>
					<span class= "funny" onclick="onSetKeyword('funny')">Funny </span
					><span class= "political" onclick="onSetKeyword('political')">Political </span
					><span class= "animal" onclick="onSetKeyword('animal')">Animal</span
					><span class= "cute" onclick="onSetKeyword('cute')">Cute </span
					><span class= "movie" onclick="onSetKeyword('movie')">Movie</span>
					<span class="user" onclick= onSetKeyword('user')>Your images</span>
					<label class="upload-meme-label" for="upload-input"> Upload meme </label>
						<input
							type="file"
							class="upload-input btn-input"
							id="upload-input"
							name="image"
							onchange="onAddMeme(event)"
						/>
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
	document.querySelector(
		'.search-bar'
	).innerHTML = `<h1>Click on Image to download</h1> <button class="clear-memes-btn" onclick="onClearMemesStorage()">Clear Saved Memes</button>`;
	if (!savedMemes || savedMemes.length === 0) {
		flash('No saved memes to show');
		renderGallery();
	}
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

function onAddMeme(ev) {
	addMeme(ev);
	renderMeme();
}
