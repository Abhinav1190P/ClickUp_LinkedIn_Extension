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
        console.log(clickData)
    }
})


