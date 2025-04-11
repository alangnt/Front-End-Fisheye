class PhotographerPage {
	constructor(photographer, pictures) {
		this.photographer = photographer;
		this.pictures = pictures;
		this.picturePath = `assets/photographers/${photographer.portrait}`;
		this.currentMediaList = [];
		this.currentMediaIndex = 0;
		this.lightbox = document.getElementById('lightbox');
		this.content = this.lightbox.querySelector('.lightbox-content');

		this.select = document.querySelector(".custom-select");
		this.trigger = this.select.querySelector(".custom-select-trigger");
		this.optionsContainer = this.select.querySelector(".custom-select-options-ctn");
		this.options = this.select.querySelectorAll(".custom-select-option");
		this.chevron = this.select.querySelector(".fa-chevron-up");

		this.selectedSorting = "popularity";
		this.initLightboxListeners();
		this.customSelectInit();
	}

	initLightboxListeners() {
		document.querySelector('.lightbox-close').addEventListener('click', () => this.close());
		document.querySelector('.lightbox-next').addEventListener('click', () => this.showNext());
		document.querySelector('.lightbox-prev').addEventListener('click', () => this.showPrev());

		document.addEventListener('keydown', (e) => {
			if (this.lightbox.classList.contains('hidden')) return;
			if (e.key === 'ArrowRight') this.showNext();
			if (e.key === 'ArrowLeft') this.showPrev();
			if (e.key === 'Escape') this.close();
		});
	}

	customSelectInit() {
		this.trigger.addEventListener("click", () => {
			if (this.trigger.classList.contains("custom-select-open")) {
				this.trigger.classList.remove("custom-select-open");
				this.optionsContainer.classList.remove("custom-select-options-open");
				this.chevron.classList.remove("custom-select-trigger-spin");
			}
			else {
				this.trigger.classList.add("custom-select-open");
				this.optionsContainer.classList.add("custom-select-options-open");
				this.chevron.classList.add("custom-select-trigger-spin");
			}
		});
	
		this.options.forEach(option => {
			option.addEventListener("click", () => {
				const sortType = option.dataset.sort;
				this.sortPictures(sortType);
			});
		});
	}
		

	displayHeaderSection() {
		const { name, city, country, tagline } = this.photographer;
		const header = document.querySelector('.photographer-header');

		header.innerHTML = `
			<article class="photographer-header-info-section">
				<h1>${name}</h1>
				<h2>${city}, ${country}</h2>
				<h3>${tagline}</h3>
			</article>
			<button class="photographer-header-contact">Contactez-moi</button>
			<img src="${this.picturePath}" class="photographer-header-image" alt="${name}">
		`;

		document.getElementById("contact_modal_name").textContent = name;
		document.querySelector('.photographer_pricing').textContent = `${this.photographer.price}€/jour`;
	}

	displayPictures(pictures) {
		let totalLikes = 0;
		const section = document.querySelector('.photographer-pictures');
		section.innerHTML = '';
	
		this.pictures = pictures;
		this.currentMediaList = pictures;
	
		pictures.forEach((media, index) => {
			const { photographerId, title, image, video } = media;
			const mediaContainer = document.createElement('article');
			let mediaElement;
	
			const src = `assets/images/${photographerId}/${image || video}`;
			if (image) {
				mediaElement = document.createElement('img');
				mediaElement.setAttribute('src', src);
				mediaElement.setAttribute('alt', title || 'Pas de titre');
			} else {
				mediaElement = document.createElement('video');
				mediaElement.setAttribute('width', '350');
				mediaElement.setAttribute('height', '350');
				mediaElement.innerHTML = `<source src="${src}" type="video/mp4">`;
			}
	
			mediaContainer.appendChild(mediaElement);
	
			const info = document.createElement('div');
			info.classList.add('photographer-media-info-container');
	
			info.innerHTML = `
				<h4>${title}</h4>
				<div class="photographer_media_likes">
					<p>${media.likes}</p>
					<i class="fa-solid fa-heart" aria-label="likes" role="button" tabindex="0"></i>
				</div>
			`;
	
			const likeIcon = info.querySelector('.fa-heart');
			const likeCountElement = info.querySelector('p');
	
			let isLiked = false;
	
			const toggleLike = () => {
				isLiked = !isLiked;
				likeIcon.classList.toggle('liked', isLiked);
			
				if (isLiked) {
					media.likes += 1;
				} else {
					media.likes -= 1;
				}
			
				likeCountElement.textContent = media.likes;
			
				const newTotalLikes = this.currentMediaList.reduce((sum, media) => sum + media.likes, 0);
				document.querySelector('.photographer_total_likes').textContent = newTotalLikes;
			};
			
			likeIcon.addEventListener('click', (e) => {
				e.stopPropagation();
				toggleLike();
			});
			
			likeIcon.addEventListener('keydown', (e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					e.stopPropagation();
					toggleLike();
				}
			});
	
			mediaContainer.appendChild(info);
	
			mediaElement.addEventListener('click', () => {
				this.currentMediaIndex = index;
				this.open(this.currentMediaList[this.currentMediaIndex]);
			});

			mediaContainer.setAttribute('tabindex', '0');
			mediaContainer.setAttribute('role', 'button');
			mediaContainer.setAttribute('aria-label', title || 'media');

			mediaElement.addEventListener('click', () => {
				this.currentMediaIndex = index;
				this.open(this.currentMediaList[this.currentMediaIndex]);
			});

			mediaContainer.addEventListener('keydown', (e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					this.currentMediaIndex = index;
					this.open(this.currentMediaList[this.currentMediaIndex]);
				}
			});
				
			section.appendChild(mediaContainer);
			totalLikes += media.likes;
		});
	
		document.querySelector('.photographer_total_likes').textContent = totalLikes;
	}

	sortPictures(type) {
		this.trigger.classList.remove("custom-select-open");
		this.optionsContainer.classList.remove("custom-select-options-open");
		this.chevron.classList.remove("custom-select-trigger-spin");
	
		const newOption = this.optionsContainer.querySelector(`[data-sort="${type}"]`);
		const oldLabel = this.trigger.querySelector(".custom-select-label").textContent;
		const oldSort = this.trigger.dataset.sort;
	
		this.trigger.querySelector(".custom-select-label").textContent = newOption.textContent;
		this.trigger.dataset.sort = type;
	
		newOption.textContent = oldLabel;
		newOption.dataset.sort = oldSort;
	
		this.selectedSorting = type;
	
		switch (type) {
			case "popularity":
				return this.displayPictures([...this.pictures].sort((a, b) => b.likes - a.likes));
			case "date":
				return this.displayPictures([...this.pictures].sort((a, b) => new Date(b.date) - new Date(a.date)));
			case "title":
				return this.displayPictures([...this.pictures].sort((a, b) => a.title.localeCompare(b.title)));
			default:
				return this.displayPictures(this.pictures);
		}
	}
	

	open(media) {
		this.content.innerHTML = '';

		const src = `assets/images/${media.photographerId}/${media.image || media.video}`;
		let element;

		if (media.image) {
			element = document.createElement('img');
			element.src = src;
			element.alt = media.title;
		} else {
			element = document.createElement('video');
			element.controls = true;
			element.innerHTML = `<source src="${src}" type="video/mp4">`;
		}

		this.content.appendChild(element);
		this.lightbox.classList.remove('hidden');
		document.body.classList.add('no-scroll');
	}

	close() {
		this.lightbox.classList.add('hidden');
		document.body.classList.remove('no-scroll');
	}

	showNext() {
		this.currentMediaIndex = (this.currentMediaIndex + 1) % this.currentMediaList.length;
		this.open(this.currentMediaList[this.currentMediaIndex]);
	}

	showPrev() {
		this.currentMediaIndex = (this.currentMediaIndex - 1 + this.currentMediaList.length) % this.currentMediaList.length;
		this.open(this.currentMediaList[this.currentMediaIndex]);
	}
}

document.addEventListener("DOMContentLoaded", async () => {
	const fetcher = new FetchData("data/photographers.json");

	const params = new URLSearchParams(window.location.search);
	const id = params.get("id");

	const photographer = await fetcher.getPhotographer(id);
	const pictures = await fetcher.getPictures(id);

	const photographerPage = new PhotographerPage(photographer, pictures);

	photographerPage.displayHeaderSection();
	photographerPage.displayPictures(pictures);

	new ContactForm();
});