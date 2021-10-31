"use strict";

let productsArray = [];
let imagesArray = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu',
    'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
let productImages = document.querySelectorAll('img');
let productButton = document.querySelector('main section');
let resultsUl = document.querySelector('.final-ul');
let surveyBanner = document.querySelector('body h2');

let resultsButton = document.querySelector('.result');
let skipButton = document.querySelector('.skip');
let clickCount = 25;

function Products(name, filename = 'jpg') {
    this.name = name;
    this.src = `img/${name}.${filename}`;
    this.views = 0;
    this.votes = 0;
    productsArray.push(this);
}

function instantiateObjects() {
    new Products('sweep', 'png')
    for (let images of imagesArray) {
        new Products(images);
    }
}

instantiateObjects();

function getRandomNum() {
    return Math.floor(Math.random() * 19);
}

function renderProducts() {
    let num1 = getRandomNum();
    let num2 = getRandomNum();
    let num3 = getRandomNum();
    while (num1 === num2 || num1 === num3 || num2 === num3) {
        num2 = getRandomNum();
        num3 = getRandomNum();
    }
    productImages[0].src = productsArray[num1].src;
    console.log(productsArray[num1].src);
    productImages[1].src = productsArray[num2].src;
    productImages[2].src = productsArray[num3].src;
    productImages[0].alt = productsArray[num1].name;
    productImages[1].alt = productsArray[num2].name;
    productImages[2].alt = productsArray[num3].name;
    productsArray[num1].views++;
    productsArray[num2].views++
    productsArray[num3].views++;
    if (!clickCount) {
        productButton.removeEventListener('click', handleClick);
        productImages[0].remove();
        productImages[1].remove();
        productImages[2].remove();
        resultsButton.className = 'view-result';
        resultsUl.className = 'resultsUl';
        productButton.className = 'end-of-survey-section';
    }
}

renderProducts();


function handleClick(event) {
    event.preventDefault();
    if (event.target === productButton) {
        alert("Please select a product");
    } else {
        clickCount--;
        renderProducts();
        surveyBanner.textContent = `Remaining Votes: ${clickCount}`
        if (!clickCount) {
            skipButton.className = 'end-of-survey';
            surveyBanner.textContent = 'End of survey, click the button below to view results'
        }
        for (let product of productsArray) {
            if (event.target.alt === product.name) {
                product.votes++;
            }
        }
    }
}

function handleResults(event) {
    event.preventDefault();
    let resultsh2 = document.createElement('h2');
    resultsh2.textContent = "Survey Results";
    resultsUl.prepend(resultsh2);
    for (let product of productsArray) {
        let resultsLi = document.createElement('li');
        resultsLi.textContent = `${product.name} had ${product.votes} votes, and was seen ${product.views} times.`
        resultsUl.appendChild(resultsLi);
    }
    resultsButton.className = 'end-of-survey';
    surveyBanner.className = 'end-of-survey';
}

productButton.addEventListener('click', handleClick);
resultsButton.addEventListener('click', handleResults);
skipButton.addEventListener('click', handleClick);



