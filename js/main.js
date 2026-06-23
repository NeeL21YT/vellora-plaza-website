/* =============================================
   VELLORA PLAZA — Main JavaScript
   ============================================= */

'use strict';

/* ─── Hero Carousel ──────────────────────────── */
(function () {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  let current = 0;
  let timer;

  // Lazy-load a slide's background image on demand via data-bg
  const loadSlide = (index) => {
    const bg = slides[index]?.querySelector('.hero-bg');
    if (bg && bg.dataset.bg && !bg.style.backgroundImage) {
      bg.style.backgroundImage = `url('${bg.dataset.bg}')`;
    }
  };

  const goTo = (index) => {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (index + slides.length) % slides.length;
    loadSlide(current);
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  };

  const next = () => goTo(current + 1);

  const startTimer = () => {
    clearInterval(timer);
    timer = setInterval(next, 6000);
  };

  // Preload next slide just before it's shown
  const preloadNext = () => {
    const nextIndex = (current + 1) % slides.length;
    loadSlide(nextIndex);
  };

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startTimer(); });
  });

  // Preload slide 2 after a short delay so it's ready for first auto-advance
  setTimeout(() => loadSlide(1), 3000);

  startTimer();
  // Preload next slide 1s before each advance
  setInterval(preloadNext, 5000);
})();

/* ─── Scroll fade-up animations ─────────────── */
(function () {
  const els = document.querySelectorAll('.fade-up');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
})();

/* ─── Event filter tabs ──────────────────────── */
(function () {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const eventCards = document.querySelectorAll('.event-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      eventCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          setTimeout(() => card.style.opacity = '1', 10);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    });
  });
})();

/* ─── Newsletter form ────────────────────────── */
(function () {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const btn   = form.querySelector('button');
    if (!input?.value) return;
    const orig = btn.textContent;
    btn.textContent = 'Thank you!';
    btn.style.pointerEvents = 'none';
    input.value = '';
    setTimeout(() => { btn.textContent = orig; btn.style.pointerEvents = ''; }, 3000);
  });
})();

/* ─── Contact form ───────────────────────────── */
(function () {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn');
    const orig = btn.innerHTML;
    btn.innerHTML = '<span class="btn-text">Message Sent!</span>';
    btn.style.pointerEvents = 'none';
    setTimeout(() => { btn.innerHTML = orig; btn.style.pointerEvents = ''; }, 3000);
  });
})();

/* ─── Smooth counter animation ───────────────── */
(function () {
  const numbers = document.querySelectorAll('.stat-number[data-count]');
  if (!numbers.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      const dur    = 1800;
      const step   = 16;
      const inc    = target / (dur / step);
      let   val    = 0;
      const tick   = () => {
        val = Math.min(val + inc, target);
        el.textContent = Math.round(val) + suffix;
        if (val < target) requestAnimationFrame(tick);
      };
      tick();
      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  numbers.forEach(n => io.observe(n));
})();

/* ─── Gallery lightbox — full featured ──────── */
(function () {
  const items = document.querySelectorAll('.gallery-item');
  if (!items.length) return;

  // Collect all images
  const images = Array.from(items).map(item => ({
    src:     item.querySelector('img')?.src || '',
    alt:     item.querySelector('img')?.alt || '',
  })).filter(i => i.src);

  let current = 0;

  // Build lightbox DOM
  const lb       = document.createElement('div');
  lb.className   = 'vp-lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');

  const btnClose = document.createElement('button');
  btnClose.className   = 'vp-lb-close';
  btnClose.innerHTML   = '<i class="fas fa-xmark"></i>';
  btnClose.setAttribute('aria-label', 'Close');

  const btnPrev  = document.createElement('button');
  btnPrev.className    = 'vp-lb-prev';
  btnPrev.innerHTML    = '<i class="fas fa-chevron-left"></i>';
  btnPrev.setAttribute('aria-label', 'Previous image');

  const btnNext  = document.createElement('button');
  btnNext.className    = 'vp-lb-next';
  btnNext.innerHTML    = '<i class="fas fa-chevron-right"></i>';
  btnNext.setAttribute('aria-label', 'Next image');

  const imgWrap  = document.createElement('div');
  imgWrap.className    = 'vp-lightbox-img-wrap';

  const img      = document.createElement('img');
  img.alt        = '';

  const counter  = document.createElement('div');
  counter.className    = 'vp-lb-counter';

  const caption  = document.createElement('div');
  caption.className    = 'vp-lb-caption';

  imgWrap.appendChild(img);
  lb.appendChild(btnClose);
  lb.appendChild(btnPrev);
  lb.appendChild(imgWrap);
  lb.appendChild(btnNext);
  lb.appendChild(counter);
  lb.appendChild(caption);
  document.body.appendChild(lb);

  // Open lightbox
  function open(index) {
    current = ((index % images.length) + images.length) % images.length;
    img.src    = images[current].src;
    img.alt    = images[current].alt;
    caption.textContent  = images[current].alt;
    counter.textContent  = (current + 1) + ' / ' + images.length;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    img.src = '';
  }

  function prev() { open(current - 1); }
  function next() { open(current + 1); }

  // Click gallery items
  items.forEach((item, i) => {
    item.addEventListener('click', () => open(i));
  });

  // Button events
  btnClose.addEventListener('click', (e) => { e.stopPropagation(); close(); });
  btnPrev.addEventListener('click',  (e) => { e.stopPropagation(); prev(); });
  btnNext.addEventListener('click',  (e) => { e.stopPropagation(); next(); });

  // Click backdrop to close
  lb.addEventListener('click', (e) => {
    if (e.target === lb || e.target === imgWrap) close();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   prev();
    if (e.key === 'ArrowRight')  next();
  });

  // Touch swipe support
  let touchStartX = 0;
  lb.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend',   (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) < 40) return;
    dx < 0 ? next() : prev();
  });
})();

/* ─── FAQ Accordion ──────────────────────────── */
(function () {
  const questions = document.querySelectorAll('.faq-question');
  if (!questions.length) return;

  questions.forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const answer   = btn.nextElementSibling;

      // Close all others
      questions.forEach(other => {
        other.setAttribute('aria-expanded', 'false');
        const otherAnswer = other.nextElementSibling;
        if (otherAnswer) otherAnswer.classList.remove('open');
      });

      // Toggle current
      if (!expanded) {
        btn.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });
})();
