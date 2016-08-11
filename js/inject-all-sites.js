(function (doc) {
    "use strict";

    sendSignal({
        "type": "message",
        "from": "inject-all-sites.js",
        "data": "hello world"
    }, function(response) {
        console.log(response);
    });

    function sendSignal(data, callback)
    {
        //Older Chrome versions requeries callback function
        callback = typeof callback === "function" ? callback : function () {};

        if (chrome.runtime && chrome.runtime.sendMessage) {
            chrome.runtime.sendMessage(data, callback);
        }
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

        var link = doc.createElement("a");
        var div  = doc.createElement("div");

        link.href = "javascript:void(0);";

        link.onclick = function () {
            sendSignal({
                "type": "openinternalpage",
                "file": "/view/example.html"
            }, function(response) {
                console.log(response);
            });
        };

        link.textContent = "[Show internal page]";

        div.className = "fixed-bar-from-extension";

        div.textContent = "Foo Bar Baz - WebExtension sample";

        div.appendChild(link);

        doc.body.appendChild(div);
    }

    if (/^(interactive|complete)$/i.test(doc.readyState)) {
        initiate();
    } else {
        doc.addEventListener("DOMContentLoaded", initiate);
        window.addEventListener("load", initiate);
    }
})(document);
