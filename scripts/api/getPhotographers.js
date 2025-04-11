class FetchData {
	constructor(dataUrl) {
		this.dataUrl = dataUrl;
	}

	fetchData = async () => {
		this.data = await fetch(this.dataUrl);
		return await this.data.json();
	}

	getPhotographer = async (id) => {
		const data = await this.fetchData();

		let selectedPhotographer;
		
		selectedPhotographer = data['photographers'].find((user) => {
			return user.id.toString() === id;
		});
		
		return selectedPhotographer;
	}

	getPictures = async (id) => {
		const data = await this.fetchData();

		let pictures = [];
		
		data['media'].forEach(media => {
			if (media['photographerId'].toString() === id) pictures.push(media);
		})
		
		return pictures;
	}
}