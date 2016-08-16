(function (doc, browser) {
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

        setTimeout(function() {
            if (browser.runtime && browser.runtime.sendMessage) {
                browser.runtime.sendMessage(data, callback);
            }
        }, 1000);

        //Use `return true` if async functions is needed

        return true;
    }

    function loadCss(uri)
    {
        /*
         * For use this function allow your resource "web_accessible_resources": on manifest
         */
        var style = document.createElement("link");

        style.rel  = "stylesheet";
        style.type = "text/css";
        style.href = browser.extension.getURL(uri);

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
})(document, chrome||browser);
