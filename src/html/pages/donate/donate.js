'use strict';

let arrayPosition = 0
let PAGECONTENTS = [
    //Page 1
    {
        imageUrl: "https://i.ibb.co/1dkTL91/kid-2696865-1920.jpg",
        numberOfLikes: 0,
        headingText: "This is ____",
        paragraph: "___ is one of the kids on our organization benefiting from your donations."
    },
    //Page 2
    {
        imageUrl: "https://i.ibb.co/5k1v1gP/kid-2679111-1920.jpg",
        numberOfLikes: 0,
        headingText: "Meet ____",
        paragraph: "____ is learning how to type on a computer at our school in ___."
    },
    //Page 3
    {
        imageUrl: "https://i.ibb.co/80PG5sT/child-5213589-1920.jpg",
        numberOfLikes: 0,
        headingText: "Say hi to ____",
        paragraph: "____'s birthday is today!"
    }
]

let currentPageContent = { }

let storyDiv = document.getElementById("kids-stories");
storyDiv.appendChild(createButtonDiv());
storyDiv.classList.add("border");
updateInformation();
renderPage();

function createButtonDiv() {
    let div = document.createElement("div");
    let backButton = document.createElement("button");
    let nextButton = document.createElement("button");
    backButton.innerText = "Back";
    nextButton.innerText = "Next";
    backButton.classList.add("back");
    nextButton.classList.add("next");
    div.appendChild(backButton);
    div.appendChild(nextButton);
    return div;
}

function updateInformation(){
    currentPageContent.imageUrl = PAGECONTENTS[arrayPosition].imageUrl;
    currentPageContent.headingText = PAGECONTENTS[arrayPosition].headingText;
    currentPageContent.paragraph = PAGECONTENTS[arrayPosition].paragraph;
    renderPage();
}

function renderPage(){
    document.querySelector(".kids-img").src = currentPageContent.imageUrl;
    document.querySelector(".kids-head").textContent = currentPageContent.headingText;
    document.querySelector(".kids-p").textContent = currentPageContent.paragraph;
}

let nextButtons = document.querySelector(".next");
nextButtons.addEventListener("click", function (){
    arrayPosition++;
    if(arrayPosition >= PAGECONTENTS.length){
        arrayPosition = 0
    }
    updateInformation();
    renderPage();
});

let backButtons = document.querySelector(".back");
backButtons.addEventListener("click", function (){
    arrayPosition--;
    if(arrayPosition < 0){
        arrayPosition = (PAGECONTENTS.length - 1);
    }
    updateInformation();
    renderPage();
});
