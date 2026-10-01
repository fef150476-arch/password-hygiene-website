/* =========================================================
   PASSWORD HYGIENE & PERSONAL DATA PROTECTION
   Community Engagement Project (CEP)
   script.js
   ========================================================= */


/* =========================================================
   1. MOBILE NAVIGATION
   ========================================================= */

   const menuButton = document.getElementById("menu-button");
   const navigation = document.getElementById("navigation");
   
   if (menuButton && navigation) {
       menuButton.addEventListener("click", () => {
           navigation.classList.toggle("open");
       });
   
       const navLinks = navigation.querySelectorAll("a");
   
       navLinks.forEach((link) => {
           link.addEventListener("click", () => {
               navigation.classList.remove("open");
           });
       });
   }
   
   
   /* =========================================================
      2. PASSWORD STRENGTH ANALYZER
      ========================================================= */
   
   const passwordInput = document.getElementById("password-input");
   const togglePassword = document.getElementById("toggle-password");
   
   const reqLength = document.getElementById("req-length");
   const reqUppercase = document.getElementById("req-uppercase");
   const reqLowercase = document.getElementById("req-lowercase");
   const reqNumber = document.getElementById("req-number");
   const reqSpecial = document.getElementById("req-special");
   
   const passwordStrength = document.getElementById("password-strength");
   const strengthProgress = document.getElementById("strength-progress");
   const passwordResult = document.getElementById("password-result");
   
   
   /*
      Check the password whenever the user types.
   */
   
   if (passwordInput) {
       passwordInput.addEventListener("input", analyzePassword);
   }
   
   
   /*
      Show / Hide password.
   */
   
   if (togglePassword && passwordInput) {
       togglePassword.addEventListener("click", () => {
   
           if (passwordInput.type === "password") {
               passwordInput.type = "text";
               togglePassword.textContent = "Hide";
           } else {
               passwordInput.type = "password";
               togglePassword.textContent = "Show";
           }
   
       });
   }
   
   
   /*
      Main password analysis function.
   */
   
   function analyzePassword() {
   
       const password = passwordInput.value;
   
       /*
          If the field is empty, reset everything.
       */
   
       if (password.length === 0) {
   
           updateRequirement(reqLength, false, "At least 8 characters");
   
           updateRequirement(reqUppercase, false, "At least one uppercase letter");
   
           updateRequirement(reqLowercase, false, "At least one lowercase letter");
   
           updateRequirement(reqNumber, false, "At least one number");
   
           updateRequirement(reqSpecial, false, "At least one special character");
   
           passwordStrength.textContent = "Not checked";
   
           strengthProgress.style.width = "0%";
   
           passwordResult.className = "result-box neutral";
   
           passwordResult.innerHTML =
               "<strong>Enter a sample password to analyze it.</strong>" +
               "<p>Do not enter a real password that you currently use.</p>";
   
           return;
       }
   
   
       /*
          Check individual requirements.
       */
   
       const hasLength = password.length >= 8;
   
       const hasUppercase = /[A-Z]/.test(password);
   
       const hasLowercase = /[a-z]/.test(password);
   
       const hasNumber = /[0-9]/.test(password);
   
       const hasSpecial = /[^A-Za-z0-9]/.test(password);
   
   
       /*
          Update requirement list.
       */
   
       updateRequirement(
           reqLength,
           hasLength,
           "At least 8 characters"
       );
   
       updateRequirement(
           reqUppercase,
           hasUppercase,
           "At least one uppercase letter"
       );
   
       updateRequirement(
           reqLowercase,
           hasLowercase,
           "At least one lowercase letter"
       );
   
       updateRequirement(
           reqNumber,
           hasNumber,
           "At least one number"
       );
   
       updateRequirement(
           reqSpecial,
           hasSpecial,
           "At least one special character"
       );
   
   
       /*
          Calculate strength score.
          Maximum = 5.
       */
   
       let score = 0;
   
       if (hasLength) score++;
       if (hasUppercase) score++;
       if (hasLowercase) score++;
       if (hasNumber) score++;
       if (hasSpecial) score++;
   
   
       /*
          Display strength.
       */
   
       let strengthText = "";
       let resultClass = "";
       let resultMessage = "";
       let progress = 0;
   
   
       if (score === 0) {
   
           strengthText = "VERY WEAK";
           resultClass = "danger";
           resultMessage =
               "This password does not meet the basic security requirements.";
           progress = 5;
   
       } else if (score === 1 || score === 2) {
   
           strengthText = "WEAK";
           resultClass = "danger";
           resultMessage =
               "This password is weak. Add more characters and variety.";
   
           progress = score === 1 ? 20 : 40;
   
       } else if (score === 3) {
   
           strengthText = "MODERATE";
           resultClass = "warning";
           resultMessage =
               "This password has some good characteristics, but it can be improved.";
   
           progress = 60;
   
       } else if (score === 4) {
   
           strengthText = "GOOD";
           resultClass = "success";
           resultMessage =
               "This password meets most of the recommended requirements.";
   
           progress = 80;
   
       } else {
   
           strengthText = "STRONG";
           resultClass = "success";
           resultMessage =
               "This password meets all five basic requirements.";
   
           progress = 100;
       }
   
   
       passwordStrength.textContent = strengthText;
   
       strengthProgress.style.width = `${progress}%`;
   
       passwordResult.className = `result-box ${resultClass}`;
   
       passwordResult.innerHTML = `
           <strong>${strengthText}</strong>
           <p>${resultMessage}</p>
           <p>
               <strong>${score}/5</strong> recommended characteristics detected.
           </p>
           <small>
               This is a basic educational strength check. It does not determine
               whether a password has appeared in a data breach.
           </small>
       `;
   }
   
   
   /*
      Update a password requirement item.
   */
   
   function updateRequirement(element, passed, text) {
   
       if (!element) return;
   
       if (passed) {
   
           element.classList.add("pass");
   
           element.textContent = `✓ ${text}`;
   
       } else {
   
           element.classList.remove("pass");
   
           element.textContent = `✗ ${text}`;
       }
   }
   
   
   /* =========================================================
      3. PHISHING MESSAGE ANALYZER
      ========================================================= */
   
   const phishingMessage = document.getElementById("phishing-message");
   const analyzePhishing = document.getElementById("analyze-phishing");
   
   const phishingResult = document.getElementById("phishing-result");
   const phishingFindings = document.getElementById("phishing-findings");
   
   
   if (analyzePhishing) {
   
       analyzePhishing.addEventListener("click", analyzePhishingMessage);
   
   }
   
   
   /*
      Phishing message analysis.
   */
   
   function analyzePhishingMessage() {
   
       const message = phishingMessage.value.trim();
   
       /*
          Make sure the user entered something.
       */
   
       if (message.length === 0) {
   
           phishingResult.className = "result-box neutral";
   
           phishingResult.innerHTML =
               "<strong>Please enter a sample message.</strong>" +
               "<p>Do not paste sensitive information such as real OTPs, passwords or UPI PINs.</p>";
   
           phishingFindings.innerHTML = "";
   
           return;
       }
   
   
       const lowerMessage = message.toLowerCase();
   
       const findings = [];
   
   
       /*
          1. Urgency
       */
   
          const urgencyWords = [
            "urgent",
            "immediately",
            "act now",
            "right now",
            "within 24 hours",
            "last warning",
            "final warning",
            "respond immediately",
            "action required",
            "expires today",
            "account will be blocked today"
        ];
   
       if (containsAny(lowerMessage, urgencyWords)) {
   
           findings.push(
               "Urgency or pressure: the message tries to make you act quickly."
           );
       }
   
   
       /*
          2. Credentials / security information
       */
   
       const credentialWords = [
           "otp",
           "one-time password",
           "verification code",
           "upi pin",
           "password",
           "pin",
           "passcode",
           "security code"
       ];
   
       if (containsAny(lowerMessage, credentialWords)) {
   
           findings.push(
               "Credential request: the message mentions sensitive authentication information."
           );
       }
   
   
       /*
          3. Links / URLs
       */
   
       const urlPattern =
           /(https?:\/\/|www\.|bit\.ly|tinyurl\.com|t\.co|shorturl)/i;
   
       if (urlPattern.test(message)) {
   
           findings.push(
               "Link detected: the message contains a URL or shortened link. Verify the destination independently."
           );
       }
   
   
       /*
          4. Account threats
       */
   
       const accountThreatWords = [
           "blocked",
           "suspended",
           "deactivated",
           "freeze",
           "frozen",
           "blacklisted",
           "locked",
           "will be closed",
           "account will"
       ];
   
       if (containsAny(lowerMessage, accountThreatWords)) {
   
           findings.push(
               "Account threat: it suggests that an account may be blocked, suspended or closed."
           );
       }
   
   
       /*
          5. Prize / reward / refund scams
       */
   
       const rewardWords = [
           "prize",
           "reward",
           "cashback",
           "cash back",
           "lottery",
           "winner",
           "won",
           "refund",
           "free gift",
           "gift card",
           "bonus"
       ];
   
       if (containsAny(lowerMessage, rewardWords)) {
   
           findings.push(
               "Reward or money claim: unexpected prizes, refunds or cashback can be used to attract attention."
           );
       }
   
   
       /*
          6. Financial / account terminology
       */
   
       const financialWords = [
           "bank",
           "account",
           "kyc",
           "card",
           "upi",
           "payment",
           "transaction",
           "credit card",
           "debit card"
       ];
   
       if (containsAny(lowerMessage, financialWords)) {
   
           findings.push(
               "Financial or account context: the message involves banking, payments or account information."
           );
       }
   
   
       /*
          7. Action requests
       */
   
       const actionWords = [
           "click",
           "verify",
           "confirm",
           "update",
           "login",
           "log in",
           "sign in",
           "send",
           "share",
           "download",
           "open the link"
       ];
   
       if (containsAny(lowerMessage, actionWords)) {
   
           findings.push(
               "Action request: the message asks you to click, verify, update, log in, send or share something."
           );
       }
   
   
       /*
          Determine risk level.
       */
   
       let riskTitle = "";
       let riskClass = "";
       let riskDescription = "";
   
   
       if (findings.length >= 4) {
   
           riskTitle = "HIGH RISK";
           riskClass = "danger";
   
           riskDescription =
               "Several common phishing warning signs were detected. Do not click links or share sensitive information. Verify the message through an official channel.";
   
       } else if (findings.length >= 2) {
   
           riskTitle = "SUSPICIOUS";
           riskClass = "warning";
   
           riskDescription =
               "The message contains multiple warning signs commonly associated with suspicious messages. Verify it independently before taking action.";
   
       } else if (findings.length === 1) {
   
           riskTitle = "POSSIBLE WARNING SIGN";
           riskClass = "warning";
   
           riskDescription =
               "One common warning sign was detected. This alone does not prove that the message is fraudulent, so verify it independently.";
   
       } else {
   
           riskTitle = "NO COMMON WARNING SIGNS DETECTED";
           riskClass = "success";
   
           riskDescription =
               "The analyzer did not detect the warning patterns included in this basic rule-based check. This does NOT prove that the message is legitimate.";
   
       }
   
   
       /*
          Display result.
       */
   
       phishingResult.className = `result-box ${riskClass}`;
   
       phishingResult.innerHTML = `
           <strong>${riskTitle}</strong>
           <p>${riskDescription}</p>
           <small>
               This analyzer uses simple pattern matching for educational purposes.
               It cannot guarantee whether a message is genuine or fraudulent.
           </small>
       `;
   
   
       /*
          Display individual findings.
       */
   
       if (findings.length > 0) {
   
           phishingFindings.innerHTML = findings
               .map((finding) => {
                   return `<li class="warning-item">⚠ ${finding}</li>`;
               })
               .join("");
   
       } else {
   
           phishingFindings.innerHTML =
               `<li class="warning-item safe">
                   ✓ No common warning patterns detected by this checker.
               </li>`;
       }
   }
   
   
   /*
      Helper function:
      Checks whether any word/phrase exists in text.
   */
   
   function containsAny(text, words) {
   
       return words.some((word) => text.includes(word));
   }
   
   
   /* =========================================================
      4. PERSONAL DATA RISK CHECKER
      ========================================================= */
   
   const dataType = document.getElementById("data-type");
   const recipient = document.getElementById("recipient");
   const checkDataRisk = document.getElementById("check-data-risk");
   
   const dataRiskResult = document.getElementById("data-risk-result");
   
   
   if (checkDataRisk) {
   
       checkDataRisk.addEventListener("click", checkPersonalDataRisk);
   
   }
   
   
   /*
      Personal data risk calculation.
   */
   
   function checkPersonalDataRisk() {
   
       const selectedData = dataType.value;
       const selectedRecipient = recipient.value;
   
   
       /*
          Make sure both selections exist.
       */
   
       if (!selectedData || !selectedRecipient) {
   
           dataRiskResult.className = "result-box neutral";
   
           dataRiskResult.innerHTML =
               "<strong>Please select both options.</strong>" +
               "<p>Choose the type of information and who is requesting it.</p>";
   
           return;
       }
   
   
       let risk = "LOW";
       let riskClass = "success";
       let title = "";
       let advice = "";
   
   
       /*
          CREDENTIAL DATA
       */
   
       if (selectedData === "credential") {
   
           risk = "HIGH";
           riskClass = "danger";
   
           title = "HIGH RISK";
   
           advice =
               "Passwords, OTPs, UPI PINs and similar authentication information should not be shared with another person through messages, calls or forms. If a service needs authentication, use the official app or website yourself.";
       }
   
   
       /*
          FINANCIAL DATA
       */
   
       else if (selectedData === "financial") {
   
           if (
               selectedRecipient === "unknown" ||
               selectedRecipient === "message" ||
               selectedRecipient === "website" ||
               selectedRecipient === "public"
           ) {
   
               risk = "HIGH";
               riskClass = "danger";
   
               title = "HIGH RISK";
   
               advice =
                   "Financial information can be misused for fraud or identity theft. Do not provide it to an unknown person, suspicious message, unverified website or public audience.";
   
           } else {
   
               risk = "MODERATE";
               riskClass = "warning";
   
               title = "USE CAUTION";
   
               advice =
                   "Only provide financial information when it is genuinely required and you have independently verified the recipient and the official channel.";
           }
       }
   
   
       /*
          CONTACT INFORMATION
       */
   
       else if (selectedData === "contact") {
   
           if (
               selectedRecipient === "public" ||
               selectedRecipient === "unknown" ||
               selectedRecipient === "message"
           ) {
   
               risk = "MODERATE";
               riskClass = "warning";
   
               title = "MODERATE RISK";
   
               advice =
                   "Contact information can be used for spam, scams or unwanted contact. Share it selectively and avoid publishing more information than necessary.";
   
           } else {
   
               risk = "LOW";
               riskClass = "success";
   
               title = "LOWER RISK";
   
               advice =
                   "The risk is generally lower when contact information is shared with a known or verified recipient, but only provide what is necessary.";
           }
       }
   
   
       /*
          BASIC PERSONAL INFORMATION
       */
   
       else if (selectedData === "basic") {
   
           if (selectedRecipient === "public") {
   
               risk = "MODERATE";
               riskClass = "warning";
   
               title = "MODERATE RISK";
   
               advice =
                   "Even basic personal information can contribute to profiling or social engineering when combined with other information. Avoid oversharing publicly.";
   
           } else {
   
               risk = "LOW";
               riskClass = "success";
   
               title = "LOWER RISK";
   
               advice =
                   "Basic information generally carries less risk, but you should still share only what is necessary and consider how it could be combined with other information.";
           }
       }
   
   
       /*
          Add recipient-specific warning.
       */
   
       let recipientAdvice = "";
   
       if (selectedRecipient === "unknown") {
   
           recipientAdvice =
               "The recipient is unknown, so verify their identity before sharing any information.";
   
       } else if (selectedRecipient === "message") {
   
           recipientAdvice =
               "Messages can be impersonated or spoofed. Do not rely only on the name or profile shown in the message.";
   
       } else if (selectedRecipient === "website") {
   
           recipientAdvice =
               "Check the website address carefully and access important services through an official source rather than an unexpected link.";
   
       } else if (selectedRecipient === "public") {
   
           recipientAdvice =
               "Public information can potentially be seen, copied or combined with other information by anyone.";
   
       } else if (selectedRecipient === "official") {
   
           recipientAdvice =
               "Confirm that you are using the genuine official service and that the information is actually required.";
   
       } else if (selectedRecipient === "known") {
   
           recipientAdvice =
               "Even with someone you know, share only information that is necessary.";
       }
   
   
       /*
          Display result.
       */
   
       dataRiskResult.className = `result-box ${riskClass}`;
   
       dataRiskResult.innerHTML = `
           <strong>${title}</strong>
           <p><strong>Risk level: ${risk}</strong></p>
           <p>${advice}</p>
           <p>${recipientAdvice}</p>
       `;
   }
   
   
   /* =========================================================
      5. DIGITAL SECURITY ASSESSMENT
      ========================================================= */
   
   const calculateAssessment =
       document.getElementById("calculate-assessment");
   
   const assessmentResult =
       document.getElementById("assessment-result");
   
   
   if (calculateAssessment) {
   
       calculateAssessment.addEventListener(
           "click",
           calculateSecurityAssessment
       );
   }
   
   
   /*
      Calculate the user's security assessment.
   */
   
   function calculateSecurityAssessment() {
   
       let score = 0;
   
       let answeredQuestions = 0;
   
       const totalQuestions = 7;
   
       const recommendations = [];
   
   
       /*
          Read Q1 - Q7.
       */
   
       for (let i = 1; i <= totalQuestions; i++) {
   
           const selected = document.querySelector(
               `input[name="q${i}"]:checked`
           );
   
   
           if (selected) {
   
               answeredQuestions++;
   
               score += Number(selected.value);
   
           }
       }
   
   
       /*
          Check whether all questions were answered.
       */
   
       if (answeredQuestions < totalQuestions) {
   
           assessmentResult.className = "assessment-result show";
   
           assessmentResult.innerHTML = `
               <h3>Please answer all questions</h3>
   
               <p>
                   You answered ${answeredQuestions} of ${totalQuestions}
                   questions.
               </p>
   
               <p>
                   Answer all seven questions to calculate your security profile.
               </p>
           `;
   
           return;
       }
   
   
       /*
          Score is out of 14.
       */
   
       const maximumScore = 14;
   
       const percentage = Math.round(
           (score / maximumScore) * 100
       );
   
   
       /*
          Determine security profile.
       */
   
       let profile = "";
       let description = "";
   
   
       if (percentage >= 85) {
   
           profile = "Strong Security Habits";
   
           description =
               "Your answers show strong awareness of several important digital security practices. Continue reviewing your habits regularly.";
   
       } else if (percentage >= 60) {
   
           profile = "Good Foundation";
   
           description =
               "You have a useful foundation of security habits, but there are still areas where stronger practices can reduce your exposure to common threats.";
   
       } else if (percentage >= 35) {
   
           profile = "Needs Improvement";
   
           description =
               "Your answers indicate several areas where improving everyday security habits could reduce common risks.";
   
       } else {
   
           profile = "High Exposure to Common Risks";
   
           description =
               "Your answers indicate that several basic security practices need attention. Start with passwords, phishing awareness and protection of sensitive information.";
       }
   
   
       /*
          Generate recommendations based on individual answers.
       */
   
       const q1 = document.querySelector(
           'input[name="q1"]:checked'
       );
   
       const q2 = document.querySelector(
           'input[name="q2"]:checked'
       );
   
       const q3 = document.querySelector(
           'input[name="q3"]:checked'
       );
   
       const q4 = document.querySelector(
           'input[name="q4"]:checked'
       );
   
       const q5 = document.querySelector(
           'input[name="q5"]:checked'
       );
   
       const q6 = document.querySelector(
           'input[name="q6"]:checked'
       );
   
       const q7 = document.querySelector(
           'input[name="q7"]:checked'
       );
   
   
       /*
          The values depend on how the assessment
          questions were configured in the HTML.
       */
   
          if (q1 && Number(q1.value) === 0) {
            recommendations.push(
                "Review how you create and manage passwords."
            );
        }
        
        if (q2 && Number(q2.value) === 0) {
            recommendations.push(
                "Enable two-factor authentication on important accounts."
            );
        }
        
        if (q3 && Number(q3.value) === 0) {
            recommendations.push(
                "Be cautious with unexpected links and verify them before opening."
            );
        }
        
        if (q4 && Number(q4.value) === 0) {
            recommendations.push(
                "Never share OTPs, UPI PINs or passwords with another person."
            );
        }
        
        if (q5 && Number(q5.value) === 0) {
            recommendations.push(
                "Install applications only from official or trusted sources."
            );
        }
        
        if (q6 && Number(q6.value) === 0) {
            recommendations.push(
                "Keep your operating system and applications updated."
            );
        }
        
        if (q7 && Number(q7.value) === 0) {
            recommendations.push(
                "Verify websites and the context before entering sensitive information."
            );

        }




       /*
          If no specific recommendation was generated,
          provide general maintenance advice.
       */
   
       if (recommendations.length === 0) {
   
           recommendations.push(
               "Continue using unique passwords and strong authentication."
           );
   
           recommendations.push(
               "Remain cautious about unexpected links and requests for personal information."
           );
   
           recommendations.push(
               "Keep your devices and applications updated."
           );
       }
   
   
       /*
          Limit recommendations to 4 items.
       */
          const limitedRecommendations =
          recommendations;
       /*
          Convert recommendations into HTML.
       */
   
       const recommendationHTML =
           limitedRecommendations
               .map((item) => `<li>${item}</li>`)
               .join("");
   
   
       /*
          Display final assessment.
       */
   
       assessmentResult.className = "assessment-result show";
   
       assessmentResult.innerHTML = `
           <h3>${profile}</h3>
   
           <div class="score">
               ${score}/${maximumScore}
           </div>
   
           <p>
               <strong>Security score: ${percentage}%</strong>
           </p>
   
           <p>
               ${description}
           </p>
   
           <div class="assessment-actions">
               <h4>Recommended actions</h4>
   
               <ul>
                   ${recommendationHTML}
               </ul>
           </div>
   
           <small>
               This assessment is educational and is not a professional
               cybersecurity audit.
           </small>
       `;
   
   
       /*
          Scroll result into view.
       */
   
       assessmentResult.scrollIntoView({
           behavior: "smooth",
           block: "nearest"
       });
   }
   
   
   /* =========================================================
      6. INITIAL SETUP
      ========================================================= */
   
   /*
      Keep the password analyzer in its initial state.
   */
   
   if (passwordInput) {
       analyzePassword();
   }
   
   
   /*
      Prevent accidental submission behaviour if buttons
      are placed inside a form in the future.
   */
   
   document.querySelectorAll("button").forEach((button) => {
   
       if (!button.getAttribute("type")) {
   
           button.setAttribute("type", "button");
       }
   
   });

