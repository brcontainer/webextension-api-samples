(function (doc, browser) {
    "use strict";

    if (browser.runtime && browser.runtime.sendMessage) {
        browser.runtime.sendMessage({
            "type": "message",
            "from": "inject-specific-sites.js",
            "data": "hello world"
        }, function(response) {
            console.log(response);
        });
    }
})(document, chrome||browser);
