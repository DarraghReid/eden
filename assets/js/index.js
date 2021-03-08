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

// Create img container containing resizers and cancel option, as well as image itself.
// Insert all into canvas element in DOM
function insertImg(event) {
    // Create img-container 
    let imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");

    // Create resizers and cancel option inside img-container
    let tl = document.createElement("div");
    tl.classList.add("mover", "tl");
    imgContainer.appendChild(tl);

    let tr = document.createElement("div");
    tr.classList.add("mover", "tr");
    imgContainer.appendChild(tr);

    let br = document.createElement("div");
    br.classList.add("mover", "br");
    imgContainer.appendChild(br);

    let bl = document.createElement("div");
    bl.classList.add("mover", "bl");
    imgContainer.appendChild(bl);

    let remove = document.createElement("div");
    remove.classList.add("mover", "remove");
    let icon = document.createElement("i");
    icon.classList.add("far", "fa-times-circle");
    remove.appendChild(icon);
    imgContainer.appendChild(remove);

    // Create img, append to img-container, insert into canvas element in the DOM
    let newImg = document.createElement("img");
    newImg.src = event.path[1].getAttribute("data-img");
    newImg.classList.add("canvas-img");
    imgContainer.appendChild(newImg);
    let canvas = document.getElementById("canvas");
    canvas.appendChild(imgContainer);
};

// Add "click" event listener to each menu item
Array.from(menuItems).forEach(menuItem => menuItem.addEventListener("click", insertImg));
