function year() {
  return new Date().getFullYear();
}

export function renderFooter() {
  return `
    <div class="site-footer__inner">
      <div class="site-footer__brand-block">
        <a class="site-footer__brand" href="index.html">Claudia Wolter Shero</a>
        <p class="site-footer__copy">© ${year()} Claudia Wolter Shero. All rights reserved.</p>
      </div>
      <ul class="site-footer__links">
        <li><a class="site-footer__link" href="#">Privacy Policy</a></li>
        <li><a class="site-footer__link" href="#">Terms of Service</a></li>
        <li><a class="site-footer__link" href="#">Imprint</a></li>
      </ul>
      <div class="site-footer__social">
        <a href="mailto:hello@claudiawolter.com" aria-label="Email Claudia">
          <span class="material-symbols-outlined icon--fill">mail</span>
        </a>
        <a data-calendly aria-label="Book a session with Claudia">
          <span class="material-symbols-outlined icon--fill">share</span>
        </a>
      </div>
    </div>
  `;
}
