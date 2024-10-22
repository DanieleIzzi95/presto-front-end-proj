//mi catturo il tag nav
let navbar = document.querySelector('nav');

//creo l'evento per lo scroll della navbar
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
buttonDark.addEventListener('click', ()=>{
    if (!confirm){
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
} else {
    confirm = false;
    body.classList.remove('darkMode');
    buttonDark.innerHTML = ` <i class="bi bi-moon-fill text-light"></i>`
}






//creo le variabili per i numeri
let firstNumber = document.querySelector('#firstNumber');
let secondNumber = document.querySelector('#secondNumber');
let thirdNumber = document.querySelector('#thirdNumber');

// variabile d'appoggio
let check = true;

let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && check) {
            createInterval(270, firstNumber, 5);
            createInterval(350, secondNumber, 0.01);
            createInterval(750, thirdNumber, 0.01);
            check = false;
        }
    })
})

function createInterval(n, element, time) {
    let counter = 0;
    let intervallo = setInterval(() => {
        if (counter < n) {
            counter++;
            element.innerHTML = counter;
        } else {
            clearInterval(intervallo);
        }
    }, time);

    setTimeout(() => {
        check = true;
    }, 8000);
}

observer.observe(firstNumber);