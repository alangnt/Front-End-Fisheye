let currentMediaIndex = 0;
let currentMediaList = [];

displayHeaderSection = ({ name, city, country, tagline, portrait }) => {
	const photographerHeaderSection = document.querySelector('.photographer-header');
	const picture = `assets/photographers/${portrait}`;
	
	const infoSection = document.createElement('article');
	infoSection.classList.add('photographer-header-info-section');
	const nameInfo = document.createElement('h1');
	nameInfo.textContent = name;
	const locationInfo = document.createElement('h2');
	locationInfo.textContent = `${city}, ${country}`;
	const tagLine = document.createElement('h3');
	tagLine.textContent = tagline;
	infoSection.appendChild(nameInfo);
	infoSection.appendChild(locationInfo);
	infoSection.appendChild(tagLine);
	photographerHeaderSection.appendChild(infoSection);
	
	const contactButton = document.createElement('button');
	contactButton.textContent = 'Contactez-moi';
	contactButton.addEventListener('click', e => displayModal());
	contactButton.classList.add('photographer-header-contact');
	photographerHeaderSection.appendChild(contactButton);
	
	const photographerImage = document.createElement('img');
	photographerImage.setAttribute('src', picture);
	photographerImage.setAttribute('alt', name);
	photographerImage.classList.add('photographer-header-image');
	photographerHeaderSection.appendChild(photographerImage);
	
	return photographerHeaderSection;
}

displayPictures = (pictures) => {
	// For each picture, adds its like value
	let likesValue = 0;
	
	const photographerMediaSection = document.querySelector('.photographer-pictures');
	
	pictures.forEach(picture => {
		const { photographerId, title, image, video, likes } = picture;
		const mediaContainer = document.createElement('article');
		let mediaElement;
		let mediaSrc;
		
		if (image) {
			mediaSrc = `assets/images/${photographerId}/${image}`;
			mediaElement = document.createElement('img');
			mediaElement.setAttribute('src', mediaSrc);
			mediaElement.setAttribute('alt', title || 'Pas de titre');
		} else if (video) {
			mediaSrc = `assets/images/${photographerId}/${video}`;
			mediaElement = document.createElement('video');
			mediaElement.setAttribute('width', '350');
			mediaElement.setAttribute('height', '350');
			
			const source = document.createElement('source');
			source.setAttribute('src', mediaSrc);
			source.setAttribute('type', 'video/mp4');
			mediaElement.appendChild(source);
		} else {
			console.warn('Skipping media with no image or video:', picture);
			return;
		}
		
		mediaContainer.appendChild(mediaElement);
		
		const infoContainer = document.createElement('div');
		infoContainer.classList.add('photographer-media-info-container');
		
		const mediaTitle = document.createElement('h4');
		mediaTitle.textContent = title;
		
		const likesAmountContainer = document.createElement('div');
		likesAmountContainer.classList.add('photographer_media_likes');
		
		const likesAmount = document.createElement('p');
		likesAmount.textContent = likes;
		
		const likesLogo = document.createElement('i');
		likesLogo.setAttribute('class', 'fa-solid fa-heart');
		
		likesAmountContainer.appendChild(likesAmount);
		likesAmountContainer.appendChild(likesLogo);
		
		infoContainer.appendChild(mediaTitle);
		infoContainer.appendChild(likesAmountContainer);
		mediaContainer.appendChild(infoContainer);
		
		mediaContainer.addEventListener('click', () => {
			currentMediaList = pictures;
			currentMediaIndex = pictures.indexOf(picture);
			openLightbox(currentMediaList[currentMediaIndex]);
		});
		
		photographerMediaSection.appendChild(mediaContainer);
		
		likesValue += likes;
	});
	
	const totalLikes = document.querySelector('.photographer_total_likes');
	totalLikes.textContent = likesValue;
	
	return photographerMediaSection;
}

displayPhotographer = async (photographer) => {
	const { name, portrait, city, country, tagline, price, id } = photographer;
	
	displayPhotographerName(name);
	displayPhotographerPricing(price);
	
	return displayHeaderSection({ name, city, country, tagline, portrait });
}

function openLightbox(media) {
	const lightbox = document.getElementById('lightbox');
	const content = lightbox.querySelector('.lightbox-content');
	content.innerHTML = '';
	
	let element;
	const mediaSrc = `assets/images/${media['photographerId']}/${media.image || media.video}`;
	
	if (media.image) {
		element = document.createElement('img');
		element.src = mediaSrc;
		element.alt = media.title;
	} else {
		element = document.createElement('video');
		element.controls = true;
		element.innerHTML = `<source src="${mediaSrc}" type="video/mp4">`;
	}
	
	content.appendChild(element);
	lightbox.classList.remove('hidden');
	document.body.classList.add('no-scroll');
}

function closeLightbox() {
	document.getElementById('lightbox').classList.add('hidden');
	document.body.classList.remove('no-scroll');
}


function showNext() {
	currentMediaIndex = (currentMediaIndex + 1) % currentMediaList.length;
	openLightbox(currentMediaList[currentMediaIndex]);
}

function showPrev() {
	currentMediaIndex = (currentMediaIndex - 1 + currentMediaList.length) % currentMediaList.length;
	openLightbox(currentMediaList[currentMediaIndex]);
}

displayPhotographerName = (photographerName) => {
	return document.getElementById("contact_modal_name").textContent = photographerName;
}

displayPhotographerPricing = (price) => {
	const pricing = document.querySelector('.photographer_pricing');
	pricing.textContent = `${price}€/jour`;
}

sortPictures = (pictures) => {
	const select = document.getElementById('nav-filters');
	
	return pictures.sort((a, b) => {
		if (select.value === "popularity") return b['likes'] - a['likes'];
		else if (select.value === "date") return new Date(b['date']) - new Date(a['date']);
		else if (select.value === "title") return a['title'].localeCompare(b['title']);
	});
}

init = async () => {
	const params = new URLSearchParams(window.location.search);
	const id = params.get("id");
	
	const photographer = await getPhotographer(id);
	const pictures = await getPictures(id);
	
	await displayPhotographer(photographer);
	
	const sortedPictures = sortPictures(pictures);
	displayPictures(sortedPictures);
	
	const select = document.getElementById('nav-filters');
	select.addEventListener('change', () => {
		const sorted = sortPictures(pictures);
		document.querySelector('.photographer-pictures').innerHTML = '';
		displayPictures(sorted);
	});
	
	document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
	document.querySelector('.lightbox-next').addEventListener('click', showNext);
	document.querySelector('.lightbox-prev').addEventListener('click', showPrev);
	
	document.addEventListener('keydown', (e) => {
		if (document.getElementById('lightbox').classList.contains('hidden')) return;
		if (e.key === 'ArrowRight') showNext();
		if (e.key === 'ArrowLeft') showPrev();
		if (e.key === 'Escape') closeLightbox();
	});
}

document.addEventListener("DOMContentLoaded", init);
