# 🛡️ ShadowKhan – Prompt Sanitizer

> **An AI-powered prompt security tool designed to detect sensitive information, identify security risks, and help users create safer prompts before submission.**

ShadowKhan is a browser-based prompt sanitization and security assistant that analyzes user-entered prompts for potentially sensitive information such as passwords, API keys, financial information, personal identifiers, authentication credentials, and other confidential data.

The goal is simple:

**Detect → Analyze → Warn → Protect**

---

## 🚀 Overview

With the rapid growth of Generative AI, users frequently copy and paste sensitive information into AI prompts without realizing the security risks involved.

ShadowKhan addresses this problem by providing a security-focused layer between the user and the AI system.

The application analyzes the entered prompt, identifies potentially sensitive information, evaluates the associated risk level, and provides security recommendations to help users avoid accidental data exposure.

### 🔐 ShadowKhan helps users:

- Detect sensitive information in prompts
- Identify potentially dangerous patterns
- Classify security risks
- Provide security recommendations
- Improve prompt safety
- Understand why specific information is risky
- Interact with an AI-powered security assistant
- Reduce accidental exposure of confidential information

---

# ✨ Key Features

## 🔍 1. Sensitive Data Detection

ShadowKhan scans prompts for potentially sensitive information such as:

- 🔑 Passwords
- 🔐 API Keys
- 🪪 Government / Personal Identification Numbers
- 💳 Payment Card Information
- 🏦 Bank Account Details
- 📧 Email Addresses
- 🌐 IP Addresses
- 🔒 Authentication Tokens
- 🗝️ Secret Configuration Values
- 🧑‍💻 Access Credentials

The system analyzes the input and highlights potential security concerns.

---

## ⚠️ 2. Risk Classification

ShadowKhan categorizes detected information into different security levels.

### 🟢 Low Risk

Information that generally has limited security impact.

Examples:

- Public usernames
- General project information
- Non-sensitive technical descriptions
- Publicly available information

---

### 🟡 Medium Risk

Information that could expose personal, internal, or technical details.

Examples:

- Email addresses
- Internal IP addresses
- Personal identifiers
- Internal system information
- Non-critical configuration information

---

### 🔴 High Risk

Highly sensitive information that should not be exposed publicly or unnecessarily shared with AI systems.

Examples:

- Passwords
- API Keys
- Access Tokens
- Bank Account Numbers
- Payment Card Information
- Authentication Credentials
- Private Secrets
- Database Credentials

---

# 🤖 AI Security Assistant

ShadowKhan includes an interactive security assistant that helps users understand cybersecurity risks and safer practices.

Users can ask questions such as:

```
Why is sharing an API key dangerous?

How can I protect my password?

What should I remove from this prompt?

Is this information safe to share with an AI?

How can I sanitize my prompt?
```
🧠 How ShadowKhan Works

ShadowKhan follows a simple security workflow:

User enters prompt
        ↓
Prompt Analysis
        ↓
Sensitive Data Detection
        ↓
Risk Classification
        ↓
Security Alert
        ↓
Security Recommendation
        ↓
Safer Prompt
🔍 Detection

The application analyzes the entered prompt for potentially sensitive information.

⚠️ Risk Assessment

Detected information is categorized into Low, Medium, or High risk.

🛡️ Security Recommendation

The user receives appropriate guidance on how to remove, replace, or protect the sensitive information.

📁 Project Structure
ShadowKhan-Prompt-Sanitizer/
│
├── index.html
├── style.css
├── script.js
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── ...
│
├── README.md
└── LICENSE
🛠️ Technology Stack
HTML5
CSS3
JavaScript
AI-powered security assistance
Pattern-based sensitive data detection
Risk classification
Responsive web interface

### ✅ So overall

Your README structure is **correct**:

**Title → Overview → Features → Risk Levels → AI Assistant → How It Works → Project Structure → Tech Stack**

That's already a solid GitHub README. 🔥

One tiny thing: **don't claim features that your actual code doesn't implement yet.** For example, if your current JavaScript only detects patterns and doesn't actually use AI, call it an **“AI-assisted security assistant”** only if you really have AI integration.

Otherwise, GitHub reviewers may click through the code and go: *“👀 where is the AI?”* 😭

For a hackathon/portfolio repo, **accuracy > fancy wording**.

