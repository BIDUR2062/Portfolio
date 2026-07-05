/* =========================================================
   typing.js — animated role-typing effect for the hero section
   ========================================================= */

(function initTypingEffect() {
  const roles = [
    'Python Developer',
    'Java Programmer',
    'C Programmer',
    'Backend Developer',
    'AI Developer',
    'Problem Solver',
    'Open Source Learner',
  ];

  const TYPE_SPEED = 85;
  const DELETE_SPEED = 45;
  const HOLD_TIME = 1400;

  document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('typing-target');
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      el.textContent = roles[0];
      return;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const currentRole = roles[roleIndex];

      if (!deleting) {
        charIndex++;
        el.textContent = currentRole.slice(0, charIndex);
        if (charIndex === currentRole.length) {
          deleting = true;
          return void setTimeout(tick, HOLD_TIME);
        }
        return void setTimeout(tick, TYPE_SPEED);
      }

      charIndex--;
      el.textContent = currentRole.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        return void setTimeout(tick, 300);
      }
      setTimeout(tick, DELETE_SPEED);
    }

    tick();
  });
})();