/* =========================================================
   5. COMMUNITY AWARENESS ACTIVITY
========================================================= */

const COMMUNITY_STORAGE_KEY = "passwordHygieneCommunityActivity";

let communityRecords = loadCommunityRecords();

let activeCommunityParticipantId = null;

/* ---------------------------------------------------------
 STORAGE
--------------------------------------------------------- */

function loadCommunityRecords() {
  try {
    const saved = localStorage.getItem(COMMUNITY_STORAGE_KEY);

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Unable to load community activity data:", error);

    return [];
  }
}

function saveCommunityRecords() {
  localStorage.setItem(COMMUNITY_STORAGE_KEY, JSON.stringify(communityRecords));
}

/* ---------------------------------------------------------
 DOM ELEMENTS
--------------------------------------------------------- */

const communityRegistrationForm = document.getElementById(
  "community-registration-form"
);

const participantNameInput = document.getElementById("participant-name");

const participantTypeInput = document.getElementById("participant-type");

const businessNameInput = document.getElementById("business-name");

const communityRegistrationCard = document.getElementById(
  "community-registration-card"
);

const communityActiveCard = document.getElementById("community-active-card");

const activeParticipantTitle = document.getElementById(
  "active-participant-title"
);

const activeParticipantDetails = document.getElementById(
  "active-participant-details"
);

