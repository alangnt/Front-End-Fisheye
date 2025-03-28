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
		mediaTitle.textContent = title || 'Untitled';
		
		const likesAmount = document.createElement('p');
		likesAmount.textContent = likes ?? 0;
		
		infoContainer.appendChild(mediaTitle);
		infoContainer.appendChild(likesAmount);
		mediaContainer.appendChild(infoContainer);
		
		photographerMediaSection.appendChild(mediaContainer);
	});
	
	return photographerMediaSection;
}

displayPhotographer = async (photographer) => {
	const { name, portrait, city, country, tagline, price, id } = photographer;
	
	return displayHeaderSection({ name, city, country, tagline, portrait });
}

init = async () => {
	const params = new URLSearchParams(window.location.search);
	const id = params.get("id");
	
	const photographer = await getPhotographer(id);
	const pictures = await getPictures(id);
	
	await displayPhotographer(photographer);
	await displayPictures(pictures);
}

document.addEventListener("DOMContentLoaded", init);
