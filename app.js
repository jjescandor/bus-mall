"use strict";

let productsArray = [];
let productsName = [];
let randomNumArray = [];
let chartLikesArray = [];
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
    this.likesArray = JSON.parse(localStorage.getItem("unicorn")) || [];
    productsArray.push(this);
}

function instantiateObjects() {
    new Products('sweep', 'png')
    for (let image of imagesArray) {
        new Products(image);
    }
}

Products.prototype.storeProducts = function (likes) {
    this.likesArray.push(likes);
    localStorage.setItem(this.name, JSON.stringify(this.likesArray));
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
console.log(productsArray);
function countLikes() {
    for (let i = 0; i < productsArray.length; i++) {
        let numLikes = 0
        for (let j = 0; j < productsArray[0].likesArray.length; j++) {
            numLikes += productsArray[i].likesArray[j];
        }
        chartLikesArray.push(numLikes);
    }
    console.log(chartLikesArray);
}

function handleResults(event) {
    event.preventDefault();
    let resultsh2 = document.createElement('h2');
    resultsh2.textContent = "Survey Results";
    resultsUl.prepend(resultsh2);
    for (let product of productsArray) {
        productsName.push(product.name);
        product.storeProducts(product.votes);

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
            data: chartLikesArray,
            backgroundColor: ['rgba(160, 30, 100, 0.4)'],
            borderColor: ['grey'],
            borderWidth: 1
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