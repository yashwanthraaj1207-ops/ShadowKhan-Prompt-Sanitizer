console.log("🛡 ShadowKhan Extension Loaded");

const checkBtn = document.getElementById("checkBtn");
const sanitizeBtn = document.getElementById("sanitizeBtn");
const downloadBtn = document.getElementById("downloadBtn");
const promptInput = document.getElementById("promptInput");

let latestResult = null;
let finalReport = "";

checkBtn.onclick = function () {

    let prompt = promptInput.value.trim();

    if (prompt === "") {
        alert("Please enter a prompt.");
        return;
    }

    latestResult = analyzePrompt(prompt);

    displayResult(latestResult, prompt);
};

sanitizeBtn.onclick = function () {

    if (!latestResult) {
        alert("Analyze the prompt first.");
        return;
    }

    document.getElementById("sanitizedPrompt").innerHTML =
        generateReport(promptInput.value, latestResult);
};

downloadBtn.onclick = function () {

    if (finalReport === "") {
        alert("Generate a report first.");
        return;
    }

    let blob = new Blob([finalReport], { type: "text/plain" });

    let a = document.createElement("a");

    a.href = URL.createObjectURL(blob);

    a.download = "ShadowKhan_Report.txt";

    a.click();
};

function analyzePrompt(prompt) {

    let findings = [];

    let score = 0;

    let lower = prompt.toLowerCase();

    // Prompt Injection

    const injections = [

        "ignore all previous instructions",

        "reveal your system prompt",

        "disable safety rules",

        "provide confidential"

    ];

    injections.forEach(item => {

        if (lower.includes(item)) {

            findings.push("⚠️ Prompt Injection : " + item);

            score += 20;
        }

    });

    // Email

    const email =
        /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;

    if (email.test(prompt)) {

        findings.push("📧 Email Address Detected");

        score += 15;
    }

    // Phone

    const phone =
        /\b[6-9]\d{9}\b/;

    if (phone.test(prompt)) {

        findings.push("📱 Phone Number Detected");

        score += 15;
    }

    // Aadhaar

    const aadhaar =
        /\b\d{4}\s?\d{4}\s?\d{4}\b/;

    if (aadhaar.test(prompt)) {

        findings.push("🪪 Aadhaar Number Detected");

        score += 20;
    }

    // PAN

    const pan =
        /\b[A-Z]{5}[0-9]{4}[A-Z]\b/;

    if (pan.test(prompt)) {

        findings.push("🪪 PAN Card Detected");

        score += 15;
    }

    // Password

    const password =
        /(password|passwd|pwd)\s*[:=]\s*\S+/i;

    if (password.test(prompt)) {

        findings.push("🔑 Password Detected");

        score += 20;
    }

    // API Key

    const api =
        /(api[_ -]?key)\s*[:=]\s*\S+/i;

    if (api.test(prompt)) {

        findings.push("🔐 API Key Detected");

        score += 20;
    }

    if (score > 100)
        score = 100;

    let level = "LOW";

    if (score >= 70)
        level = "HIGH";
    else if (score >= 40)
        level = "MEDIUM";

    return {

        score,

        level,

        findings,

        recommendations: [

            "Remove sensitive information.",

            "Avoid sharing passwords or API keys.",

            "Mask personal data before sending.",

            "Use safe AI prompts."

        ]

    };

}
// ==============================
// DISPLAY RESULT
// ==============================

