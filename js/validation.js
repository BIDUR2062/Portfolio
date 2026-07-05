/* =========================================================
   validation.js — client-side contact form validation
   ========================================================= */

(function initFormValidation() {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const fields = {
      name: { el: form.querySelector('#field-name'), error: form.querySelector('#error-name') },
      email: { el: form.querySelector('#field-email'), error: form.querySelector('#error-email') },
      subject: { el: form.querySelector('#field-subject'), error: form.querySelector('#error-subject') },
      message: { el: form.querySelector('#field-message'), error: form.querySelector('#error-message') },
    };

    const successBox = document.getElementById('form-success');

    function setError(field, message) {
      field.el.classList.toggle('field-error', Boolean(message));
      if (field.error) field.error.textContent = message || '';
    }

    function validateName() {
      const value = fields.name.el.value.trim();
      if (value.length < 2) return setError(fields.name, 'Enter your full name (2+ characters).'), false;
      setError(fields.name, '');
      return true;
    }

    function validateEmail() {
      const value = fields.email.el.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) return setError(fields.email, 'Enter a valid email address.'), false;
      setError(fields.email, '');
      return true;
    }

    function validateSubject() {
      const value = fields.subject.el.value.trim();
      if (value.length < 3) return setError(fields.subject, 'Subject should be at least 3 characters.'), false;
      setError(fields.subject, '');
      return true;
    }

    function validateMessage() {
      const value = fields.message.el.value.trim();
      if (value.length < 10) return setError(fields.message, 'Message should be at least 10 characters.'), false;
      setError(fields.message, '');
      return true;
    }

    Object.entries({
      name: validateName,
      email: validateEmail,
      subject: validateSubject,
      message: validateMessage,
    }).forEach(([key, validator]) => {
      fields[key].el.addEventListener('blur', validator);
      fields[key].el.addEventListener('input', () => {
        if (fields[key].el.classList.contains('field-error')) validator();
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const validations = [validateName(), validateEmail(), validateSubject(), validateMessage()];
      const allValid = validations.every(Boolean);

      if (!allValid) {
        if (successBox) successBox.classList.add('hidden');
        const firstInvalid = form.querySelector('.field-error');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // No backend is wired up — this is a static portfolio, so we
      // simulate a successful send and reset the form.
      if (successBox) {
        successBox.classList.remove('hidden');
        successBox.textContent = 'Message sent — thanks for reaching out! I\u2019ll reply within a couple of days.';
      }
      form.reset();
      Object.values(fields).forEach((f) => setError(f, ''));
    });
  });
})();