const activeParticipantId = document.getElementById("active-participant-id");

const communityBeforeStage = document.getElementById("community-before-stage");

const communityLearningStage = document.getElementById(
  "community-learning-stage"
);

const communityAfterStage = document.getElementById("community-after-stage");

const communityParticipantResult = document.getElementById(
  "community-participant-result"
);

const newCommunityParticipant = document.getElementById(
  "new-community-participant"
);

const saveBeforeAwareness = document.getElementById("save-before-awareness");

const saveAfterAwareness = document.getElementById("save-after-awareness");

/* ---------------------------------------------------------
 FIND ACTIVE RECORD
--------------------------------------------------------- */

function getActiveCommunityRecord() {
  if (!activeCommunityParticipantId) {
    return null;
  }

  return (
    communityRecords.find(
      (record) => record.id === activeCommunityParticipantId
    ) || null
  );
}

/* ---------------------------------------------------------
 PARTICIPANT ID
--------------------------------------------------------- */

function generateParticipantId() {
  let highestNumber = 0;

  communityRecords.forEach((record) => {
    const match = String(record.id).match(/^P(\d+)$/);

    if (match) {
      highestNumber = Math.max(highestNumber, Number(match[1]));
    }
  });

  return `P${String(highestNumber + 1).padStart(2, "0")}`;
}