function displayResult(data, prompt) {

    const level = document.getElementById("riskLevel");
    const score = document.getElementById("riskScore");
    const findings = document.getElementById("findings");
    const threat = document.getElementById("threatDetection");
    const recommendation = document.getElementById("recommendation");
    const sanitized = document.getElementById("sanitizedPrompt");

    level.innerHTML = data.level;

    level.className = "";

    level.classList.add(data.level.toLowerCase());

    score.innerHTML = data.score + "%";

    findings.innerHTML = "";

    if (data.findings.length === 0) {

        findings.innerHTML =
        "<li>✅ No security threats detected.</li>";

    }

    else {

        data.findings.forEach(item => {

            let li = document.createElement("li");

            li.innerHTML = item;

            findings.appendChild(li);

        });

    }

    threat.innerHTML =

    data.findings.length ?

    "🛡 Prompt contains security/privacy risks."

    :

    "✅ Prompt appears safe.";

    recommendation.innerHTML =

    "<ul>" +

    data.recommendations.map(

    x => "<li>" + x + "</li>"

    ).join("")

    +

    "</ul>";

    sanitized.innerHTML =

    generateReport(prompt, data);

}



// ==============================
// REPORT GENERATOR
// ==============================

function generateReport(prompt, data) {

    let clean = sanitizePrompt(prompt);

    let date = new Date().toLocaleString();

    finalReport =

`========================================

        SHADOWKHAN SECURITY REPORT

========================================

Generated:
${date}

----------------------------------------

Risk Level:
${data.level}

Risk Score:
${data.score}%

----------------------------------------

Security Findings

${data.findings.length ?

data.findings.join("\n")

:

"No security threats detected."}

----------------------------------------

Sanitized Prompt

${clean}

----------------------------------------

Recommendations

${data.recommendations.join("\n")}

========================================

Protected by ShadowKhan AI Security

========================================`;

    return finalReport.replace(/\n/g,"<br>");

}
// ==============================
// SANITIZER ENGINE
// ==============================

function sanitizePrompt(prompt) {

    let clean = prompt;

    // Remove email addresses
    clean = clean.replace(
        /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g,
        "[EMAIL REMOVED]"
    );

    // Remove Indian phone numbers
    clean = clean.replace(
        /\b(?:\+91[-\s]?)?[6-9]\d{9}\b/g,
        "[PHONE NUMBER REMOVED]"
    );

    // Remove Aadhaar numbers
    clean = clean.replace(
        /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g,
        "[AADHAAR NUMBER REMOVED]"
    );

    // Remove PAN numbers
    clean = clean.replace(
        /\b[A-Z]{5}[0-9]{4}[A-Z]\b/g,
        "[PAN CARD REMOVED]"
    );

    // Remove password values
    clean = clean.replace(
/(password|passwd|pwd)\s*(is|:|=|-)?\s*\S+/gi,
"[PASSWORD REMOVED]"
);
    // Remove API key values
    clean = clean.replace(
/(api[\s_-]?key)\s*(is|:|=|-)?\s*\S+/gi,
"[API KEY REMOVED]"
);
    // Prompt injection patterns
    clean = clean.replace(
        /ignore all previous instructions/gi,
        "[PROMPT INJECTION REMOVED]"
    );

    clean = clean.replace(
        /reveal your system prompt/gi,
        "[SYSTEM PROMPT REQUEST REMOVED]"
    );

    clean = clean.replace(
        /disable safety rules/gi,
        "[SAFETY BYPASS REMOVED]"
    );

    clean = clean.replace(
        /provide confidential/gi,
        "[CONFIDENTIAL REQUEST REMOVED]"
    );

    return clean;

}
// ======================================================
// LIVE UPDATE FROM FLOATING ASSISTANT
// ======================================================

function refreshPopup() {

    chrome.storage.local.get(

        [

            "shadowRisk",

            "shadowScore",

            "shadowFindings",

            "shadowPrompt"

        ],

        (data)=>{

            if(!data.shadowRisk) return;

            document.getElementById("riskLevel").innerText=

            data.shadowRisk;

            document.getElementById("riskScore").innerText=

            data.shadowScore+"%";

            const findings=

            document.getElementById("findings");

            findings.innerHTML="";

            data.shadowFindings.forEach(item=>{

                let li=document.createElement("li");

                li.innerText=item;

                findings.appendChild(li);

            });

            document.getElementById("sanitizedPrompt").innerHTML=

            data.shadowPrompt;

        }

    );

}

setInterval(refreshPopup,800);