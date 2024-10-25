// evento scroll navbar
let navbar = document.querySelector('nav');
document.addEventListener('scroll', () => {

    if (window.scrollY > 250) {
        navbar.classList.add('navScroll');
    } else {
        navbar.classList.remove('navScroll');
    }
})

// darkMode
let mode = localStorage.getItem('mode', 'light');
// bottone filtri (annunci)
let button = document.querySelector('#button')
let body = document.querySelector('body');
let buttonDark = document.querySelector('#buttonDark');

let confirm = false;
buttonDark.addEventListener('click', () => {
    if (!confirm) {
        confirm = true;
        body.classList.add('darkMode');
        buttonDark.innerHTML = `<i class="bi bi-brightness-high-fill text-white"></i>`
        localStorage.setItem('mode', 'dark');
        button.classList.remove('btn-outline-dark')
        button.classList.add('btn-outline-light');
    } else {
        confirm = false;
        body.classList.remove('darkMode')
        buttonDark.innerHTML = `<i class="bi bi-moon-fill text-light"></i>`
        localStorage.setItem('mode', 'light');
        button.classList.add('btn-outline-dark');
        button.classList.remove('btn-outline-light');
    }
})

if (mode == 'dark') {
    confirm = true;
    body.classList.add('darkMode');
    buttonDark.innerHTML = `<i class="bi bi-brightness-high-fill text-light"></i>`
    button.classList.remove('btn-outline-dark');
    button.classList.add('btn-outline-light');
} else {
    confirm = false;
    body.classList.remove('darkMode');
    buttonDark.innerHTML = ` <i class="bi bi-moon-fill text-light"></i>`
    button.classList.add('btn-outline-dark');
    button.classList.remove('btn-outline-light');
}

// catture container
let containerCards = document.querySelector('#containerCards');
let containerCategory = document.querySelector('#containerCategory');
// catture input per prezzo
let priceValue = document.querySelector('#priceValue');
let priceInput = document.querySelector('#priceInput')


// fetch -> collegamento file .json
fetch('./annunci.json').then(response => response.json()).then(data => {
    // console.log(data);

    function showCards(array) {
        array.forEach(card => {
            let div = document.createElement('div');
            div.classList.add('col-12', 'col-md-4', `col-xl-3`, 'mb-5', 'px-0', 'px-md-4');
            div.innerHTML = `
                <div class="card">
                    <img src = "${card.img}" class="c-card-img-top" alt = "..." >
                        <div class="card-body">
                            <h5 class="card-title pt-2 text-capitalize">${card.name}</h5>
                            <p class="card-text pb-2 fs-6 text-capitalize c-category">${card.category}</p>
                            <p class="card-text fw-light text-truncate">
                            Some quick example text to build on the card title and make up the bulk of the card's content.
                            </p>
                            <p class="card-text py-2 text-black c-gradient fs-4 fw-bold">${card.price}$</p>
                        </div>
                </div >`
            containerCards.appendChild(div)
        });
    }
    showCards(data)

    // funzione per i radio button
    function radioCreate(){
        let categories = data.map(annuncio=> annuncio.category);

        let uniqueCategories = new Set(categories);
        uniqueCategories.forEach(categoria=>{
            let div = document.createElement('div');
            div.innerHTML = `<input class="form-check-input" type="radio" id="${categoria}" name="category">
                <label class="form-check-label text-capitalize" for="${categoria}">
                ${categoria}</label>`
            containerCategory.appendChild(div);

                let radioBtn = document.querySelectorAll('.form-check-input');
                    radioBtn.forEach(btn=>{
                        btn.addEventListener('click', ()=>{
                            filterByCategories(btn.id)
                        })
                    })
                })
    }
    radioCreate()

    function filterByCategories(categoria){
        if(categoria != 'All'){
            let filtered = data.filter(annunci => annunci.category == categoria);
            containerCards.innerHTML= ``;
            showCards(filtered);
        } else {
            containerCards.innerHTML = ``;
            showCards(data)
        }
    }

    // funzione filtra per prezzo min e max
    function setPriceInput(){
        let price = data.map(annuncio => Number(annuncio.price))
        price.sort((a,b) => a-b);
        let priceMax = price.pop();
        let priceMin = price.shift();
        priceValue.innerHTML = `${priceMax}$`;
        priceInput.max = priceMax;
        priceInput.min = priceMin;
        priceInput.value = priceMax;
        return priceMin, priceMax;
    }
    setPriceInput()



    // filtro per prezzo
    function filterByPrice(){
        let filtered = data.filter(annuncio => Number(annuncio.price) <= priceInput.value);
        containerCards.innerHTML = ``;
        showCards(filtered);
    }
    // filterByPrice()

    // evento slider per prezzo
    priceInput.addEventListener(`input`, () =>{
        priceValue.innerHTML =  `${Math.round(priceInput.value)}$`
        filterByPrice()
    })


    // filtro per parola
    function filterByWord(){
        let filtered = data.filter(annuncio => annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase()));
        containerCards.innerHTML = ``;
        showCards(filtered);
    }

    // evento ricerca per parola
    wordInput.addEventListener(`input`, ()=>{
        filterByWord()
    })
})