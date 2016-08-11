(function (doc) {
    "use strict";

    if (chrome.runtime && chrome.runtime.sendMessage) {
        chrome.runtime.sendMessage({
            "from":    "inject-all-sites.js",
            "message": "hello world"
        }, function(response) {});
    }

    function loadCss(uri)
    {
        /*
         * For use this function allow your resource "web_accessible_resources": on manifest
         */
        var style = document.createElement("link");

        style.rel  = "stylesheet";
        style.type = "text/css";
        style.href = chrome.extension.getURL(uri);

        document.body.appendChild(style);
    }

    function initiate()
    {
        loadCss("/css/inject-css.css");

        var div = doc.createElement("div");

        div.className = "fixed-bar-from-extension";

        div.textContent = "Foo Bar Baz - WebExtension sample";

        doc.body.appendChild(div);
    }

    if (/^(interactive|complete)$/i.test(doc.readyState)) {
        initiate();
    } else {
        doc.addEventListener("DOMContentLoaded", initiate);
        window.addEventListener("load", initiate);
    }
})(document);
