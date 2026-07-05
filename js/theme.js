/* =========================================================
   theme.js — dark/light mode toggle with localStorage persistence
   Dark mode is the default experience.
   ========================================================= */

(function initTheme() {
  const root = document.documentElement;
  const STORAGE_KEY = 'bidur-portfolio-theme';

  function applyTheme(theme) {
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    updateToggleIcon(theme);
  }

  function updateToggleIcon(theme) {
    const sun = document.getElementById('icon-sun');
    const moon = document.getElementById('icon-moon');
    if (!sun || !moon) return;
    if (theme === 'light') {
      sun.classList.remove('hidden');
      moon.classList.add('hidden');
    } else {
      sun.classList.add('hidden');
      moon.classList.remove('hidden');
    }
  }

  // Apply saved theme immediately (before paint-ish, script is deferred so best effort)
  const saved = localStorage.getItem(STORAGE_KEY) || 'dark';
  applyTheme(saved);

  document.addEventListener('DOMContentLoaded', () => {
    updateToggleIcon(saved);
    const toggleButtons = document.querySelectorAll('[data-theme-toggle]');
    toggleButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const isLight = root.classList.contains('light');
        const next = isLight ? 'dark' : 'light';
        applyTheme(next);
        localStorage.setItem(STORAGE_KEY, next);
      });
    });
  });
})();
