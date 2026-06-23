/* =============================================
   VELLORA PLAZA — Shared Footer Component
   Tagline: Curating luxury, Creating experiences!
   ============================================= */
(function () {
  const year = new Date().getFullYear();
  const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <!-- Brand -->
      <div>
        <img src="images/logo.webp" alt="Vellora Plaza" class="footer-brand-logo" />
        <p class="footer-brand-tagline">Curating luxury, Creating experiences!</p>
        <p class="footer-brand-desc">Vellora Plaza is the city's premier luxury shopping destination — an unparalleled blend of world-class retail, fine dining, and entertainment under one iconic roof.</p>
        <div class="footer-social">
          <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="#" aria-label="X / Twitter"><i class="fab fa-x-twitter"></i></a>
          <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
        </div>
      </div>
      <!-- Explore -->
      <div class="footer-col">
        <h5>Explore</h5>
        <ul>
          <li><a href="shop.html">Shop</a></li>
          <li><a href="dine.html">Dine</a></li>
          <li><a href="entertainment.html">Entertainment</a></li>
          <li><a href="events.html">Events &amp; Offers</a></li>
          <li><a href="services.html">Services</a></li>
        </ul>
      </div>
      <!-- Information -->
      <div class="footer-col">
        <h5>Information</h5>
        <ul>
          <li><a href="about.html">About Us</a></li>
          <li><a href="about.html#team">Management Team</a></li>
          <li><a href="about.html#awards">Awards</a></li>
          <li><a href="contact.html#retail-leasing">Retail Leasing</a></li>
          <li><a href="contact.html">Contact Us</a></li>
        </ul>
      </div>
      <!-- Contact -->
      <div class="footer-col">
        <h5>Visit Us</h5>
        <div class="footer-info-item">
          <span class="footer-info-icon"><i class="fas fa-location-dot"></i></span>
          <div class="footer-info-text">GS Rd, below Flyover, Six Mile,<br />Guwahati, Assam 781022</div>
        </div>
        <div class="footer-info-item">
          <span class="footer-info-icon"><i class="fas fa-clock"></i></span>
          <div class="footer-info-text">10:00 AM – 10:00 PM, Daily<br /><span style="font-size:11px;opacity:0.7;">Excl. Public Holidays</span></div>
        </div>
        <div class="footer-info-item">
          <span class="footer-info-icon"><i class="fas fa-phone"></i></span>
          <div class="footer-info-text"><a href="tel:+911800000000">1800-000-0000</a></div>
        </div>
        <div class="footer-info-item">
          <span class="footer-info-icon"><i class="fas fa-envelope"></i></span>
          <div class="footer-info-text"><a href="mailto:info@velloraplaza.com">info@velloraplaza.com</a></div>
        </div>
      </div>
    </div><!-- /.footer-grid -->
    <div class="footer-bottom">
      <p class="footer-copy">&copy; ${year} Vellora Plaza. All rights reserved.</p>
      <p class="footer-credits">Designed &amp; Marketed by <a href="https://github.com/NeeL21YT/vellora-plaza-website" class="highlight" target="_blank" rel="noopener noreferrer">AI Crew</a></p>
      <div class="footer-legal">
        <a href="privacy-policy.html">Privacy Policy</a>
        <a href="terms.html">Terms &amp; Conditions</a>
      </div>
      <div class="footer-netlify">
        <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">
          <img src="https://www.netlify.com/assets/badges/netlify-badge-dark.svg" alt="Deploys by Netlify" style="height:32px;" />
        </a>
      </div>
    </div>
  </div>
</footer>`;
  const placeholder = document.getElementById('site-footer');
  if (placeholder) {
    placeholder.outerHTML = FOOTER_HTML;
  }
})();
