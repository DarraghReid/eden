/*------------------------------------------------------------------------------------------------home-page*/
window.setTimeout(onLoadHome, 500);

// Add an event listener of "load" to each item in variable
// Call swoopIn() and pass in each item of the below variables when page loads 
// Use setTimeout() to fix bug of swoopIn() function not working on Safari
function onLoadHome(){
// Store classes in variables 
    let tops = document.querySelectorAll(".top");
    let bottoms = document.querySelectorAll(".bottom");
    let grassBottoms = document.querySelectorAll(".grassBottom");
    let lefts = document.querySelectorAll(".left");
    let rights = document.querySelectorAll(".right");

    tops.forEach(top => top.addEventListener("load", swoopIn(top)));
    bottoms.forEach(bottom => bottom.addEventListener("load", swoopIn(bottom)));
    lefts.forEach(left => left.addEventListener("load", swoopIn(left)));
    rights.forEach(right => right.addEventListener("load", swoopIn(right)));
    grassBottoms.forEach(grassBottom => grassBottom.addEventListener("load", swoopIn(grassBottom)));

// Takes in each class item and adds a class of .swoop 
// The .swoop class positions elements on screen
    function swoopIn(item) {
        item.classList.add("swoop");
    }
}
/*------------------------------------------------------------------------------------------------studio*/

/*-----------------------------click-and-appear*/
// Select all menu items and save them to the menuItems variable
let menuItems = document.getElementsByClassName("menu-item");

// Add "click" event listener to each menu item
Array.from(menuItems).forEach(menuItem => {
menuItem.addEventListener("touchend", insertImg);
menuItem.addEventListener("click", insertImg);
});

// Create img container containing resizers and cancel option, as well as image itself
// Insert all into canvas element in DOM
// Call move() and resize() functions
function insertImg(e) {
    if(e.type == "touchend" || e.type == "click"){
// Stop duplicate images being inserted on touch screens
        if(e.type == "touchend") {
            Array.from(menuItems).forEach(menuItem => {
            menuItem.removeEventListener("click", insertImg);
            });
        }

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
        newImg.src = e.srcElement.offsetParent.getAttribute("data-img");
        newImg.classList.add("canvas-img");
        imgContainer.appendChild(newImg);
        let canvas = document.getElementById("canvas");
        canvas.appendChild(imgContainer);

// Call move() and resize() functions for JS to run on new elements
        move();
        resize();
    }
}

/*-----------------------------moveable elements*/

let moveImg = null; 
let positionX = 0; 
let positionY = 0;
    
// Select each canvas element and set "mousedown" and "touchstart" event listeners on them, after which event, onContact() function will be called
// Add "mouseup" and "touchend" event listener on the document, after which event, onEndContact() function will be called. 
function move()
{
	document.querySelectorAll(".img-container").forEach(img => img.addEventListener("mousedown", onContact, true));
    document.querySelectorAll(".img-container").forEach(img => img.addEventListener("touchstart", onContact, true));
    document.addEventListener("mouseup", onEndContact);
    document.addEventListener("touchend", onEndContact);
}

// Target img to be moved, set cursor/pointer position
// Add "mousemove" event listener, after which event, onDrag() function will be called
// Remove img if cancel icon is clicked
function onContact(e)
{
    if(e.target.className == "canvas-img" || e.target.className == "img-container") {
        moveImg = e.target.offsetParent;
        let rectVal = moveImg.getBoundingClientRect();
        
        if(e.type == "mousedown")
        {
            positionX = e.clientX - rectVal.left; 
            positionY = e.clientY - rectVal.top;
            window.addEventListener('mousemove', onDrag, true);
        }
        else if(e.type == "touchstart")
        {
            positionX = e.targetTouches[0].clientX - rectVal.left; 
            positionY = e.targetTouches[0].clientY - rectVal.top;
            window.addEventListener('touchmove', onDrag, true);
        }
    }
    else if(e.target.className == "far fa-times-circle") {
        e.target.offsetParent.offsetParent.remove();
    }
}

// Set img's location to cursor/pointer position
function onDrag(e)
{
	if(moveImg == null) return; 
    else if(e.type=="mousemove")
	{
		moveImg.style.left = e.clientX-positionX +"px"; 
		moveImg.style.top = e.clientY-positionY +"px";
	}
    else if(e.type=="touchmove")
	{
		moveImg.style.left = e.targetTouches[0].clientX-positionX +"px"; 
		moveImg.style.top = e.targetTouches[0].clientY-positionY +"px";
	}
}

