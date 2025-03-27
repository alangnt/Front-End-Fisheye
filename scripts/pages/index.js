displayData = async (photographers) => {
    const photographersSection = document.querySelector(".photographer_section");
    
    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

init = async () => {
    const { photographers } = await getPhotographers();
    await displayData(photographers);
}

init();
    
