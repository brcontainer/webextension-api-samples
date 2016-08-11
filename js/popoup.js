window.onload = function()
{
    "use strict";

    var getBackground = chrome.extension.getBackgroundPage();

    //Remove badge text
    getBackground.badgeReset();

    document.getElementById("message").textContent =
                    "background.js initiate in " + getBackground.backgroundInitiateIn;

    function Notify(title, message, url)
    {
        var props = {
            "type":    "basic",
            "title":   title,
            "iconUrl": "/images/icon-128px.png",
            "message": message,
            "requireInteraction": true
        };

        /*
         * Note: requireInteraction work only in Chrome, Firefox and Opera don't support this
         */

        //Use url in id
        var id = url;

        try {
            chrome.notifications.create(id, props, function() {});
        } catch (ee) {
            //Firefox don't support requireInteraction and causes exception
            delete props.requireInteraction;

            chrome.notifications.create(id, props, function() {});
        }
    }

    document.getElementById("test1").onclick = function() {
        Notify("Test 1", "Hello world", "https://github.com/brcontainer/webextension-api-samples");
    };

    document.getElementById("test2").onclick = function() {
        Notify("Test 2", "Hello world", "https://github.com/brcontainer");
    };
};