/* ---------------------------------------------------------
 REGISTRATION
--------------------------------------------------------- */

if (communityRegistrationForm) {
  communityRegistrationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = participantNameInput.value.trim();

    const participantType = participantTypeInput.value;

    const businessName = businessNameInput.value.trim();

    if (!name) {
      participantNameInput.focus();

      return;
    }

    const newRecord = {
      id: generateParticipantId(),

      name: name,

      participantType: participantType,

      businessName: businessName,

      registeredAt: new Date().toISOString(),

      before: null,

      after: null,

      tools: {
        password: false,

        phishing: false,

        dataRisk: false,

        assessment: false,
      },
    };

    communityRecords.push(newRecord);

    saveCommunityRecords();

    activeCommunityParticipantId = newRecord.id;

    showActiveCommunityParticipant();

    updateCommunityDashboard();
  });
}

/* ---------------------------------------------------------
 SHOW ACTIVE PARTICIPANT
--------------------------------------------------------- */

function showActiveCommunityParticipant() {
  const record = getActiveCommunityRecord();

  if (!record) {
    return;
  }

  communityRegistrationCard.classList.add("community-hidden");

  communityActiveCard.classList.remove("community-hidden");

  activeParticipantTitle.textContent = `Participant ${record.id}`;

  activeParticipantId.textContent = record.id;

  let details = `${record.participantType}`;

  if (record.businessName) {
    details += ` • ${record.businessName}`;
  }

  activeParticipantDetails.textContent = details;

  if (record.before === null) {
    communityBeforeStage.classList.remove("community-hidden");

    communityLearningStage.classList.add("community-hidden");

    communityAfterStage.classList.add("community-hidden");

    communityParticipantResult.classList.add("community-hidden");

    newCommunityParticipant.classList.add("community-hidden");
  } else if (record.after === null) {
    communityBeforeStage.classList.add("community-hidden");

    communityLearningStage.classList.remove("community-hidden");

    communityAfterStage.classList.add("community-hidden");

    communityParticipantResult.classList.add("community-hidden");

    newCommunityParticipant.classList.add("community-hidden");

    updateCommunityToolStatus();
  } else {
    showCompletedParticipant();
  }
}

