const NAV_LINKS = [
  { href: "index.html#home", label: "Home", id: "home" },
  { href: "index.html#about", label: "About", id: "about" },
  { href: "index.html#coaching", label: "Coaching", id: "coaching" },
  { href: "index.html#shero", label: "Shero", id: "shero" },
  { href: "index.html#contact", label: "Contact", id: "contact" },
];

function currentIdFromLocation() {
  const hash = window.location.hash.replace("#", "");
  if (hash) return hash;
  const file = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (file === "" || file === "index.html") return "home";
  return file.replace(".html", "");
}

export function renderNav() {
  const currentId = currentIdFromLocation();

  const desktopLinks = NAV_LINKS.map((link) => {
    const isCurrent = link.id === currentId;
    const currentAttr = isCurrent ? ' aria-current="page"' : "";
    return `
      <li>
        <a href="${link.href}" class="site-nav__link"${currentAttr}>${link.label}</a>
      </li>`;
  }).join("");

  const mobileLinks = NAV_LINKS.map((link) => {
    const isCurrent = link.id === currentId;
    const currentAttr = isCurrent ? ' aria-current="page"' : "";
    return `
      <li>
        <a href="${link.href}" class="site-nav__mobile-link"${currentAttr}>${link.label}</a>
      </li>`;
  }).join("");

  return `
    <div class="site-nav__inner">
      <a href="index.html" class="site-nav__brand" aria-label="Claudia Wolter — Shero">
        <img src="assets/shero-logo.png" alt="Shero" class="site-nav__logo" />
      </a>
      <nav aria-label="Primary">
        <ul class="site-nav__links">
          ${desktopLinks}
        </ul>
      </nav>
      <a data-calendly class="btn btn-primary btn--sm site-nav__cta">Book a Session</a>
      <button class="site-nav__toggle" type="button" aria-expanded="false" aria-controls="site-nav-mobile" aria-label="Open menu">
        <span class="material-symbols-outlined">menu</span>
      </button>
    </div>
    <div id="site-nav-mobile" class="site-nav__mobile" data-open="false">
      <ul class="site-nav__mobile-links">
        ${mobileLinks}
      </ul>
      <a data-calendly class="btn btn-primary">Book a Session</a>
    </div>
  `;
}

export function wireNav(root) {
  const toggle = root.querySelector(".site-nav__toggle");
  const mobile = root.querySelector(".site-nav__mobile");
  if (!toggle || !mobile) return;
  toggle.addEventListener("click", () => {
    const isOpen = mobile.getAttribute("data-open") === "true";
    mobile.setAttribute("data-open", String(!isOpen));
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  });
}
