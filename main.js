//mi catturo il tag nav
let navbar = document.querySelector('nav');


//creo l'evento per lo scroll della navbar
document.addEventListener('scroll', () => {

    if (window.scrollY > 895) {
        navbar.classList.add('navScroll');
    } else {
        navbar.classList.remove('navScroll');
    }
})

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