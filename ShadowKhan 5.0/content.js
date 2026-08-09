// ======================================================
// SHADOWKHAN CONTENT SCRIPT V2
// ======================================================

console.log("🛡 ShadowKhan Loaded");

// Prevent duplicate injection
if (window.shadowKhanLoaded) {
    console.log("ShadowKhan already running.");
} else {
    window.shadowKhanLoaded = true;
}

let latestPrompt = "";
let lastPrompt = "";
let monitoringStarted = false;

let panelAutoOpened = false;
let lastRiskLevel = "LOW";
// ======================================================
// FIND CHAT INPUT
// ======================================================

function findPromptBox() {

    return (
        document.querySelector('[contenteditable="true"]') ||
        document.querySelector("textarea")
    );

}

// ======================================================
// GET PROMPT TEXT
// ======================================================

function getPromptText(editor) {

    if (!editor)
        return "";

    if (editor.tagName === "TEXTAREA") {

        return editor.value.trim();

    }

    return editor.innerText.trim();

}
// ======================================================
// CREATE FLOATING BUTTON
// ======================================================

function createFloatingButton() {

    if (document.getElementById("shadowkhan-button"))
        return;

   const shadowButton = document.createElement("div");

shadowButton.id = "shadowkhan-button";


shadowButton.innerHTML = `
    <img 
        src="${chrome.runtime.getURL("icons/icon128.png")}"
        class="shadow-logo"
    >
`;

document.body.appendChild(shadowButton);
shadowButton.addEventListener("click", () => {

    const panel = document.getElementById("shadowkhan-panel");

    if(panel){

        panel.classList.toggle("show");

    }
    else{

        console.log("ShadowKhan panel not found");

    }

});

}
// ======================================================
// CREATE PANEL
// ======================================================

function createPanel() {

    if (document.getElementById("shadowkhan-panel"))
        return;

    const panel = document.createElement("div");

    panel.id = "shadowkhan-panel";

    panel.innerHTML =

    `
    <div class="sk-header">

        ShadowKhan

        <span id="sk-close">✕</span>

    </div>

    <div class="sk-body">

        <div class="risk-box">

            <h3>Risk Level</h3>

            <div id="sk-risk" class="low">

                LOW

            </div>

            <div id="sk-score">

                100%

            </div>

        </div>

        <div class="findings-box">

    <h3>Detected Information</h3>

    <ul id="sk-findings">

        <li>
            No sensitive information detected.
        </li>

    </ul>

</div>

<div class="sanitized-box">

    <h3>Sanitized Report</h3>

    <div id="sk-sanitized">

        No sanitization required.

    </div>


    <div class="sk-buttons">

        <button id="sk-copy">
            📋 Copy
        </button>


        <button id="sk-download">
            ⬇ Download
        </button>


        <button id="sk-ignore">
            🚫 Ignore Once
        </button>

    </div>


</div>
    </div>
    `;

    document.body.appendChild(panel);

    document.getElementById("sk-close").onclick = () => {

    panel.classList.remove("show");
    // ================================
// BUTTON EVENTS
// ================================


const copyButton =
document.getElementById("sk-copy");


const downloadButton =
document.getElementById("sk-download");


const ignoreButton =
document.getElementById("sk-ignore");





// COPY BUTTON

if(copyButton){

    copyButton.onclick = () => {


        const report =
        document.getElementById("sk-sanitized").innerText;


        navigator.clipboard.writeText(report)
        .then(()=>{

            copyButton.innerText="✅ Copied";

            setTimeout(()=>{

                copyButton.innerText="📋 Copy";

            },1500);

        });


    };

}





// DOWNLOAD BUTTON

if(downloadButton){

    downloadButton.onclick = () => {


        const report =
        document.getElementById("sk-sanitized").innerText;


        const file =
        new Blob(
            [report],
            {
                type:"text/plain"
            }
        );


        const link =
        document.createElement("a");


        link.href =
        URL.createObjectURL(file);


        link.download =
        "ShadowKhan_Sanitized_Report.txt";


        link.click();


    };

}





// IGNORE BUTTON

if(ignoreButton){

    ignoreButton.onclick = () => {


        const panel =
        document.getElementById("shadowkhan-panel");


        panel.classList.remove("show");


        panelAutoOpened=true;


        ignoreButton.innerText="Ignored";


    };

}
    // COPY SANITIZED REPORT

document.getElementById("sk-copy").onclick = () => {


    const text =
    document.getElementById("sk-sanitized").innerText;


    navigator.clipboard.writeText(text);


    alert("Sanitized report copied!");

};




// DOWNLOAD REPORT

document.getElementById("sk-download").onclick = () => {


    const text =
    document.getElementById("sk-sanitized").innerText;


    const blob =
    new Blob(
        [text],
        {
            type:"text/plain"
        }
    );


    const url =
    URL.createObjectURL(blob);


    const a =
    document.createElement("a");


    a.href=url;

    a.download="ShadowKhan_Sanitized_Report.txt";


    a.click();


    URL.revokeObjectURL(url);


};





// IGNORE ONCE

document.getElementById("sk-ignore").onclick = () => {


    const panel =
    document.getElementById("shadowkhan-panel");


    panel.classList.remove("show");


    panelAutoOpened=true;


};

    // Don't reopen immediately for the same risk
    panelAutoOpened = true;

};

}
// ======================================================
// LIVE MONITORING ENGINE
// ======================================================

