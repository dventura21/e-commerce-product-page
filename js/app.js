const menu = document.querySelector('.menu');
const btnHamburger = document.querySelector('.hamburger');
const btnMenuClose = document.querySelector('#btnMenuClose');


btnHamburger.addEventListener('click', onHamburgerClick);
btnMenuClose.addEventListener('click', onMenuCloseClick);

function onHamburgerClick() {
    menu.classList.remove('hidden');
}

function onMenuCloseClick() {
    menu.classList.add('hidden');
}