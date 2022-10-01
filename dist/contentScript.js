




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
    /*    alert(JSON.stringify(last_item.innerHTML)) */

}


document.addEventListener('contextmenu', e => {
    e.preventDefault();
    var d = document.querySelectorAll('.relative')
    for (var i = 0; i < d.length; i++) {
        var g = JSON.stringify(d[i].innerHTML.toString())
        if (g.includes('data-urn=')) {
            var fi = document.createElement('div')
            fi.className = 'abhi' + Math.floor(Math.random() * 1000)
            fi.innerText = "Hello this is me"
            fi.style.cursor = 'pointer'
            fi.onclick = myFunc
            d[i].appendChild(fi)
        }
    }

    /*     allElementsFromPoint(e.clientX, e.clientY) */
},{passive:true})
const myFunc = (e) => {

    var classN = e.target.getAttribute('class')
    var theEl = document.querySelector("."+classN)
    var theS =theEl.parentElement.getAttribute('data-id')
    alert(theS.split(':')[3])
 
}   



