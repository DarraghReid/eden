window.setTimeout(onLoadHome, 500);

function onLoadHome(){
    // Add swoop-in animation to elements
    let tops = document.querySelectorAll(".top");
    let bottoms = document.querySelectorAll(".bottom");
    let grassBottoms = document.querySelectorAll(".grassBottom");
    let lefts = document.querySelectorAll(".left");
    let rights = document.querySelectorAll(".right");

    // Function to add the swoop-in class to each element
    function swoopIn(item) {
        item.classList.add("swoop");
    }

    // Add the swoop-in class to each element
    tops.forEach(top => swoopIn(top));
    bottoms.forEach(bottom => swoopIn(bottom));
    lefts.forEach(left => swoopIn(left));
    rights.forEach(right => swoopIn(right));
    grassBottoms.forEach(grassBottom => swoopIn(grassBottom));
}

/*-----------------------------click-and-appear*/
const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach(menuItem => {
    menuItem.addEventListener("click", insertImg);
    menuItem.addEventListener("touchend", insertImg);
});

function insertImg(e) {
    e.preventDefault(); 

    // create a new image container
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");
    imgContainer.style.position = "absolute";// Positioning the container absolutely so it can be moved
    imgContainer.style.left = "100px";
    imgContainer.style.top = "100px";
    imgContainer.style.width = "120px";
    imgContainer.style.height = "120px";

    // create the handles for resizing and moving
    const corners = ["tl", "tr", "br", "bl"];
    corners.forEach(corner => { 
        const handle = document.createElement("div");//
        handle.classList.add("mover", corner);
        imgContainer.appendChild(handle);
    });

    // create the remove icon to delete the image
    const remove = document.createElement("div");
    remove.classList.add("mover", "remove");
    const icon = document.createElement("i");
    icon.classList.add("far", "fa-times-circle");
    remove.appendChild(icon);
    imgContainer.appendChild(remove);

    // create the image element
    const newImg = document.createElement("img");
    newImg.src = e.currentTarget.getAttribute("data-img");
    newImg.classList.add("canvas-img");
    newImg.style.width = "100%";
    newImg.style.height = "100%";
    imgContainer.appendChild(newImg);

    // append the image container to the canvas
    document.getElementById("canvas").appendChild(imgContainer);
}

/*----------------------------- move & resize unified */
// Variables to track the active element and its initial state
let active = null; // The currently active image container being moved or resized
let startX = 0, startY = 0; // Initial mouse position when the action starts
let startLeft = 0, startTop = 0; // Initial position of the active element
let startWidth = 0, startHeight = 0; // Initial size of the active element
let action = null; // action can be "move" or "resize"
let corner = null; // corner can be "tl", "tr", "br", "bl" for resize handles
const minSize = 30; 

document.getElementById("canvas").addEventListener("pointerdown", function (e) {
    const container = e.target.closest(".img-container");
    if (!container) return;

    // Check if remove icon or its parent was clicked
    if (
        e.target.classList.contains("remove") ||
        e.target.closest(".remove")
    ) {
        container.remove();
        return;
    }

    // Continue with drag/resize
    e.preventDefault();
    active = container;
    startX = e.clientX;
    startY = e.clientY;
    startLeft = parseInt(container.style.left);
    startTop = parseInt(container.style.top);
    startWidth = parseInt(container.style.width);
    startHeight = parseInt(container.style.height);

    if (e.target.classList.contains("canvas-img")) {
        action = "move";
    } else if (e.target.classList.contains("mover")) {
        action = "resize";
        if (e.target.classList.contains("tl")) corner = "tl";
        else if (e.target.classList.contains("tr")) corner = "tr";
        else if (e.target.classList.contains("bl")) corner = "bl";
        else corner = "br";
    } else {
        return;
    }

    e.target.setPointerCapture(e.pointerId); // Capture the pointer to receive events until released
    e.target.addEventListener("pointermove", onPointerMove);// Add pointermove event listener to the target to handle movement or resizing
    e.target.addEventListener("pointerup", onPointerUp);// Add pointerup event listener to the target to handle the end of the action
});


function onPointerMove(e) {
    if (!active) return; 

    const dx = e.clientX - startX;// Calculate the change in X position. dx is the difference between the current mouse position and the initial mouse position.
    const dy = e.clientY - startY;// Calculate the change in Y position. dy is the difference between the current mouse position and the initial mouse position.

    if (action === "move") {
        active.style.left = `${startLeft + dx}px`; // Update the left position of the active element
        active.style.top = `${startTop + dy}px`; // Update the top position of the active element
    } else if (action === "resize") {
        let newWidth = startWidth;//
        let newHeight = startHeight;
        let newLeft = startLeft;
        let newTop = startTop;

        if (corner === "br") {
            newWidth = startWidth + dx;
            newHeight = startHeight + dy;
        } else if (corner === "bl") {
            newWidth = startWidth - dx;
            newHeight = startHeight + dy;
            newLeft = startLeft + dx;
        } else if (corner === "tr") {
            newWidth = startWidth + dx;
            newHeight = startHeight - dy;
            newTop = startTop + dy;
        } else if (corner === "tl") {
            newWidth = startWidth - dx;
            newHeight = startHeight - dy;
            newLeft = startLeft + dx;
            newTop = startTop + dy;
        }

        // Ensure the new width and height are at least minSize
        active.style.width = `${Math.max(minSize, newWidth)}px`; 
        active.style.height = `${Math.max(minSize, newHeight)}px`;
        active.style.left = `${newLeft}px`;
        active.style.top = `${newTop}px`;
    }
}

function onPointerUp(e) {
    if (!active) return;

    e.target.removeEventListener("pointermove", onPointerMove);
    e.target.removeEventListener("pointerup", onPointerUp);
    e.target.releasePointerCapture(e.pointerId);

    active = null;
    action = null;
    corner = null;
}