/* ---------------------------------------------------------
 READ AWARENESS ANSWERS
--------------------------------------------------------- */

function getAwarenessScore(prefix) {
  let score = 0;

  const answers = [];

  for (let i = 1; i <= 4; i++) {
    const selected = document.querySelector(
      `input[name="${prefix}-q${i}"]:checked`
    );

    if (!selected) {
      return null;
    }

    const value = Number(selected.value);

    answers.push(value);

    score += value;
  }

  return {
    score: score,

    answers: answers,
  };
}

/* ---------------------------------------------------------
 SAVE BEFORE AWARENESS
--------------------------------------------------------- */

if (saveBeforeAwareness) {
  saveBeforeAwareness.addEventListener("click", () => {
    const result = getAwarenessScore("before");

    if (!result) {
      alert("Please answer all four questions before continuing.");

      return;
    }

    const record = getActiveCommunityRecord();

    if (!record) {
      return;
    }

    record.before = result;

    saveCommunityRecords();

    communityBeforeStage.classList.add("community-hidden");

    communityLearningStage.classList.remove("community-hidden");

    updateCommunityToolStatus();

    updateCommunityDashboard();
  });
}

/* ---------------------------------------------------------
 MARK WEBSITE MODULE AS USED
--------------------------------------------------------- */

