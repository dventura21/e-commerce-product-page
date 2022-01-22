const menu = document.querySelector('.menu');
const btnHamburger = document.querySelector('.hamburger');
const btnMenuClose = document.querySelector('#btnMenuClose');

const cart = document.querySelector('.cart');
const btnCart = document.querySelector('.btnCart');

btnHamburger.addEventListener('click', onHamburgerClick);
btnMenuClose.addEventListener('click', onMenuCloseClick);

btnCart.addEventListener('click', openCart);

function onHamburgerClick() {
    menu.classList.remove('hidden');
}

function onMenuCloseClick() {
    menu.classList.add('hidden');
}

function openCart() {
    cart.classList.toggle('hidden');
}