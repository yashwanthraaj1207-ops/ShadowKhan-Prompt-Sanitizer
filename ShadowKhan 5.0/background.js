// ======================================================
// ShadowKhan Background Service Worker
// Version 2.0
// ======================================================

console.log("🛡 ShadowKhan Background Started");

// Install

chrome.runtime.onInstalled.addListener(() => {

    console.log("ShadowKhan Installed Successfully");

});

// Open popup communication

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    switch (request.action) {

        case "analyze":

            sendResponse({

                status: "ok"

            });

            break;

        case "sanitize":

            sendResponse({

                status: "sanitized"

            });

            break;

        case "risk":

            sendResponse({

                received: true

            });

            break;

        default:

            sendResponse({

                status: "unknown"

            });

    }

    return true;

});