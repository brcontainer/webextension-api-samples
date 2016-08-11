(function() {
    "use strict";

    var notificationsTotal = 0;

    window.backgroundInitiateIn = new Date().toString();

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

    /*
     * WARNING:
     * chrome.browserAction.onClicked.addListener not work if popup page is defined
     */

    chrome.browserAction.onClicked.addListener(function(tab) {
        console.log("Click from #" + tab.id + " tab");

        chrome.browserAction.setPopup({
            "tabId": tab.id,
            "popup": "view/popup.html"
        });

        notificationsTotal = 0;

        //clear text in browserButton
        chrome.browserAction.setBadgeText({
            "text": ""
        });
    });

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        chrome.browserAction.setBadgeText({
            "text": String(++notificationsTotal)
        });

        sendResponse({
            "response": "Received message: '" + request.message + "' from '" + request.from + "'"
        });
    });
})();
