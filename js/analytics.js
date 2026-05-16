const GA_MEASUREMENT_ID = "G-H7GJYF94VT";

window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}

function loadGoogleAnalytics() {
  if (document.querySelector(`[src*="${GA_MEASUREMENT_ID}"]`)) return;

  const tag = document.createElement("script");
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(tag);

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);
}

function scheduleAnalytics() {
  const start = () => {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(loadGoogleAnalytics, { timeout: 3000 });
      return;
    }

    window.setTimeout(loadGoogleAnalytics, 1600);
  };

  if (document.readyState === "complete") {
    start();
    return;
  }

  window.addEventListener("load", start, { once: true });
}

scheduleAnalytics();
