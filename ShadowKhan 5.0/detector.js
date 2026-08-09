// ======================================================
// SHADOWKHAN DETECTION ENGINE
// ======================================================


console.log("🛡 ShadowKhan Detector Loaded");


// ======================================================
// SENSITIVE DATA PATTERNS
// ======================================================


const detectors = [


    // Passwords

    {
        name: "Password",

        regex:
        /\b(password|passwd|pwd|pass)\s*[:=]\s*[^\s]+/gi,

        severity: 25
    },


    // Standalone password-like values

    {
        name: "Possible Password",

        regex:
        /\b[A-Za-z0-9@#$%^&*!]{8,}\b(?=.*[0-9])(?=.*[A-Z])/g,

        severity: 15
    },


    // Email

    {
        name: "Email Address",

        regex:
        /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,

        severity: 10
    },


    // Phone number

    {
        name: "Phone Number",

        regex:
        /\b[6-9]\d{9}\b/g,

        severity: 15
    },


    // Aadhaar

    {
        name: "Aadhaar Number",

        regex:
        /\b\d{4}\s\d{4}\s\d{4}\b/g,

        severity: 30
    },


    // PAN

    {
        name: "PAN Number",

        regex:
        /\b[A-Z]{5}[0-9]{4}[A-Z]\b/g,

        severity: 25
    },


    // Credit card

    {
        name: "Credit Card",

        regex:
        /\b(?:\d[ -]*?){13,16}\b/g,

        severity: 30
    },


    // ==================================================
    // API / SECRET DETECTION
    // ==================================================


    // OpenAI API Key

    {
        name: "OpenAI API Key",

        regex:
        /\bsk-[a-zA-Z0-9]{10,}\b/g,

        severity: 40
    },


    // GitHub Token

    {
        name: "GitHub Token",

        regex:
        /\bghp_[a-zA-Z0-9]{20,}\b/g,

        severity: 40
    },


    // AWS Access Key

    {
        name: "AWS Access Key",

        regex:
        /\bAKIA[0-9A-Z]{16}\b/g,

        severity: 40
    },


    // JWT Token

    {
        name: "JWT Token",

        regex:
        /\beyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\b/g,

        severity: 35
    },


    // Generic Secret Keys

    {
        name: "Secret Key",

        regex:
        /\b[A-Za-z0-9_-]{32,64}\b/g,

        severity: 20
    },


    // IP Address

    {
        name: "IP Address",

        regex:
        /\b(?:\d{1,3}\.){3}\d{1,3}\b/g,

        severity: 10
    }



];



// ======================================================
// PROMPT INJECTION DETECTION
// ======================================================


const injectionPatterns = [

    "ignore previous instructions",

    "ignore all previous instructions",

    "reveal system prompt",

    "show system prompt",

    "disable safety",

    "developer mode",

    "bypass security",

    "jailbreak",

    "forget your rules"

];




// ======================================================
// ANALYZE PROMPT
// ======================================================


function analyzePrompt(text){


    let findings = [];

    let score = 0;


    let sanitized = text;



    detectors.forEach(detector => {


        let matches = text.match(detector.regex);



        if(matches){


            findings.push(detector.name);


            score += detector.severity;



            matches.forEach(match => {


                sanitized =
                sanitized.replace(
                    match,
                    `[${detector.name.toUpperCase()}]`
                );


            });


        }


    });




    // Prompt Injection Check


    injectionPatterns.forEach(pattern => {


        if(
            text.toLowerCase()
            .includes(pattern)
        ){


            findings.push(
                "Prompt Injection Attempt"
            );


            score += 35;


            sanitized =
            sanitized.replace(
                new RegExp(pattern,"gi"),
                "[BLOCKED INSTRUCTION]"
            );


        }


    });




    // Remove duplicates


    findings =
    [...new Set(findings)];



    // Limit score

    if(score > 100)

        score = 100;




    let level = "LOW";


    if(score >= 70)

        level="HIGH";


    else if(score >= 40)

        level="MEDIUM";




    return {


        level: level,


        score: score,


        findings: findings,


        sanitized: sanitized


    };


}



// Make available to content.js

window.analyzePrompt = analyzePrompt;