/* =========================================================
   animation.js — scroll reveal, animated counters, skill bars
   ========================================================= */

(function initScrollAnimations() {
  document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---- Generic reveal-on-scroll ---- */
    const revealEls = document.querySelectorAll('.reveal, .reveal-scale');
    if (prefersReducedMotion) {
      revealEls.forEach((el) => el.classList.add('in-view'));
    } else if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );
      revealEls.forEach((el) => revealObserver.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add('in-view'));
    }

    /* ---- Animated counters (Achievements section) ---- */
    const counters = document.querySelectorAll('[data-counter]');
    function animateCounter(el) {
      const target = parseInt(el.getAttribute('data-counter'), 10) || 0;
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1600;
      const start = performance.now();

      function frame(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(frame);
        else el.textContent = target + suffix;
      }
      if (prefersReducedMotion) el.textContent = target + suffix;
      else requestAnimationFrame(frame);
    }

    if ('IntersectionObserver' in window) {
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              counterObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      counters.forEach((el) => counterObserver.observe(el));
    } else {
      counters.forEach(animateCounter);
    }

    /* ---- Animated skill bars ---- */
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    if ('IntersectionObserver' in window) {
      const skillObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target;
              const pct = el.getAttribute('data-percent') || '0';
              requestAnimationFrame(() => { el.style.width = pct + '%'; });
              skillObserver.unobserve(el);
            }
          });
        },
        { threshold: 0.3 }
      );
      skillBars.forEach((el) => skillObserver.observe(el));
    } else {
      skillBars.forEach((el) => { el.style.width = (el.getAttribute('data-percent') || '0') + '%'; });
    }
  });
})();
