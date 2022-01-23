const menu = document.querySelector('.menu');
const btnHamburger = document.querySelector('.hamburger');
const btnMenuClose = document.querySelector('#btnMenuClose');

const cart = document.querySelector('.cart');
const btnCart = document.querySelector('.btnCart');

const btnPlus = document.querySelector('#btnPlus');
const btnMinus = document.querySelector('#btnMinus');
const productCounter = document.querySelector('.counter');


const gallery = document.querySelectorAll('.pic');
const heroImg = document.querySelector('.product-hero');

const btnNext = document.querySelector('.next');
const btnPrevious = document.querySelector('.previous');

const btnAddtoCart = document.querySelector('.btn');
const cartCount = document.querySelector('.cart-count');
const productInShoppingCart = document.querySelector('.products-in-cart');

const msgEmpty = document.querySelector('.msg-empty');
const checkout = document.querySelector('.checkout');

const overlay = document.querySelector('.overlay');
const lightbox = document.querySelector('.lightbox');

let lightboxGallery;
let lightboxHero;

//Numeric variables
let productCounterValue = 1;
let productInCart = 0;
let price = 250.0;
let discount = 0.5;

btnHamburger.addEventListener('click', onHamburgerClick);
btnMenuClose.addEventListener('click', onMenuCloseClick);

btnCart.addEventListener('click', openCart);

btnPlus.addEventListener('click', productCounterPlus);
btnMinus.addEventListener('click', productCounterMinus);


gallery.forEach(img => {
    img.addEventListener('click', onThumbClick);
});

btnNext.addEventListener('click', handleBtnClickNext);
btnPrevious.addEventListener('click', handleBtnClickPrevious);

btnAddtoCart.addEventListener('click', addtoCart);

heroImg.addEventListener('click', onHeroImageClick);

function onHamburgerClick() {
    menu.classList.remove('hidden');
}

function onMenuCloseClick() {
    menu.classList.add('hidden');
}

function openCart() {
    cart.classList.toggle('hidden');
}

function productCounterPlus() {
    //console.log(productCounterValue);
    setProductCounter(1);
}

function productCounterMinus() {
    setProductCounter(-1);
    
}

function setProductCounter(value){
    if ((productCounterValue + value) > 0)
    {
        productCounterValue += value;
        productCounter.innerHTML = productCounterValue;
    }
    //console.log(value)
}

function onThumbClick(event) {
    //clear active state for all thumbnails
    gallery.forEach(img => {
        img.classList.remove('active');
    });
    // set active thumbnail
    event.target.parentElement.classList.add('active');
    //update hero image
    heroImg.src = event.target.src.replace('-thumbnail', '');
}

function handleBtnClickNext() {
    let imageIndex = getCurrentimageIndex();
    imageIndex++;
    if (imageIndex > 4) {
        imageIndex = 1;
    }
    setHeroImage(imageIndex);
}

function handleBtnClickPrevious() {
    let imageIndex = getCurrentimageIndex();
    imageIndex--;
    if (imageIndex < 1) {
        imageIndex = 4;
    }
    setHeroImage(imageIndex);
}

function getCurrentimageIndex() {
    const imageIndex = parseInt(heroImg.src.split('\\').pop().split('/').pop().replace('.jpg', '').replace('image-product-',''));
    return imageIndex;
}

function setHeroImage(imageIndex){
    heroImg.src = `/images/image-product-${imageIndex}.jpg`;
    //images are not sync

    gallery.forEach(img => {
        img.classList.remove('active');
    });
    //set active thumbnail
    gallery[imageIndex-1].classList.add('active');
}

function addtoCart() {
    productInCart += productCounterValue;

    const prodcutHtmlElement = `
    <div class="item">
        <img class="product-img" src="images/image-product-1-thumbnail.jpg" alt="product 1 thumb">
            <div class="details">
                <div class="product-name">Autumn Limited Edition...</div>
                <div class="price-group">
                    <div class="price">$${(price*discount).toFixed(2)}</div> x
                    <div class="count">${productInCart}</div>
                    <div class="total-ammount">$${(price*discount*productInCart).toFixed(2)}</div>
                </div>
            </div>
          <img id="btnDelete" src="images/icon-delete.svg" alt="icon delete">
    </div>`;

    productInShoppingCart.innerHTML = prodcutHtmlElement;
    
    updateCart();


    const btnDelete = document.querySelector('#btnDelete');
    btnDelete.addEventListener('click', onBtnDeleteClick);

    //console.log(productInCart);
}

