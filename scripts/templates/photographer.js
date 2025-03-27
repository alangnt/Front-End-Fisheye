function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.classList.add( 'photographers_section_article' );
        article.addEventListener( 'click', ( event ) => photographerPage(id));
        
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        
        const location = document.createElement( 'h3' );
        location.textContent = `${city}, ${country}`;
        
        const tagLine = document.createElement( 'h4' );
        tagLine.textContent = tagline;
        
        const cost = document.createElement( 'h5' );
        cost.textContent = `${price}€/jour`;
        
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(tagLine);
        article.appendChild(cost);
        
        return (article);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}

function photographerPage(id) {
    if (!id) return;
    window.location.href = `photographer.html?id=${id}`;
}
