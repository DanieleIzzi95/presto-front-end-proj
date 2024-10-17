// evento scroll navbar
document.addEventListener('scroll', () => {

    if (window.scrollY > 250) {
        navbar.classList.add('navScroll');
    } else {
        navbar.classList.remove('navScroll');
    }
})


let containerCards = document.querySelector('#containerCards');
let containerCategory = document.querySelector('#containerCategory');


// fetch -> collegamento file .json
fetch('./annunci.json').then(response => response.json()).then(data => {
    // console.log(data);

    function showCards(array) {
        array.forEach(card => {
            let div = document.createElement('div');
            div.classList.add('col-12', 'col-md-4', 'mb-5', 'px-0', 'px-md-4');
            div.innerHTML = `
                <div class="card">
                    <img src = "${card.img}" class="card-img-top" alt = "..." >
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
                <label class="form-check-label" for="${categoria}">
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
            showCards(data)
        }
    }








})