(function() {
    "use strict";

    var notificationsTotal = 0;

    window.backgroundInitiateIn = new Date().toString();

    chrome.notifications.onClicked.addListener(function(id, byUser) {
        if (/^(http|https):\/\//.test(id)) {
            setTimeout(function() {
                chrome.tabs.create({ "url": tryUri });
            }, 1);
        }

        chrome.notifications.clear(id);
    });

    chrome.browserAction.onClicked.addListener(function(tab) {
        console.log("Click from #" + tab + " tab");

        notificationsTotal = 0;
    });

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        chrome.browserAction.setBadgeText({
            "text": ++notificationsTotal
        });

        sendResponse({
            "response": "Received message: '" + request.message + "' from '" + request.from + "'"
        });
    });
})();
