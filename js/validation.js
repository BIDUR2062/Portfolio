/* =========================================================
   validation.js — client-side contact form validation
   ========================================================= */

(function initFormValidation() {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const fields = {
      name: {
        el: form.querySelector("#field-name"),
        error: form.querySelector("#error-name"),
      },
      email: {
        el: form.querySelector("#field-email"),
        error: form.querySelector("#error-email"),
      },
      subject: {
        el: form.querySelector("#field-subject"),
        error: form.querySelector("#error-subject"),
      },
      message: {
        el: form.querySelector("#field-message"),
        error: form.querySelector("#error-message"),
      },
    };

    const successBox = document.getElementById("form-success");

    function setError(field, message) {
      field.el.classList.toggle("field-error", Boolean(message));
      if (field.error) field.error.textContent = message || "";
    }

    function validateName() {
      const value = fields.name.el.value.trim();
      if (value.length < 2) {
        setError(fields.name, "Enter your full name (2+ characters).");
        return false;
      }
      setError(fields.name, "");
      return true;
    }

    function validateEmail() {
      const value = fields.email.el.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(value)) {
        setError(fields.email, "Enter a valid email address.");
        return false;
      }

      setError(fields.email, "");
      return true;
    }

    function validateSubject() {
      const value = fields.subject.el.value.trim();

      if (value.length < 3) {
        setError(fields.subject, "Subject should be at least 3 characters.");
        return false;
      }

      setError(fields.subject, "");
      return true;
    }

    function validateMessage() {
      const value = fields.message.el.value.trim();

      if (value.length < 10) {
        setError(fields.message, "Message should be at least 10 characters.");
        return false;
      }

      setError(fields.message, "");
      return true;
    }

    // Live validation
    Object.entries({
      name: validateName,
      email: validateEmail,
      subject: validateSubject,
      message: validateMessage,
    }).forEach(([key, validator]) => {
      fields[key].el.addEventListener("blur", validator);

      fields[key].el.addEventListener("input", () => {
        if (fields[key].el.classList.contains("field-error")) {
          validator();
        }
      });
    });

    // Submit form without redirecting
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const validations = [
        validateName(),
        validateEmail(),
        validateSubject(),
        validateMessage(),
      ];

      const allValid = validations.every(Boolean);

      if (!allValid) {
        if (successBox) successBox.classList.add("hidden");

        const firstInvalid = form.querySelector(".field-error");
        if (firstInvalid) firstInvalid.focus();

        return;
      }

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: new FormData(form),
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          form.reset();

          // Clear validation errors
          Object.values(fields).forEach((field) => {
            setError(field, "");
          });

          if (successBox) {
            successBox.classList.remove("hidden");
            successBox.textContent = "Message Sent!";

            setTimeout(() => {
              successBox.classList.add("hidden");
            }, 5000);
          }
        } else {
          if (successBox) {
            successBox.classList.remove("hidden");
            successBox.textContent =
              "Failed to send message. Please try again.";
          }
        }
      } catch (error) {
        console.error(error);

        if (successBox) {
          successBox.classList.remove("hidden");
          successBox.textContent =
            "Network error. Please check your connection.";
        }
      }
    });
  });
})();