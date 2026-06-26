/* =============================================
   VELLORA PLAZA — Shared Navbar Component
   ============================================= */
(function () {
  const NAV_HTML = `
<nav class="navbar" id="navbar">
  <div class="nav-inner">
    <a href="/" class="nav-logo">
      <img src="images/logo.webp" alt="Vellora Plaza" />
      <div class="nav-logo-lockup">
        <span class="nav-logo-name">VELLORA</span>
        <span class="nav-logo-sub">Plaza</span>
      </div>
    </a>
    <ul class="nav-links">
      <li><a href="/">Home</a></li>
      <li><a href="shop.html">Shop</a></li>
      <li><a href="dine.html">Dine</a></li>
      <li><a href="entertainment.html">Entertainment</a></li>
      <li><a href="events.html">Events</a></li>
      <li><a href="services.html">Services</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>
    <div class="nav-right">
      <a href="tel:+911800000000" class="nav-tel">1800-000-0000</a>
    </div>
    <button class="hamburger" id="hamburger" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<div class="mobile-nav" id="mobileNav">
  <a href="/">Home</a>
  <a href="shop.html">Shop</a>
  <a href="dine.html">Dine</a>
  <a href="entertainment.html">Entertainment</a>
  <a href="events.html">Events</a>
  <a href="services.html">Services</a>
  <a href="about.html">About</a>
  <a href="contact.html">Contact</a>
  <p class="mobile-nav-tel">1800-000-0000</p>
</div>`;

  // Inject navbar
  const placeholder = document.getElementById('site-navbar');
  if (placeholder) {
    placeholder.outerHTML = NAV_HTML;
  }

  // Highlight active link — works on Netlify AND Vercel
  const base = '';
  const currentPath = window.location.pathname
    .replace(base, '')
    .replace(/^\/?/, '/')
    .replace(/\.html$/, '')   // strip .html from current URL (Vercel keeps it, Netlify strips it)
    .replace(/\/$/, '') || '/';

  document.querySelectorAll('.nav-links a').forEach(link => {
    const raw  = link.getAttribute('href');
    const href = raw
      .replace(base, '')
      .replace(/^\/?/, '/')
      .replace(/\.html$/, '') // strip .html from link href
      .replace(/\/$/, '') || '/';
    if (href === currentPath) link.classList.add('active');
  });

  // Scroll effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Hamburger toggle
  const hamburger = document.getElementById('hamburger');
  const mobileNav  = document.getElementById('mobileNav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
})();
