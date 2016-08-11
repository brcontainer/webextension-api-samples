window.onload = function()
{
    "use strict";

    var getBackground = chrome.extension.getBackgroundPage();

    document.getElementById("message").textContent =
                    "background.js initiate in " + getBackground.backgroundInitiateIn;
};