// Remove "mousemove" and "touchmove" event listeners and call onDrag() function
function onEndContact()
{
	if(moveImg) 
	{
		moveImg = null;
		window.removeEventListener('mousemove', onDrag, true);
		window.removeEventListener('touchmove', onDrag, true);
	}
}

/*-----------------------------resizable elements*/

function resize() {
// Select imgs to be resized
    let imgs = document.querySelectorAll(".img-container");
    
    imgs.forEach(img => {
// Select .mover divs to be used to resize each img
        const movers = document.querySelectorAll(".mover");
        let currentMover;

        movers.forEach(mover => {
// Add "mousedown" and "touchstart" listeners to each mover, after which event, onClick() function will be called
            mover.addEventListener("mousedown", onClick);
            mover.addEventListener("touchstart", onClick);

            function onClick(e) {
// Target current mover and appropriate parent, set cursor position
                currentMover = e.target;
                img = e.target.parentElement;
                let posX = e.clientX;
                let posY = e.clientY;
                let psX;
                let psY;
                if(e.type == "touchstart"){
                    psX = e.targetTouches[0].clientX;
                    psY = e.targetTouches[0].clientY;
                }
// Add "touchmove" and "mousemove" event listener on window, after which onStartResize() function will be called
// Add "mouseup" and "touchend" event listener on window, after which onStopResize() function will be called
                window.addEventListener("touchmove", onStartResize);
                window.addEventListener("mousemove", onStartResize);
                window.addEventListener("mouseup", onStopResize);
                window.addEventListener("touchend", onStopResize);

// Set size of img to increase with respect to cursor position
                function onStartResize(e) {
                    const rect = img.getBoundingClientRect();
                    if(e.type == "mousemove") {
                        if(currentMover.classList.contains("br")) {
                            img.style.width = rect.width - (posX - e.clientX) + "px";
                            img.style.height = rect.height - (posY - e.clientY) + "px";
                        }
                        else if(currentMover.classList.contains("bl")) {
                            img.style.width = rect.width + (posX - e.clientX) + "px";
                            img.style.height = rect.height - (posY - e.clientY) + "px";
                        }
                        else if(currentMover.classList.contains("tr")) {
                            img.style.width = rect.width - (posX - e.clientX) + "px";
                            img.style.height = rect.height + (posY - e.clientY) + "px";
                        }
                        else {
                            img.style.width = rect.width + (posX - e.clientX) + "px";
                            img.style.height = rect.height + (posY - e.clientY) + "px";
                        }
                    }
                    else if(e.type == "touchmove") {
                        if(currentMover.classList.contains("br")) {
                            img.style.width = rect.width - (psX - e.targetTouches[0].clientX) + "px";
                            img.style.height = rect.height - (psY - e.targetTouches[0].clientY) + "px";
                        }
                        else if(currentMover.classList.contains("bl")) {
                            img.style.width = rect.width + (psX - e.targetTouches[0].clientX) + "px";
                            img.style.height = rect.height - (psY - e.targetTouches[0].clientY) + "px";
                        }
                        else if(currentMover.classList.contains("tr")) {
                            img.style.width = rect.width - (psX - e.targetTouches[0].clientX) + "px";
                            img.style.height = rect.height + (psY - e.targetTouches[0].clientY) + "px";
                        }
                        else {
                            img.style.width = rect.width + (psX - e.targetTouches[0].clientX) + "px";
                            img.style.height = rect.height + (psY - e.targetTouches[0].clientY) + "px";
                        }
                    }
                    posX = e.clientX;
                    posY = e.clientY;
                }

// Remove "mousemove" and "touchmove" event listeners, after which event, onStartResize() function will be called
// Remove "mouseup" and "touchend" event listeners, after which event, onStopResize() function will be called
                function onStopResize() {
                    window.removeEventListener("mousemove", onStartResize);
                    window.removeEventListener("touchmove", onStartResize);
                    window.removeEventListener("mouseup", onStopResize);
                    window.removeEventListener("touchend", onStopResize);
                }
            }
        });
    });
}