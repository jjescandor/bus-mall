"use strict";

let productsArray = [];
let productsName = [];
let randomNumArray = [];
let chartVotesArray = [];
let chartViewsArray = [];
let imagesArray = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu',
    'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
let productImages = document.querySelectorAll('img');
let productButton = document.querySelector('main section');
let resultsUl = document.querySelector('.final-ul');
let surveyBanner = document.querySelector('body h2');
let resultsButton = document.querySelector('.result');
let skipButton = document.querySelector('.skip');
let myChartBar = document.getElementById('myChartBar').getContext('2d');
let myChartContainer = document.getElementById('myChartContainer');
let clickCount = 25;

function Products(name, filename = 'jpg') {
    this.name = name;
    this.src = `img/${name}.${filename}`;
    this.views = 0;
    this.votes = 0;
    this.likesObj = JSON.parse(localStorage.getItem(this.name)) || { votes: [], views: [] };
    productsArray.push(this);
}

function instantiateObjects() {
    new Products('sweep', 'png')
    for (let image of imagesArray) {
        new Products(image);
    }
}

Products.prototype.storeProducts = function (votes, views) {
    this.likesObj.votes.push(votes);
    this.likesObj.views.push(views);
    localStorage.setItem(this.name, JSON.stringify(this.likesObj));
};

instantiateObjects();

function getRandomNum() {
    return Math.floor(Math.random() * productsArray.length);
}

function renderProducts() {
    while (randomNumArray.length < 6) {
        let num = getRandomNum();
        if (!randomNumArray.includes(num)) {
            randomNumArray.push(num);
        }
    }
    productImages[0].src = productsArray[randomNumArray[0]].src;
    productImages[1].src = productsArray[randomNumArray[1]].src;
    productImages[2].src = productsArray[randomNumArray[2]].src;
    productImages[0].alt = productsArray[randomNumArray[0]].name;
    productImages[1].alt = productsArray[randomNumArray[1]].name;
    productImages[2].alt = productsArray[randomNumArray[2]].name;
    productsArray[randomNumArray[0]].views++;
    productsArray[randomNumArray[1]].views++
    productsArray[randomNumArray[3]].views++;
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
        if (clickCount < 25) {
            randomNumArray.shift();
            randomNumArray.shift();
            randomNumArray.shift();
        }
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

function countLikes() {
    for (let i = 0; i < productsArray.length; i++) {
        let numVotes = 0;
        let numViews = 0;
        for (let j = 0; j < productsArray[0].likesObj.votes.length; j++) {
            numVotes += productsArray[i].likesObj.votes[j];
            numViews += productsArray[i].likesObj.views[j];
        }
        chartVotesArray.push(numVotes);
        chartViewsArray.push(numViews);
    }
    console.log(chartVotesArray);
}

function handleResults(event) {
    event.preventDefault();
    let resultsh2 = document.createElement('h2');
    resultsh2.textContent = "Survey Results";
    resultsUl.prepend(resultsh2);
    for (let product of productsArray) {
        productsName.push(product.name);
        product.storeProducts(product.votes, product.views);
    }
    myChartContainer.className = 'containerAfter';
    countLikes();
    displayChart();
    resultsButton.className = 'end-of-survey';
    surveyBanner.className = 'end-of-survey';
}

function displayChart() {
    const data = {
        labels: productsName,
        datasets: [{
            label: 'Likes',
            data: chartVotesArray,
            backgroundColor: ['rgba(176, 18, 160, 0.4)'],
            borderColor: ['grey'],
            borderWidth: 0.5
        },
        {
            label: 'Views',
            data: chartViewsArray,
            backgroundColor: ['rgba(49, 199, 74, 0.4)'],
            borderColor: ['grey'],
            borderWidth: 0.5
        }]
    };
    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    };
    const myChart = new Chart(myChartBar, config);
}



productButton.addEventListener('click', handleClick);
resultsButton.addEventListener('click', handleResults);
skipButton.addEventListener('click', handleClick);