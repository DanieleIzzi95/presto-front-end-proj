let navbar = document.querySelector('nav')

// darkMode
let mode = localStorage.getItem('mode', 'light');
let body = document.querySelector('body');
let buttonDark = document.querySelector('#buttonDark');

let confirm = false;
buttonDark.addEventListener('click', () => {
    if (!confirm) {
        confirm = true;
        body.classList.add('darkMode');
        buttonDark.innerHTML = `<i class="bi bi-brightness-high-fill text-white"></i>`
        localStorage.setItem('mode', 'dark');
    } else {
        confirm = false;
        body.classList.remove('darkMode')
        buttonDark.innerHTML = `<i class="bi bi-moon-fill text-light"></i>`
        localStorage.setItem('mode', 'light');
    }
})

if (mode == 'dark') {
    confirm = true;
    body.classList.add('darkMode');
    buttonDark.innerHTML = `<i class="bi bi-brightness-high-fill text-light"></i>`
} else {
    confirm = false;
    body.classList.remove('darkMode');
    buttonDark.innerHTML = ` <i class="bi bi-moon-fill text-light"></i>`
}


// evento scroll navbar
document.addEventListener('scroll', () => {

    if (window.scrollY > 250) {
        navbar.classList.add('navScroll');
    } else {
        navbar.classList.remove('navScroll');
    }
})

//  ---------------------------------

let chiSiamo = [
    {
        name: 'Giorgia Rossi',
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis doloribus tempore illum veniam ipsum.',
        job: 'CEO',
        img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'Luca Bianchi',
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis doloribus tempore illum veniam ipsum.',
        job: 'CTO',
        img: 'https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'Sophia Neri',
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis doloribus tempore illum veniam ipsum.',
        job: 'Student',
        img: 'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
]


let containerTeam = document.querySelector('#containerTeam');

chiSiamo.forEach(persona =>{
    let div = document.createElement('div');
    div.classList.add('col-8', 'col-md-4', 'my-3');
    div.innerHTML = `<div class="card">
        <img src=${persona.img}" class="card-img-top" alt="...">
        <div class="card-body">
            <h6 class="card-title py-1">${persona.name}</h6>
            <p class="card-text py-1">${persona.job}</p>
            <p class="card-text text-truncate py-1">${persona.description}</p>
        </div>
    </div>`
    containerTeam.appendChild(div);
})