function updateCart() {
    updateCartIcon();
    updateMsgEmpty();
    updateCheckoutButton();
}

function updateCartIcon() {
    cartCount.textContent = productInCart;
    if(productInCart == 0) {
        if(!cartCount.classList.contains('hiden')) {
            cartCount.classList.add('hidden');
        }
    } else {
        cartCount.classList.remove('hidden');
    }
}

function updateMsgEmpty() {
    if(productInCart == 0) {
        if (msgEmpty.classList.contains('hidden')) {
            msgEmpty.classList.remove('hidden');
        }
    } else {
        if(!msgEmpty.classList.contains('hidden')) {
            msgEmpty.classList.add('hidden');
        }
    }
}

function updateCheckoutButton(){
    if (productInCart == 0) {
        if (!checkout.classList.contains('hidden')) {
            checkout.classList.add('hidden');
        }
    } else {
        checkout.classList.remove('hidden');
    }
}

function onBtnDeleteClick() {
    productInCart--;
    updateCart();

    const el = document.querySelector('.count');
    const totalAmmount = document.querySelector('.total-ammount');
    el.innerHTML = productInCart;
    totalAmmount.innerHTML = `$${(price*discount*productInCart).toFixed(2)}`;

    if (productInCart == 0) {
        productInShoppingCart.innerHTML = '';
    }
}

function onHeroImageClick() {
    if(window.innerWidth >= 1440) {
        if (overlay.childElementCount == 1) {

            const newNode = lightbox.cloneNode(true);
            overlay.appendChild(newNode);
    
            const btnOverlayClose = document.querySelector('#btnOverlayClose');
            btnOverlayClose.addEventListener('click', obBtnOverlayClose);

            lightboxGallery = overlay.querySelectorAll('.pic');
            lightboxHero = overlay.querySelector('.product-hero');
            lightboxGallery.forEach(img => {
                img.addEventListener('click', onThumbClickLighbox)
            });

            const btnOverlayNext = overlay.querySelector('.next');
            const btnOverlayPrevious = overlay.querySelector('.previous');

            btnOverlayNext.addEventListener('click', handleBtnClickNextOverlay);
            btnOverlayPrevious.addEventListener('click', handleBtnClickPrevious);
        }
        overlay.classList.remove('hidden');
    }
}

function obBtnOverlayClose() {
    overlay.classList.add('hidden');
}

function onThumbClickLighbox(event) {
    //clear active state for all thumbnails
    lightboxGallery.forEach(img => {
        img.classList.remove('active');
    });
    // set active thumbnail
    event.target.parentElement.classList.add('active');
    //update hero image
    lightboxHero.src = event.target.src.replace('-thumbnail', '');
}

function handleBtnClickNextOverlay() {
    let imageIndex = getOverlayCurrentimageIndex();
    imageIndex++;
    if (imageIndex > 4) {
        imageIndex = 1;
    }
    setOverlayHeroImage(imageIndex);
}

function handleBtnClickPreviousOverlay() {
    let imageIndex = getOverlayCurrentimageIndex();
    imageIndex--;
    if (imageIndex < 1) {
        imageIndex = 4;
    }
    setOverlayHeroImage(imageIndex);
}

function getOverlayCurrentimageIndex() {
    const imageIndex = parseInt(lightboxHero.src.split('\\').pop().split('/').pop().replace('.jpg', '').replace('image-product-',''));
    return imageIndex;
}

function setOverlayHeroImage(imageIndex){
    lightboxHero.src = `/images/image-product-${imageIndex}.jpg`;
    //images are not sync

    lightboxGallery.forEach(img => {
        img.classList.remove('active');
    });
    //set active thumbnail
    lightboxGallery[imageIndex-1].classList.add('active');
}