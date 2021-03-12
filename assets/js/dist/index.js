"use strict";

/*--------------------------------------------home-page*/
// Store classes in variables 
var tops = document.querySelectorAll(".top");
var bottoms = document.querySelectorAll(".bottom");
var grassBottoms = document.querySelectorAll(".grassBottom");
var lefts = document.querySelectorAll(".left");
var rights = document.querySelectorAll(".right"); // Takes in each class item and adds a class of .swoop 

function swoopIn(item) {
  item.classList.add("swoop");
}

; // Add an event listener of "load" to each item in variable
// Call swoopIn() and pass in each item of the variable when page loads 

tops.forEach(function (top) {
  return top.addEventListener("load", swoopIn(top));
});
bottoms.forEach(function (bottom) {
  return bottom.addEventListener("load", swoopIn(bottom));
});
lefts.forEach(function (left) {
  return left.addEventListener("load", swoopIn(left));
});
rights.forEach(function (right) {
  return right.addEventListener("load", swoopIn(right));
});
grassBottoms.forEach(function (grassBottom) {
  return grassBottom.addEventListener("load", swoopIn(grassBottom));
});
/*--------------------------------------------studio*/

/*-----------------------------click-and-appear*/
// Select all menu items and save them to the menuItems variable

var menuItems = document.getElementsByClassName("menu-item"); // Add "click" event listener to each menu item

Array.from(menuItems).forEach(function (menuItem) {
  return menuItem.addEventListener("click", insertImg);
});
Array.from(menuItems).forEach(function (menuItem) {
  return menuItem.addEventListener("touchend", insertImg);
}); //Array.from(menuItems).forEach(menuItem => {
//menuItem.addEventListener("touchend", insertImg)
//menuItem.addEventListener("click", insertImg)
//});
// Create img container containing resizers and cancel option, as well as image itself.
// Insert all into canvas element in DOM

function insertImg(event) {
  // Create img-container 
  var imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container"); // Create resizers and cancel option inside img-container

  var tl = document.createElement("div");
  tl.classList.add("mover", "tl");
  imgContainer.appendChild(tl);
  var tr = document.createElement("div");
  tr.classList.add("mover", "tr");
  imgContainer.appendChild(tr);
  var br = document.createElement("div");
  br.classList.add("mover", "br");
  imgContainer.appendChild(br);
  var bl = document.createElement("div");
  bl.classList.add("mover", "bl");
  imgContainer.appendChild(bl);
  var remove = document.createElement("div");
  remove.classList.add("mover", "remove");
  var icon = document.createElement("i");
  icon.classList.add("far", "fa-times-circle");
  remove.appendChild(icon);
  imgContainer.appendChild(remove); // Create img, append to img-container, insert into canvas element in the DOM

  var newImg = document.createElement("img");
  newImg.src = event.path[1].getAttribute("data-img");
  newImg.classList.add("canvas-img");
  imgContainer.appendChild(newImg);
  var canvas = document.getElementById("canvas");
  canvas.appendChild(imgContainer); // Call move function on each image so JS code will run after HTML appears

  move();
}

;
/*-----------------------------moveable elements*/

var moveImg = null; //object to be moved

var positionX = 0; //used to prevent dragged object jumping to mouse location

var positionY = 0;

function move() {
  document.querySelectorAll(".img-container").forEach(function (img) {
    return img.addEventListener("mousedown", onContact, true);
  });
  document.querySelectorAll(".img-container").forEach(function (img) {
    return img.addEventListener("touchstart", onContact, true);
  });
  document.addEventListener("mouseup", onEndContact);
  document.addEventListener("touchend", onEndContact); //document.onmouseup = stopDrag;
  //document.ontouchend = stopDrag;
}

function onContact(e) {
  e.preventDefault();
  e.stopPropagation();
  moveImg = e.path[1];
  moveImg.style.position = "absolute";
  var rectVal = moveImg.getBoundingClientRect();
  console.log(e);

  if (e.type == "mousedown") {
    positionX = e.clientX - rectVal.left;
    positionY = e.clientY - rectVal.top;
    window.addEventListener('mousemove', onDrag, true);
  } else if (e.type == "touchstart") {
    positionX = e.targetTouches[0].clientX - rectVal.left;
    positionY = e.targetTouches[0].clientY - rectVal.top;
    window.addEventListener('touchmove', onDrag, true);
  }
}

function onDrag(e)
/*Drag object*/
{
  e.preventDefault();
  e.stopPropagation();
  if (moveImg == null) return;else if (e.type == "mousemove") {
    moveImg.style.left = e.clientX - positionX + "px";
    moveImg.style.top = e.clientY - positionY + "px";
  } else if (e.type == "touchmove") {
    moveImg.style.left = e.targetTouches[0].clientX - positionX + "px";
    moveImg.style.top = e.targetTouches[0].clientY - positionY + "px";
  }
}

function onEndContact(e) {
  if (moveImg) {
    moveImg = null;
    window.removeEventListener('mousemove', onDrag, true);
    window.removeEventListener('touchmove', onDrag, true);
  }
}
