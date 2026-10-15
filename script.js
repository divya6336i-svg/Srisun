const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
    navLinks.classList.toggle("is-open", !isExpanded);
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      navLinks.classList.remove("is-open");
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      navLinks.classList.remove("is-open");
    }
  });
}

const form = document.querySelector("#consultation-form");
const feedback = document.querySelector("#form-feedback");

if (form instanceof HTMLFormElement && feedback) {
  const requiredFields = Array.from(form.querySelectorAll("input[required], select[required], textarea[required]"));

  requiredFields.forEach((field) => {
    field.addEventListener("input", () => field.removeAttribute("aria-invalid"));
    field.addEventListener("change", () => field.removeAttribute("aria-invalid"));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    feedback.textContent = "";

    const invalidFields = requiredFields.filter((field) => !field.checkValidity());
    requiredFields.forEach((field) => {
      if (!field.checkValidity()) {
        field.setAttribute("aria-invalid", "true");
      } else {
        field.removeAttribute("aria-invalid");
      }
    });

    if (invalidFields.length > 0) {
      feedback.textContent = "Please complete each field with valid information.";
      invalidFields[0].focus();
      return;
    }

    const formData = new FormData(form);
    const subject = encodeURIComponent(`Free consultation request from ${formData.get("name")}`);
    const body = encodeURIComponent(
      `Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\nService: ${formData.get("service")}\n\nProject details:\n${formData.get("message")}`
    );
    feedback.textContent = "Thanks! Your email app is opening with your enquiry.";
    window.location.href = `mailto:hello@srisundigital.com?subject=${subject}&body=${body}`;
  });
}

const yearElement = document.querySelector("#current-year");
if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}
