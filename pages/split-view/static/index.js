// Make the DIV element draggable:
dragElement(document.getElementById("controlBar"));

function dragElement(elmnt) {
    let pos1 = 0,
        pos2 = 0;

    elmnt.addEventListener("mousedown", startDrag);
    elmnt.addEventListener("touchstart", startDrag);

    function startDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos2 = e.clientX || e.touches[0].clientX;
        document.addEventListener("mouseup", closeDragElement);
        document.addEventListener("touchend", closeDragElement);

        document.addEventListener("mousemove", elementDrag);
        document.addEventListener("touchmove", elementDrag, { passive: false });
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos2 - (e.clientX || e.touches[0].clientX);
        pos2 = e.clientX || e.touches[0].clientX;
        const pixel = Math.max(0, Math.min(elmnt.parentElement.offsetWidth - elmnt.offsetWidth, elmnt.offsetLeft - pos1));
        elmnt.style.left = pixel + "px";

        document.getElementById("aPart").style.width = pixel + "px";
    }

    function closeDragElement() {
        document.removeEventListener("mouseup", closeDragElement);
        document.removeEventListener("touchend", closeDragElement);

        document.removeEventListener("mousemove", elementDrag);
        document.removeEventListener("touchmove", elementDrag);
    }
}