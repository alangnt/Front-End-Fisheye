getPhotographers = async () => {
	const response = await fetch("../../data/photographers.json");
	return await response.json();
}

getPhotographer = async (id) => {
	let selectedPhotographer;
	
	const response = await fetch("../../data/photographers.json");
	const data = await response.json();
	
	data['photographers'].forEach(user => {
		if (user.id.toString() === id) selectedPhotographer = user;
	});
	
	return selectedPhotographer;
}

getPictures = async (id) => {
	let pictures = [];
	
	const response = await fetch("../../data/photographers.json");
	const data = await response.json();
	
	data['media'].forEach(media => {
		if (media['photographerId'].toString() === id) pictures.push(media);
	})
	return pictures;
}
