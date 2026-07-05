/* =========================================================
   main.js — navigation, loading screen, scroll progress,
   back-to-top, active-link highlighting, lazy image loading
   ========================================================= */

(function main() {
  document.addEventListener('DOMContentLoaded', () => {
    /* ---------- Loading screen ---------- */
    const loadingScreen = document.getElementById('loading-screen');
    window.addEventListener('load', () => {
      setTimeout(() => loadingScreen && loadingScreen.classList.add('hidden'), 350);
    });
    // Fallback in case 'load' already fired or is slow on some assets
    setTimeout(() => loadingScreen && loadingScreen.classList.add('hidden'), 2200);

    /* ---------- Mobile navigation ---------- */
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconMenu = document.getElementById('icon-menu-open');
    const iconClose = document.getElementById('icon-menu-close');

    function closeMobileMenu() {
      mobileMenu?.classList.add('hidden');
      iconMenu?.classList.remove('hidden');
      iconClose?.classList.add('hidden');
      menuToggle?.setAttribute('aria-expanded', 'false');
    }

    menuToggle?.addEventListener('click', () => {
      const isHidden = mobileMenu?.classList.contains('hidden');
      mobileMenu?.classList.toggle('hidden');
      iconMenu?.classList.toggle('hidden', isHidden);
      iconClose?.classList.toggle('hidden', !isHidden);
      menuToggle.setAttribute('aria-expanded', String(Boolean(isHidden)));
    });

    document.querySelectorAll('#mobile-menu a').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    /* ---------- Smooth scroll for in-page anchors ---------- */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId.length <= 1) return;
        const target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        const navHeight = document.getElementById('navbar')?.offsetHeight || 0;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });

    /* ---------- Scroll progress bar + sticky navbar shadow ---------- */
    const progressBar = document.getElementById('scroll-progress');
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');

    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (progressBar) progressBar.style.width = pct + '%';

      if (navbar) navbar.classList.toggle('shadow-lg', scrollTop > 8);
      if (backToTop) backToTop.classList.toggle('show', scrollTop > 480);
    }
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    backToTop?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ---------- Active nav-link highlighting via IntersectionObserver ---------- */
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function setActiveLink(id) {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }

    if ('IntersectionObserver' in window && sections.length) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveLink(entry.target.id);
          });
        },
        { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
      );
      sections.forEach((section) => sectionObserver.observe(section));
    }

    /* ---------- Lazy loading images (native + fade-in polish) ---------- */
    document.querySelectorAll('img.lazy-img').forEach((img) => {
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load', () => img.classList.add('loaded'));
      }
    });

    /* ---------- Footer year ---------- */
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
