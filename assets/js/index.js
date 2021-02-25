// Store classes in variables 
let tops = document.querySelectorAll(".top");
let bottoms = document.querySelectorAll(".bottom");
let grassBottoms = document.querySelectorAll(".grassBottom");
let lefts = document.querySelectorAll(".left");
let rights = document.querySelectorAll(".right");

// Takes in each class item and adds a class of .swoop 
function swoopIn(item) {
        item.classList.add("swoop")
}

// Add an event listener of "load" to each item in variable
// Call swoopIn() and pass in each item of the variable when page loads 
tops.forEach(top => top.addEventListener("load", swoopIn(top)));
bottoms.forEach(bottom => bottom.addEventListener("load", swoopIn(bottom)));
lefts.forEach(left => left.addEventListener("load", swoopIn(left)));
rights.forEach(right => right.addEventListener("load", swoopIn(right)));
grassBottoms.forEach(grassBottom => grassBottom.addEventListener("load", swoopIn(grassBottom)))