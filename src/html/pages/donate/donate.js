'use strict';

let arrayPosition = 0
let pageContent;
let currentPageContent = {
    popup: document.querySelector("#story1")
}
let storyDiv = document.getElementById("kids-stories");

storyDiv.classList.add("border");
getPageContents().catch(function () {
    new Error("Content Cannot Be loaded at this time.");
});

function getPageContents() {
    return fetch('kids-stories-content.json')
        .then(function (response) {
            return response.json();
        }).then(function (json){
            pageContent = json;
            console.log(pageContent);
            updateInformation()
            renderPage();
        });
}

function updateInformation(){
    currentPageContent.imageUrl = pageContent[arrayPosition].imageUrl;
    currentPageContent.headingText = pageContent[arrayPosition].headingText;
    currentPageContent.paragraph = pageContent[arrayPosition].paragraph;
    renderPage();
}

function renderPage(){
    document.querySelector(".kids-img").src = currentPageContent.imageUrl;
    document.querySelector(".kids-img").alt = currentPageContent.alt;
    document.querySelector(".kids-head").textContent = currentPageContent.headingText;
    document.querySelector(".kids-p").textContent = currentPageContent.paragraph;
}

let nextButtons = document.querySelector(".next");
nextButtons.addEventListener("click", function (){
    arrayPosition++;
    if(arrayPosition >= pageContent.length){
        arrayPosition = 0
    }
    updateInformation();
    renderPage();
});

let backButtons = document.querySelector(".back");
backButtons.addEventListener("click", function (){
    arrayPosition--;
    if(arrayPosition < 0){
        arrayPosition = (pageContent.length - 1);
    }
    updateInformation();
    renderPage();
});

let moreButtons = document.querySelector("#more");
moreButtons.addEventListener("click", function() {
    
    document.querySelector("#kids-stories").style.display = 'none';
    switch (arrayPosition) {
        case 0:
            currentPageContent.popup = document.querySelector("#story1");
            currentPageContent.popup.style.display = 'flex';
            break;
        case 1:
            currentPageContent.popup = document.querySelector("#story2");
            currentPageContent.popup.style.display = 'flex';
            break;
        case 2:
            currentPageContent.popup = document.querySelector("#story3");
            currentPageContent.popup.style.display = 'flex';
            break;
    }
})

let closeButtons = document.querySelectorAll(".closeButton");
closeButtons.forEach(function(item) {
    item.addEventListener("click", function() {
        currentPageContent.popup.style.display = 'none';
        document.querySelector("#kids-stories").style.display = 'block';
    })
})
