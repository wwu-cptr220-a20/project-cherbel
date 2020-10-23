'use strict';

let arrayPosition = 0
let PAGECONTENTS = [
    //Page 1
    {
        imageUrl: "https://i.ibb.co/1dkTL91/kid-2696865-1920.jpg",
        numberOfLikes: 0,
        headingText: "This is ____",
        paragraph: "___ is one of the kids on our organization benefiting from your donations.",
        alt: "A photo of a smiling girl."
    },
    //Page 2
    {
        imageUrl: "https://i.ibb.co/5k1v1gP/kid-2679111-1920.jpg",
        numberOfLikes: 0,
        headingText: "Meet ____",
        paragraph: "____ is learning how to type on a computer at our school in ___.",
        alt: "A photo of a smiling girl."
    },
    //Page 3
    {
        imageUrl: "https://i.ibb.co/80PG5sT/child-5213589-1920.jpg",
        numberOfLikes: 0,
        headingText: "Say hi to ____",
        paragraph: "____'s birthday is today!",
        alt: "A photo of a smiling girl playing with water."
    }
]

let currentPageContent = { 
    popup: document.querySelector("#story1")
}

let storyDiv = document.getElementById("kids-stories");
storyDiv.classList.add("border");
updateInformation();
renderPage();

function updateInformation(){
    currentPageContent.imageUrl = PAGECONTENTS[arrayPosition].imageUrl;
    currentPageContent.headingText = PAGECONTENTS[arrayPosition].headingText;
    currentPageContent.paragraph = PAGECONTENTS[arrayPosition].paragraph;
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
