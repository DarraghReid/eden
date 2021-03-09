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

/*-----------------------------click-and-appear*/

// Select all menu items and save them to the menuItems variable
let menuItems = document.getElementsByClassName("menu-item");

// Add "click" event listener to each menu item
Array.from(menuItems).forEach(menuItem => menuItem.addEventListener("click", insertImg));

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

    // Call move function on each image so JS code will run after HTML appears
    move();
};

/*-----------------------------moveable elements*/

/*function move() {
    let imgs = document.querySelectorAll(".img-container");
    imgs.forEach(img => img.addEventListener("mousedown", function mousedown(e) {
        let initX = e.clientX;
        let initY = e.clientY;

        window.addEventListener("mousemove", function mousemove(e) {
            let newX = initX - e.clientX;
            let newY = initY - e.clientY;

            const rect = img.getBoundingClientRect();
            img.style.left = rect.left - newX + "px";
            img.style.top = rect.top - newY + "px";

            initX = e.clientX;
            initY = e.clientY;

        window.addEventListener("mouseup", function mouseup() {
            window.removeEventListener("mousemove", mousemove);
            window.removeEventListener("mouseup", mouseup)
        })

        })
    }));
};*/

function move() {
    let imgs = document.querySelectorAll(".img-container");
    imgs.forEach(img => img.addEventListener("mousedown", mousedown));
    imgs.forEach(img => img.addEventListener("touchstart", mousedown));
    function mousedown(e) {
        let initX = e.clientX;
        let initY = e.clientY;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("touchmove", mousemove);
        function mousemove(e) {

            let endX = initX - e.clientX;
            let endY = initY - e.clientY;

            imgs.forEach(img => img.style.left = img.getBoundingClientRect().left - endX + "px");
            imgs.forEach(img => img.style.top = img.getBoundingClientRect().top - endY + "px");

            initX = e.clientX;
            initY = e.clientY;

        window.addEventListener("mouseup", mouseup);
        window.addEventListener("touchend", mouseup);
        function mouseup() {
            window.removeEventListener("mousemove", mousemove);
            window.removeEventListener("mouseup", mouseup)
            window.removeEventListener("touchmove", mousemove);
            window.removeEventListener("touchend", mouseup)
        }

        }
    };
};


/*-----------------------------resizable elements*/