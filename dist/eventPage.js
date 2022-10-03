chrome.tabs.onUpdated.addListener(function (tabid, info, tab) {
    if (tab.url) {
        let st = tab.url

        if (st.includes("dazzling-quokka-2f23ea.netlify.app")) {
            let arr = tab.url?.split('code=')
            let code = arr[1]
            chrome.storage.sync.set({ 'code': code })
        }

    }
});

var chromeContextMenu = {
    "id": "GetPost",
    "title": "Get linkedIn post",
    "contexts": ["all"]
}

chrome.contextMenus.create(chromeContextMenu)



chrome.contextMenus.onClicked.addListener(function (clickData) {




    if (clickData.menuItemId == "GetPost") {


        chrome.storage.sync.get("fav", function (fav) {



            var rawobj = fav?.fav
            var obj = {
                name: rawobj.user_name,
                description: rawobj.desc
            }


            const CreateTask = async () => {

                try {

                    chrome.storage.local.get("local_token", async function (hey) {
                        let sh = hey.local_token
                        if (sh.local_token?.length > 0) {
                            console.log(obj)
                            const data = await fetch(`https://api.clickup.com/api/v2/list/199318863/task`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    "Authorization": sh.local_token
                                },
                                body: JSON.stringify(obj)
                            })
                            const newtask = await data.json()
                            console.log(newtask)
                        }

                    })


                } catch (error) {
                    console.log(error.message)
                }


            }

            CreateTask()

        })
    }
})

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.from == "post") {
        var name = message.message?.split('<span dir="ltr">')[1].split('</span>')[0]
        var oned = message.message?.split('<span class="break-words">')[1].split('<span><span dir="ltr">')[1]
        var twod
        var hashtags = '';
        var hash_list = []

        if (oned.includes('<br><a href="https://www.linkedin.com/feed/hashtag/?')) {
            twod = oned.split('<br><a href="https://www.linkedin.com/feed/hashtag/?')[0]
            if (oned.split('<br><a href="https://www.linkedin.com/feed/hashtag/?')[1]) {
                hashtags = oned.split('<br><a href="https://www.linkedin.com/feed/hashtag/?')[1].split('</span></span>')[0]
                hash_list = hashtags.match(/\#\w+/g)
            }
        }
        else {
            twod = oned.split('</span></span>')[0]
        }

        var images = message.message.match(/<img.*?src="(.*?)"/g)
        var profileimage = images[0].split('"')[1]

        var allImages = []

        for (var j = 0; j < images.length; j++) {
            var anImage = images[j].includes('width=')
            if (anImage) {
                var postImg = images[j]
                allImages.push(postImg)
            }

        }


        var threed = twod.replace(/<br>/g, "");
        var finalDesc = ''
        var splitter = threed.split('</a>')
        for (var j = 0; j < splitter.length; j++) {
            var atag = splitter[j].split('>')[1]
            var inlineMention = splitter[j].replace(/<a[^>]*>([^<]+)/g, atag)
            finalDesc = finalDesc + inlineMention
        }

        let obj = {
            user_name: name,
            hashes: hash_list,
            desc: finalDesc,
            imgs: allImages,
            user_profile: profileimage
        }
        chrome.storage.sync.set({ "fav": obj })


    }
});