function startMonitoring() {

    if (monitoringStarted) return;

    monitoringStarted = true;

    setInterval(() => {

        const editor = findPromptBox();

        if (!editor)
            return;

        const text = getPromptText(editor);

        if (text === lastPrompt)
            return;

        lastPrompt = text;
        latestPrompt = text;

        console.log("🛡 Prompt Changed:", text);

        if (typeof analyzePrompt !== "function") {

            console.error("❌ analyzePrompt() not found.");

            return;

        }

        const result = analyzePrompt(text);

        updatePanel(result);

    }, 300);

}
// ======================================================
// UPDATE PANEL
// ======================================================

function updatePanel(result) {

    const risk =
        document.getElementById("sk-risk");

    const score =
        document.getElementById("sk-score");

    const findings =
        document.getElementById("sk-findings");
    const sanitized =
    document.getElementById("sk-sanitized");

    if (!risk || !score || !findings || !sanitized)
    return;

    risk.innerText = result.level;

    risk.className = "";

    risk.classList.add(result.level.toLowerCase());

    score.innerText =
        result.score + "% Risk";

    findings.innerHTML = "";

    if (result.findings.length === 0) {

        findings.innerHTML =

        "<li>✅ No sensitive information detected.</li>";

    }

    else {

        result.findings.forEach(item => {

            const li = document.createElement("li");

            li.innerText = item;

            findings.appendChild(li);

        });

    }
    // ================================
// SANITIZED REPORT DISPLAY
// ================================

if(result.sanitized && result.sanitized !== latestPrompt){

    sanitized.innerText =
result.sanitized
.replace(/\n\s*\n/g,"\n")
.trim();

}

else{

    sanitized.innerText =
    "No sensitive information detected.";

}

    const panel = document.getElementById("shadowkhan-panel");

if (panel) {

    if (
        (result.level === "MEDIUM" || result.level === "HIGH") &&
        (!panelAutoOpened || lastRiskLevel !== result.level)
    ) {

        panel.classList.add("show");

        panelAutoOpened = true;

    }

    if (result.level === "LOW") {

        panelAutoOpened = false;

    }

    lastRiskLevel = result.level;

}
const button = document.getElementById("shadowkhan-button");

if (button) {

    button.classList.remove(
        "risk-low",
        "risk-medium",
        "risk-high"
    );

    if (result.level === "LOW") {

        button.classList.add("risk-low");

    }

    else if (result.level === "MEDIUM") {

        button.classList.add("risk-medium");

    }

    else if (result.level === "HIGH") {

        button.classList.add("risk-high");

    }

}

    chrome.storage.local.set({

        shadowRisk: result.level,

        shadowScore: result.score,

        shadowFindings: result.findings,

        shadowPrompt: result.sanitized

    });

}
// ======================================================
// INITIALIZE SHADOWKHAN
// ======================================================

window.addEventListener("load", () => {

    console.log("Creating Panel...");

    console.log("🚀 Initializing ShadowKhan");

    createFloatingButton();

    createPanel();

    startMonitoring();

});