function markCommunityToolComplete(toolName) {
  const record = getActiveCommunityRecord();

  if (!record) {
    return;
  }

  if (record.before === null) {
    return;
  }

  if (!Object.prototype.hasOwnProperty.call(record.tools, toolName)) {
    return;
  }

  record.tools[toolName] = true;

  saveCommunityRecords();

  updateCommunityToolStatus();
}

/* ---------------------------------------------------------
 CHECK WHETHER ALL MODULES WERE USED
--------------------------------------------------------- */

function allCommunityToolsCompleted() {
  const record = getActiveCommunityRecord();

  if (!record) {
    return false;
  }

  return (
    record.tools.password === true &&
    record.tools.phishing === true &&
    record.tools.dataRisk === true &&
    record.tools.assessment === true
  );
}

/* ---------------------------------------------------------
 TOOL STATUS DISPLAY
--------------------------------------------------------- */

function updateCommunityToolStatus() {
  const record = getActiveCommunityRecord();

  if (!record) {
    return;
  }

  const toolMap = {
    password: document.getElementById("community-tool-password-status"),

    phishing: document.getElementById("community-tool-phishing-status"),

    dataRisk: document.getElementById("community-tool-data-status"),

    assessment: document.getElementById("community-tool-assessment-status"),
  };

  const buttonMap = {
    password: document.querySelector(
      '.community-module-button[href="#password"]'
    ),

    phishing: document.querySelector(
      '.community-module-button[href="#phishing"]'
    ),

    dataRisk: document.querySelector(
      '.community-module-button[href="#data-risk"]'
    ),

    assessment: document.querySelector(
      '.community-module-button[href="#assessment"]'
    ),
  };

  Object.keys(toolMap).forEach((toolName) => {
    const completed = record.tools[toolName];

    if (toolMap[toolName]) {
      toolMap[toolName].textContent = completed
        ? "✓ Completed"
        : "Not completed";
    }

    if (buttonMap[toolName]) {
      buttonMap[toolName].classList.toggle("completed", completed);
    }
  });

  const completionMessage = document.getElementById(
    "community-completion-message"
  );

  if (allCommunityToolsCompleted()) {
    completionMessage.classList.add("complete");

    completionMessage.textContent =
      "✓ All four website modules have been completed. The final awareness check is now available.";

    communityAfterStage.classList.remove("community-hidden");
  } else {
    completionMessage.classList.remove("complete");

    completionMessage.textContent =
      "Use all four modules above to continue to the final awareness check.";

    communityAfterStage.classList.add("community-hidden");
  }
}

