import { renderNav, wireNav } from "./nav.js";
import { renderFooter } from "./footer.js";
import { mountCookieBanner } from "./cookie-banner.js";

// Single source of truth for every CTA on the site.
// Replace with the live Calendly scheduling URL when ready.
const CALENDLY_URL = "https://calendly.com/claudia-wolter/discovery";

function mountNav() {
  const header = document.querySelector("[data-nav]");
  if (!header) return;
  header.innerHTML = renderNav();
  wireNav(header);
}

function mountFooter() {
  const footer = document.querySelector("[data-footer]");
  if (!footer) return;
  footer.innerHTML = renderFooter();
}

function wireCalendlyLinks() {
  document.querySelectorAll("a[data-calendly]").forEach((el) => {
    el.setAttribute("href", CALENDLY_URL);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  mountNav();
  mountFooter();
  wireCalendlyLinks();
  mountCookieBanner();
});
