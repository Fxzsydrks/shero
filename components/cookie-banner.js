const STORAGE_KEY = "shero-cookie-consent";
const CONSENT_VERSION = 1;

function readStoredConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.version !== CONSENT_VERSION) return null;
    return data;
  } catch {
    return null;
  }
}

function writeConsent(status) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        status,
        version: CONSENT_VERSION,
        timestamp: new Date().toISOString(),
      })
    );
  } catch {
    /* localStorage unavailable — fail silently */
  }
}

function renderMarkup() {
  return `
    <div class="cookie-banner__inner" role="dialog" aria-modal="false" aria-labelledby="cookie-banner-title" aria-describedby="cookie-banner-body">
      <div class="cookie-banner__text">
        <h2 id="cookie-banner-title" class="cookie-banner__title">We value your privacy.</h2>
        <p id="cookie-banner-body" class="cookie-banner__body">
          We use only what's strictly necessary to run this site. With your
          consent, we may also use non-essential cookies and similar
          technologies to better understand how the site is used. You can
          change your choice at any time. Read our
          <a href="privacy.html">Privacy Policy</a>.
        </p>
      </div>
      <div class="cookie-banner__actions">
        <button type="button" class="cookie-banner__btn cookie-banner__btn--reject" data-cookie-action="reject">
          Reject
        </button>
        <button type="button" class="cookie-banner__btn cookie-banner__btn--accept" data-cookie-action="accept">
          Accept all
        </button>
      </div>
    </div>
  `;
}

export function mountCookieBanner() {
  if (readStoredConsent()) return;

  const banner = document.createElement("div");
  banner.className = "cookie-banner";
  banner.setAttribute("data-cookie-banner", "");
  banner.innerHTML = renderMarkup();
  document.body.appendChild(banner);

  banner.querySelectorAll("[data-cookie-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.getAttribute("data-cookie-action");
      writeConsent(action === "accept" ? "accepted" : "rejected");
      banner.classList.remove("cookie-banner--visible");
      window.setTimeout(() => banner.remove(), 350);
    });
  });

  requestAnimationFrame(() => banner.classList.add("cookie-banner--visible"));
}

export function getCookieConsent() {
  const data = readStoredConsent();
  return data ? data.status : null;
}