/* ---------------------------------------------------------
 SAVE AFTER AWARENESS
--------------------------------------------------------- */

if (saveAfterAwareness) {
  saveAfterAwareness.addEventListener("click", () => {
    const record = getActiveCommunityRecord();

    if (!record) {
      return;
    }

    if (!allCommunityToolsCompleted()) {
      alert("Please complete all four website modules first.");

      return;
    }

    const result = getAwarenessScore("after");

    if (!result) {
      alert("Please answer all four questions before completing the activity.");

      return;
    }

    record.after = result;

    saveCommunityRecords();

    showCompletedParticipant();

    updateCommunityDashboard();
  });
}

/* ---------------------------------------------------------
 COMPLETED PARTICIPANT RESULT
--------------------------------------------------------- */

function showCompletedParticipant() {
  const record = getActiveCommunityRecord();

  if (!record || !record.after) {
    return;
  }

  communityBeforeStage.classList.add("community-hidden");

  communityLearningStage.classList.add("community-hidden");

  communityAfterStage.classList.add("community-hidden");

  communityParticipantResult.classList.remove("community-hidden");

  newCommunityParticipant.classList.remove("community-hidden");

  const beforeScore = record.before.score;

  const afterScore = record.after.score;

  const change = afterScore - beforeScore;

  let changeText = "No change";

  if (change > 0) {
    changeText = `Awareness score increased by ${change} point${
      change === 1 ? "" : "s"
    }.`;
  } else if (change < 0) {
    changeText = `Awareness score changed by ${change} point${
      change === -1 ? "" : "s"
    }.`;
  }

  communityParticipantResult.innerHTML = `

  <h4>✓ Awareness Activity Completed</h4>

  <p>
    <strong>Participant:</strong>
    ${escapeCommunityHTML(record.id)}
  </p>

  <p>
    <strong>Before score:</strong>
    ${beforeScore}/8
  </p>

  <p>
    <strong>After score:</strong>
    ${afterScore}/8
  </p>

  <p>
    <strong>${changeText}</strong>
  </p>

  <p>
    The result is based on the participant's actual responses.
    It is recorded for the project's community-awareness analysis.
  </p>

`;
}

/* ---------------------------------------------------------
 REGISTER ANOTHER PARTICIPANT
--------------------------------------------------------- */

if (newCommunityParticipant) {
  newCommunityParticipant.addEventListener("click", () => {
    activeCommunityParticipantId = null;

    communityActiveCard.classList.add("community-hidden");

    communityRegistrationCard.classList.remove("community-hidden");

    communityRegistrationForm.reset();

    window.location.hash = "community-awareness";
  });
}

/* ---------------------------------------------------------
 DETECT ACTUAL USE OF EXISTING WEBSITE MODULES
--------------------------------------------------------- */

/* PASSWORD ANALYZER */

if (passwordInput) {
  passwordInput.addEventListener("input", () => {
    if (passwordInput.value.length > 0) {
      markCommunityToolComplete("password");
    }
  });
}

/* PHISHING ANALYZER */

if (analyzePhishing) {
  analyzePhishing.addEventListener("click", () => {
    if (phishingMessage && phishingMessage.value.trim().length > 0) {
      markCommunityToolComplete("phishing");
    }
  });
}

/* DATA RISK CHECKER */

if (checkDataRisk) {
  checkDataRisk.addEventListener("click", () => {
    markCommunityToolComplete("dataRisk");
  });
}

/* DIGITAL SECURITY ASSESSMENT */

const communityAssessmentButton = document.getElementById(
  "calculate-assessment"
);

if (communityAssessmentButton) {
  communityAssessmentButton.addEventListener("click", () => {
    markCommunityToolComplete("assessment");
  });
}

/* ---------------------------------------------------------
 DASHBOARD
--------------------------------------------------------- */

function updateCommunityDashboard() {
  const participantsElement = document.getElementById("dashboard-participants");

  const completedElement = document.getElementById("dashboard-completed");

  const improvedElement = document.getElementById("dashboard-improved");

  const completedRecords = communityRecords.filter(
    (record) => record.before && record.after
  );

  const improvedRecords = completedRecords.filter(
    (record) => record.after.score > record.before.score
  );

  participantsElement.textContent = communityRecords.length;

  completedElement.textContent = completedRecords.length;

  improvedElement.textContent = improvedRecords.length;

  updateCommunityChart(completedRecords);

  updateCommunityParticipantTable(completedRecords);
}

