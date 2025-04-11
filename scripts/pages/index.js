class DisplayData {
    constructor(photographers) {
        this.photographers = photographers;
    }

    displayPhotographers = () => {
        const photographersSection = document.querySelector(".photographer_section");
        
        this.photographers.forEach((photographer) => {
            const photographerClass = new Photographer(photographer);
            const photographerModel = photographerClass.photographerTemplate();

            photographersSection.appendChild(photographerModel);
        });
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const fetcher = new FetchData("data/photographers.json");

    const data = await fetcher.fetchData();

    const photographers = data.photographers;

    const display = new DisplayData(photographers);
    display.displayPhotographers();
});