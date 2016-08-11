(function() {
    "use strict";

    var notificationsTotal = 0;

    //Share variable with internal pages, like popup.html
    window.backgroundInitiateIn = new Date().toString();
    window.badgeReset = function(tab) {
        notificationsTotal = 0;

        //clear text in browserButton
        chrome.browserAction.setBadgeText({
            "text": ""
        });
    };

    chrome.notifications.onClicked.addListener(function(id, byUser) {
        //Use id for get url
        if (/^(http|https):\/\//.test(id)) {

            //Prevent bug in some browsers
            setTimeout(function() {
                chrome.tabs.create({ "url": id });
            }, 1);
        }

        chrome.notifications.clear(id);
    });

    function openInternalPage(file)
    {
        var internalUrl = chrome.extension.getURL(file);

        /*
         * Firefox don't support query with `moz-extension:` url
         * Details: http://stackoverflow.com/a/38733159/1518921
         *
         * For use this function is needed put tabs in permissions, like this:
         *   "permissions": [
         *       "tabs"
         *   ]
         */

        chrome.tabs.query({}, function(tabs) {
            var tabId;

            if (tabs && tabs.length) {
                for (var i = tabs.length - 1; i >= 0; i--) {
                    if (tabs[i].url === internalUrl) {
                        tabId = tabs[i].id;
                        break;
                    }
                }
            }

            if (tabId) {
                //Focuses tab if is open
                chrome.tabs.update(tabId, { "active": true });
            } else {
                //Create new tab
                chrome.tabs.create({ "url": internalUrl });
            }
        });
    }

    function sendFeedBack(request, sendResponse)
    {
        chrome.browserAction.setBadgeText({
            "text": String(++notificationsTotal)
        });

        sendResponse({
            "response": "Received message: '" + request.data + "' from '" + request.from + "'"
        });
    }

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        switch (request.type) {
            case "message":
                sendFeedBack(request, sendResponse);
            break;

            case "openinternalpage":
                openInternalPage(request.file);
            break;
        }
    });
})();
