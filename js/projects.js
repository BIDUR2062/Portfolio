/* =========================================================
   projects.js — project category filtering + live search
   ========================================================= */

(function initProjects() {
  document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const searchInput = document.getElementById('project-search');
    const cards = document.querySelectorAll('[data-project-card]');
    const emptyState = document.getElementById('projects-empty');

    let activeFilter = 'all';

    function applyFilters() {
      const query = (searchInput?.value || '').trim().toLowerCase();
      let visibleCount = 0;

      cards.forEach((card) => {
        const category = card.getAttribute('data-category');
        const searchText = card.getAttribute('data-search') || '';
        const matchesFilter = activeFilter === 'all' || category === activeFilter;
        const matchesSearch = query === '' || searchText.toLowerCase().includes(query);
        const show = matchesFilter && matchesSearch;

        if (show) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      if (emptyState) {
        emptyState.classList.toggle('hidden', visibleCount !== 0);
      }
    }

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => {
          b.classList.remove('btn-primary', 'text-white');
          b.classList.add('btn-outline');
        });
        btn.classList.add('btn-primary', 'text-white');
        btn.classList.remove('btn-outline');
        activeFilter = btn.getAttribute('data-filter');
        applyFilters();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', applyFilters);
    }
  });
})();
