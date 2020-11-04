'use strict';

const images = [
    {img: "https://i.ibb.co/k9VyHjP/umbrella-1807513-1920.jpg",
        alt: "Someone holding and Umbrella."},
    {img: "https://i.ibb.co/0nQn71j/people-2591874-1920.jpg",
        alt: "Someone sitting on a mountain."},
    {img: "https://i.ibb.co/p1KGkzj/girl-843076-1920.jpg",
        alt: "A dramatic photo of a someone on a leafy hillside."},
];

let currentPageContent = { }
//Load Random Advice from Advice Slip.com
getNewAdvice();
getPhoto();

//Renders page to current information
function renderAdvice(){
    document.querySelector("#random-advice").textContent = currentPageContent.advice;
}

function renderPhoto(){
    let div = document.getElementsByClassName("photo-card")
    $(document).ready(function() {
        $(".photo-card").css("background-image", `url(${currentPageContent.img})`)
    });
    div.alt = currentPageContent.alt;
}

//Fetches advice from adviceslip.com api
function getNewAdvice() {
    fetch('https://api.adviceslip.com/advice')
        .then(function (response) {
            return response.json();
        }).then((json) => {
        currentPageContent.advice = json.slip.advice;
        renderAdvice();
    }).catch(() => {
        currentPageContent.advice = "We're Sorry, we were unable to load advice at this time.";
        renderAdvice();
    });
}

//Chooses Background Picture for flex item
function getPhoto(){
    let size = images.length
    let x = Math.floor(size*Math.random())
    currentPageContent.img = images[x].img;
    currentPageContent.alt = images[x].alt;
    renderPhoto();
}
