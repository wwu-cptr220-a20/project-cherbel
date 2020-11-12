'use strict';

let arrayPosition = 0
let pageContent;
let currentPageContent = {
    popup: document.querySelector("#story1"),
    paragraph: ""
}
//Load Page Contents
getPageContents();

//Fetches page contents for kids section
function getPageContents() {
    return fetch('kids-stories-content.json')
        .then(function (response) {
            return response.json();
        }).then(function (json){
            pageContent = json;
            updateInformation();
        }).catch(function () {
        new Error("Content Cannot Be loaded at this time.");
    });
}

//Call Before renderPage.  Updates Current Information
function updateInformation(){
    currentPageContent.imageUrl = pageContent[arrayPosition].imageUrl;
    currentPageContent.headingText = pageContent[arrayPosition].headingText;
    currentPageContent.paragraph = pageContent[arrayPosition].paragraph;
    currentPageContent.alt = pageContent[arrayPosition].alt;
    renderPage();
}

//Renders page to current information
function renderPage(){
    //Ignore in testing
    if(document.querySelector("#kids-img") != null){
        document.querySelector("#kids-img").src = currentPageContent.imageUrl;
        document.querySelector("#kids-img").alt = currentPageContent.alt;
        document.querySelector(".kids-head").textContent = currentPageContent.headingText;
        document.querySelector(".kids-p").textContent = currentPageContent.paragraph;
    }
}

//Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    //Both buttons below react to input and change page accordingly
    let nextButtons = document.querySelector(".next");
    let backButtons = document.querySelector(".back");
    nextButtons.addEventListener("click", function (){
        arrayPosition++;
        if(arrayPosition >= Object.keys(pageContent).length){
            arrayPosition = 0;
        }
        updateInformation();
    });
    backButtons.addEventListener("click", function (){
        arrayPosition--;
        if(arrayPosition < 0){
            arrayPosition = (Object.keys(pageContent).length - 1);
        }
        updateInformation();
    });

    //Functions for learn more popup window
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
})

//For Testing
if(typeof module !== 'undefined' && module.exports){
    /* eslint-disable */
    module.exports.arrayPosition = arrayPosition;
    module.exports.currentPageContent = currentPageContent;
    module.exports.getPageContents = getPageContents;
    module.exports.updateInformation = updateInformation;
}

