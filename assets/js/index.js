/*--------------------------------------------home-page*/

// Store classes in variables 
let tops = document.querySelectorAll(".top");
let bottoms = document.querySelectorAll(".bottom");
let grassBottoms = document.querySelectorAll(".grassBottom");
let lefts = document.querySelectorAll(".left");
let rights = document.querySelectorAll(".right");

// Takes in each class item and adds a class of .swoop 
function swoopIn(item) {
        item.classList.add("swoop");
};

// Add an event listener of "load" to each item in variable
// Call swoopIn() and pass in each item of the variable when page loads 
tops.forEach(top => top.addEventListener("load", swoopIn(top)));
bottoms.forEach(bottom => bottom.addEventListener("load", swoopIn(bottom)));
lefts.forEach(left => left.addEventListener("load", swoopIn(left)));
rights.forEach(right => right.addEventListener("load", swoopIn(right)));
grassBottoms.forEach(grassBottom => grassBottom.addEventListener("load", swoopIn(grassBottom)));

/*--------------------------------------------studio*/

// Select all menu items and save them to the menuItems variable
let menuItems = document.getElementsByClassName("menu-item");

// Creates img element, set the src of the img element to the value of the
// data-img attribute of the menu item that has been clicked, and insert
// the image into the canvas element in the DOM
function insertImg(event) {
    let newImg = document.createElement("img");
    newImg.src = event.path[1].getAttribute("data-img");
    newImg.classList.add("canvas-img");
    let canvas = document.getElementById("canvas");
    canvas.appendChild(newImg);
};

// Add "click" event listener to each menu item
Array.from(menuItems).forEach(menuItem => menuItem.addEventListener("click", insertImg));
