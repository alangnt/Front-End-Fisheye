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
	const photographerPictureSection = document.querySelector('.photographer-pictures');
	
	pictures.forEach(picture => {
		const { photographerId, title, image } = picture;
		
		const pictureSrc = `assets/images/${photographerId}/${image}`;
		
		if (image.endsWith('.jpg')) {
			const imageContainer = document.createElement('article');
			const img = document.createElement('img');
			img.setAttribute('src', pictureSrc);
			img.setAttribute('alt', title);
			imageContainer.appendChild(img);
			
			const infoContainer = document.createElement('div');
			infoContainer.classList.add('info-container');
			
			const imageTitle = document.createElement('h4');
			imageTitle.textContent = title;
			imageContainer.appendChild(imageTitle);
			
			photographerPictureSection.appendChild(imageContainer);
		} else {
			const videoContainer = document.createElement('article');
			const video = document.createElement('video');
			video.setAttribute('width', '350');
			video.setAttribute('height', '350');
			const source = document.createElement('source');
			source.setAttribute('src', pictureSrc);
			source.setAttribute('type', 'video/mp4');
			video.appendChild(source);
			videoContainer.appendChild(video);
			
			const videoTitle = document.createElement('h4');
			videoTitle.textContent = title;
			videoContainer.appendChild(videoTitle);
			
			photographerPictureSection.appendChild(videoContainer);
		}
	})
	
	return photographerPictureSection;
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
