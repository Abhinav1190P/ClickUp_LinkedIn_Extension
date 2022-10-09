



document.addEventListener('contextmenu', e => {

    var d = document.querySelectorAll('.relative')




    if (d.length > 0) {
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
    }

    var f = document.querySelectorAll('.occludable-update')


    if (f.length > 0) {
      
        for (var i = 0; i < f.length; i++) {
            var g = JSON.stringify(f[i].innerHTML.toString())
         
            if (g.includes('data-urn=')) {
                var fi = document.createElement('div')
                fi.className = 'abhi' + Math.floor(Math.random() * 1000)
                fi.innerText = "Hello this is me"
                fi.style.cursor = 'pointer'
                fi.onclick = myFunc
                f[i].appendChild(fi)
            }
        }
    }


})


const myFunc = (e) => {

    var classN = e.target.getAttribute('class')
    var theEl = document.querySelector("." + classN)
    var theS = theEl.parentElement.innerHTML

    chrome.runtime.sendMessage({ from: "post", message: theS });

}



