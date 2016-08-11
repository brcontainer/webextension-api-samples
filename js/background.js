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

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        chrome.browserAction.setBadgeText({
            "text": String(++notificationsTotal)
        });

        sendResponse({
            "response": "Received message: '" + request.message + "' from '" + request.from + "'"
        });
    });
})();
