
function allElementsFromPoint(x, y) {
    var element, elements = [];
    var old_visibility = [];
    while (true) {
        element = document.elementFromPoint(x, y);
        if (!element || element === document.documentElement) {
            break;
        }
        elements.push(element);
        old_visibility.push(element.style.visibility);
        element.style.visibility = 'hidden'; // Temporarily hide the element (without changing the layout)
    }
    for (var k = 0; k < elements.length; k++) {
        elements[k].style.visibility = old_visibility[k];
    }
    elements.reverse();
    var last_item = elements[elements.length - 1]
    var thing = last_item.innerHTML.toString()

    chrome.runtime.sendMessage({from:"content",message:thing});
    return elements;
}


document.addEventListener('contextmenu', e => {
    e.preventDefault();
    alert(JSON.stringify(e.clientX))
   allElementsFromPoint(e.clientX, e.clientY)
}, { passive: true })