/* ---------------------------------------------------------
 DASHBOARD CHART
--------------------------------------------------------- */

function updateCommunityChart(records) {
  const categories = [
    {
      before: "chart-password-before",

      after: "chart-password-after",

      index: 0,
    },

    {
      before: "chart-phishing-before",

      after: "chart-phishing-after",

      index: 1,
    },

    {
      before: "chart-2fa-before",

      after: "chart-2fa-after",

      index: 2,
    },

    {
      before: "chart-data-before",

      after: "chart-data-after",

      index: 3,
    },
  ];

  categories.forEach((category) => {
    let beforeCount = 0;

    let afterCount = 0;

    records.forEach((record) => {
      if (record.before.answers[category.index] === 2) {
        beforeCount++;
      }

      if (record.after.answers[category.index] === 2) {
        afterCount++;
      }
    });

    const total = records.length;

    const beforePercentage = total > 0 ? (beforeCount / total) * 100 : 0;

    const afterPercentage = total > 0 ? (afterCount / total) * 100 : 0;

    const beforeElement = document.getElementById(category.before);

    const afterElement = document.getElementById(category.after);

    if (beforeElement) {
      beforeElement.style.width = `${beforePercentage}%`;

      beforeElement.title = `${beforeCount}/${total}`;
    }

    if (afterElement) {
      afterElement.style.width = `${afterPercentage}%`;

      afterElement.title = `${afterCount}/${total}`;
    }
  });
}

/* ---------------------------------------------------------
 PARTICIPANT TABLE
--------------------------------------------------------- */

function updateCommunityParticipantTable(records) {
  const tableBody = document.getElementById("community-participant-table");

  if (!tableBody) {
    return;
  }

  if (records.length === 0) {
    tableBody.innerHTML = `

    <tr>
      <td
        colspan="6"
        class="empty-table-message"
      >
        No completed participants yet.
      </td>
    </tr>

  `;

    return;
  }

  tableBody.innerHTML = records
    .map((record) => {
      const change = record.after.score - record.before.score;

      let changeText = "No change";

      let changeClass = "change-neutral";

      if (change > 0) {
        changeText = `+${change}`;

        changeClass = "change-positive";
      } else if (change < 0) {
        changeText = `${change}`;
      }

      return `

          <tr>

            <td>
              ${escapeCommunityHTML(record.id)}
            </td>

            <td>
              ${escapeCommunityHTML(record.participantType)}
            </td>

            <td>
              ✓ Completed
            </td>

            <td>
              ${record.before.score}/8
            </td>

            <td>
              ${record.after.score}/8
            </td>

            <td
              class="${changeClass}"
            >
              ${changeText}
            </td>

          </tr>

        `;
    })
    .join("");
}

/* ---------------------------------------------------------
 CSV EXPORT
--------------------------------------------------------- */

const exportCommunityData = document.getElementById("export-community-data");

if (exportCommunityData) {
  exportCommunityData.addEventListener("click", () => {
    if (communityRecords.length === 0) {
      alert("There is no community activity data to export yet.");

      return;
    }

    const header = [
      "Participant ID",

      "Participant Type",

      "Business Name",

      "Before Score",

      "After Score",

      "Change",

      "Password Analyzer",

      "Phishing Analyzer",

      "Data Risk Checker",

      "Security Assessment",
    ];

    const rows = communityRecords.map((record) => {
      const beforeScore = record.before ? record.before.score : "";

      const afterScore = record.after ? record.after.score : "";

      const change =
        record.before && record.after ? afterScore - beforeScore : "";

      return [
        record.id,

        record.participantType,

        record.businessName,

        beforeScore,

        afterScore,

        change,

        record.tools.password ? "Completed" : "Not completed",

        record.tools.phishing ? "Completed" : "Not completed",

        record.tools.dataRisk ? "Completed" : "Not completed",

        record.tools.assessment ? "Completed" : "Not completed",
      ]
        .map(csvEscape)
        .join(",");
    });

    const csv = [header.map(csvEscape).join(","), ...rows].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "community-awareness-activity.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  });
}

/* ---------------------------------------------------------
 CSV HELPERS
--------------------------------------------------------- */

function csvEscape(value) {
  const text = String(value ?? "");

  return `"${text.replace(/"/g, '""')}"`;
}

function escapeCommunityHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ---------------------------------------------------------
 CLEAR DATA
--------------------------------------------------------- */

const clearCommunityData = document.getElementById("clear-community-data");

if (clearCommunityData) {
  clearCommunityData.addEventListener("click", () => {
    if (communityRecords.length === 0) {
      alert("There is no community activity data to clear.");

      return;
    }

    const confirmed = confirm(
      "This will permanently remove all locally stored community activity records from this browser. Continue?"
    );

    if (!confirmed) {
      return;
    }

    communityRecords = [];

    activeCommunityParticipantId = null;

    saveCommunityRecords();

    updateCommunityDashboard();

    communityActiveCard.classList.add("community-hidden");

    communityRegistrationCard.classList.remove("community-hidden");

    communityRegistrationForm.reset();
  });
}

/* ---------------------------------------------------------
 INITIAL DASHBOARD LOAD
--------------------------------------------------------- */

updateCommunityDashboard();

