(function (doc) {
    "use strict";

    if (chrome.runtime && chrome.runtime.sendMessage) {
        chrome.runtime.sendMessage({
            "type": "message",
            "from": "inject-specific-sites.js",
            "data": "hello world"
        }, function(response) {
            console.log(response);
        });
    }
})(document);
