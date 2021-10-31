"use strict";



let productsArray = [];
let productImages = document.querySelectorAll('img');
let productButton = document.querySelector('main section');
let resultsUl = document.querySelector('ul');
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

new Products('bag');
new Products('banana');
new Products('bathroom');
new Products('boots');
new Products('breakfast');
new Products('bubblegum');
new Products('chair');
new Products('cthulhu');
new Products('dog-duck');
new Products('dragon');
new Products('pen');
new Products('pet-sweep');
new Products('scissors');
new Products('shark');
new Products('sweep', 'png');
new Products('tauntaun');
new Products('unicorn');
new Products('water-can');
new Products('wine-glass');

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
    productImages[1].src = productsArray[num2].src;
    productImages[2].src = productsArray[num3].src;
    productImages[0].alt = productsArray[num1].name;
    productImages[1].alt = productsArray[num2].name;
    productImages[2].alt = productsArray[num3].name;
    productsArray[num1].views++;
    productsArray[num2].views++
    productsArray[num3].views++;
    if (clickCount === 0) {
        console.log('end');
        productButton.removeEventListener('click', handleClick);
        productImages[0].remove();
        productImages[1].remove();
        productImages[2].remove();
        resultsButton.className = 'view-result';
        resultsUl.className = 'resultsUl';
        productButton.className = 'end-of-survey-section';
    }
}

renderProducts()

function handleClick(event) {
    event.preventDefault();
    if (event.target === productButton) {
        alert("Please select a product");
    } else {
        clickCount--;
        console.log(clickCount);
        renderProducts();
        surveyBanner.textContent = `Remaining Votes: ${clickCount}`
        if (clickCount === 0) {
            skipButton.className = 'end-of-survey';
            surveyBanner.textContent = 'End of survey, click the button below to view results'
        }
        for (let i = 0; i < productsArray.length; i++) {
            if (event.target.alt === productsArray[i].name) {
                productsArray[i].votes++;
            }
        }
    }
}

function handleResults(event) {
    event.preventDefault();
    let resultsh2 = document.createElement('h2');
    resultsh2.textContent = "Survey Results";
    resultsUl.prepend(resultsh2);
    for (let i = 0; i < productsArray.length; i++) {
        let resultsLi = document.createElement('li');
        resultsLi.textContent = `${productsArray[i].name} had ${productsArray[i].votes} votes, and was seen ${productsArray[i].views} times.`
        resultsUl.appendChild(resultsLi);
    }
    resultsButton.className = 'end-of-survey';
    surveyBanner.className = 'end-of-survey';
}

productButton.addEventListener('click', handleClick);
resultsButton.addEventListener('click', handleResults);
skipButton.addEventListener('click', handleClick);



