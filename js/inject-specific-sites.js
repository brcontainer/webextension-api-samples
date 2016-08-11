(function (doc) {
    "use strict";

    if (chrome.runtime && chrome.runtime.sendMessage) {
        chrome.runtime.sendMessage({
            "from":    "inject-specific-sites.js",
            "message": "hello world"
        }, function(response) {});
    }
})(document);
