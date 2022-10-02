chrome.tabs.onUpdated.addListener(function(tabid, info, tab) {
    if(tab.url){
        let st = tab.url
        
        if(st.includes("dazzling-quokka-2f23ea.netlify.app")){
            let arr = tab.url?.split('code=')
            let code = arr[1]
            chrome.storage.sync.set({'code':code})
        }
        
    }
});

var chromeContextMenu = {
    "id":"GetPost",
    "title":"Get linkedIn post",
    "contexts":["all"]
}

chrome.contextMenus.create(chromeContextMenu)

chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId=="GetPost"){
        chrome.storage.sync.get("fav",function(fav){
            console.log(fav)
        })
    }
})

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message.from == "post"){
        var name = message.message?.split('<span dir="ltr">')[1].split('</span>')[0]
        var oned = message.message?.split('<span class="break-words">')[1].split('<span><span dir="ltr">')[1].split('<a href="https://www.linkedin.com/feed/hashtag/?')[0]
        var twod = oned.replace(/<br>/g, "");
        console.log(twod)
    }
});


