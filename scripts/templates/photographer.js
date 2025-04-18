class Photographer {
    constructor(photographer) {
        this.photographer = photographer;
		this.picture = `assets/photographers/${photographer.portrait}`;
    }

    photographerTemplate = () => {
        const { name, city, country, tagline, price, id } = this.photographer;
    
        const article = document.createElement('article');
        article.classList.add('photographers_section_article');
        
        article.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.sendToPhotographerPage(id);
            }
            
            const allCards = Array.from(document.querySelectorAll('.photographers_section_article'));
            const currentIndex = allCards.indexOf(article);
            
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                const next = allCards[currentIndex + 1];
                if (next) next.focus();
            }
            
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                const prev = allCards[currentIndex - 1];
                if (prev) prev.focus();
            }
        });
    
        article.setAttribute('tabindex', '0');
        article.setAttribute('role', 'link');
        article.setAttribute('aria-label', `${name}, ${city}, ${country}, ${tagline}, ${price} euros par jour`);
    
        article.addEventListener('click', () => this.sendToPhotographerPage(id));

        article.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.sendToPhotographerPage(id);
            }
        });
    
        article.innerHTML = `
            <img src="${this.picture}" alt="${name}">
            <h2>${name}</h2>
            <h3>${city}, ${country}</h3>
            <h4>${tagline}</h4>
            <h5>${price}€/jour</h5>
        `;
    
        return article;
    }

    sendToPhotographerPage = (id) => {
        if (!id) return;
        window.location.href = `photographer.html?id=${id}`;
    }
}
