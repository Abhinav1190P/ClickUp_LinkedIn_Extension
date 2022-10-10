



document.addEventListener('contextmenu', e => {

    var d = document.querySelectorAll('.relative')

    var ele = document.elementFromPoint(e.clientX, e.clientY)
    var theEl = ele.parentElement?.innerHTML?.toString()


    if (d.length > 0) {




        for (var i = 0; i < d.length; i++) {
            var g = JSON.stringify(d[i].innerHTML.toString())
            if (g.includes('data-urn=')) {
                var fi = document.createElement('div')
                var aClass = 'abhi' + Math.floor(Math.random() * 1000)

                if (d[i].innerHTML.toString().includes(theEl)) {
                    chrome.runtime.sendMessage({ from: "post", message: d[i].innerHTML });
                }


                fi.className = aClass
                fi.innerText = ""
                fi.style.cursor = 'pointer'
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

                var aClass = 'abhi' + Math.floor(Math.random() * 1000)

                if (f[i].innerHTML.toString().includes(theEl)) {
                    chrome.runtime.sendMessage({ from: "post", message: f[i].innerHTML });
                }


                fi.className = 'abhi' + Math.floor(Math.random() * 1000)
                fi.innerText = ""
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






