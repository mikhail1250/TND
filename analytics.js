(() => {
  const measurementId = "G-1X5ZPN033";
  const consentKey = "tnd-analytics-consent";
  let analyticsLoaded = false;

  const track = (eventName, parameters = {}) => {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", eventName, parameters);
  };
  window.tndTrack = track;

  const loadAnalytics = () => {
    if (analyticsLoaded) return;
    analyticsLoaded = true;
    const tag = document.createElement("script");
    tag.async = true;
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(tag);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", measurementId, { anonymize_ip: true });
  };

  const removeBanner = () => document.querySelector(".cookie-notice")?.remove();
  const showConsentNotice = () => {
    const notice = document.createElement("section");
    notice.className = "cookie-notice";
    notice.setAttribute("aria-label", "Analytics preference");
    notice.innerHTML = `<p>We use optional Google Analytics to understand visits and improve this site. It does not receive email addresses or eligibility answers. <a href="privacy.html">Privacy</a></p><div class="cookie-actions"><button class="cookie-reject" type="button">Reject</button><button class="cookie-accept" type="button">Accept analytics</button></div>`;
    notice.querySelector(".cookie-reject").addEventListener("click", () => {
      localStorage.setItem(consentKey, "rejected");
      removeBanner();
    });
    notice.querySelector(".cookie-accept").addEventListener("click", () => {
      localStorage.setItem(consentKey, "accepted");
      loadAnalytics();
      track("analytics_consent_granted");
      removeBanner();
    });
    document.body.appendChild(notice);
  };

  const setupEvents = () => {
    document.querySelectorAll('a[href="#guide"], a[href="#guide-signup"]').forEach((link) => {
      link.addEventListener("click", () => {
        track("guide_list_opened", { cta_text: link.textContent.trim().slice(0, 80), cta_location: link.closest("header") ? "navigation" : "page" });
      });
    });
    const deadlineTool = document.querySelector("#deadline-tool");
    let deadlineTracked = false;
    deadlineTool?.addEventListener("change", () => {
      if (deadlineTracked) return;
      deadlineTracked = true;
      track("deadline_tool_used");
    });
    const signupForm = document.querySelector(".signup-form");
    signupForm?.addEventListener("submit", (event) => {
      if (!analyticsLoaded) return;
      event.preventDefault();
      let submitted = false;
      const continueSubmission = () => {
        if (submitted) return;
        submitted = true;
        signupForm.submit();
      };
      track("guide_list_submitted", { form_id: "guide_publication_list", event_callback: continueSubmission, event_timeout: 800 });
      window.setTimeout(continueSubmission, 850);
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    const savedConsent = localStorage.getItem(consentKey);
    if (savedConsent === "accepted") loadAnalytics();
    if (!savedConsent) showConsentNotice();
    setupEvents();
  });
})();
