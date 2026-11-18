// ==========================================
// JavaScript for Discover Lesotho Website
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
  // 1. Dark Mode / Theme Toggle
  const themeButton = document.getElementById("themeButton");
  if (themeButton) {
    themeButton.addEventListener("click", function () {
      const isDark = document.body.classList.toggle("dark-mode");
      themeButton.textContent = isDark ? "Light mode" : "Dark mode";
      themeButton.setAttribute("aria-pressed", String(isDark));
    });
  }

  // 2. Search Functionality (Home, About Us, and Gallery pages)
  const searchInput = document.getElementById("searchInput");
  const noResults = document.getElementById("noResults");
  const destinationItems = document.querySelectorAll(".destination-item");
  const aboutItems = document.querySelectorAll(".about-item");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchText = this.value.trim().toLowerCase();
      let visibleCount = 0;

      // Filter destination items (e.g., home page)
      if (destinationItems.length > 0) {
        destinationItems.forEach(function (item) {
          const matches = item.textContent.toLowerCase().includes(searchText);
          item.hidden = !matches;
          if (matches) visibleCount++;
        });
      }

      // Filter about / gallery items
      if (aboutItems.length > 0) {
        aboutItems.forEach(function (item) {
          const matches = item.textContent.toLowerCase().includes(searchText);
          item.hidden = !matches;
          if (matches) visibleCount++;
        });
      }

      if (noResults) {
        noResults.hidden = visibleCount !== 0;
      }
    });
  }

  // 3. Modal Information (Home Page)
  const infoModal = document.getElementById("infoModal");
  if (infoModal) {
    infoModal.addEventListener("show.bs.modal", function (event) {
      const button = event.relatedTarget;
      if (!button) return;
      const place = button.getAttribute("data-place");
      const modalTitle = document.getElementById("modalTitle");
      if (modalTitle && place) {
        modalTitle.textContent = `Plan your visit to ${place}`;
      }
    });
  }

  // 4. Registration Form Validation (Contact Page)
  const registrationForm = document.getElementById("registrationForm");
  if (registrationForm) {
    registrationForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!registrationForm.reportValidity()) return;

      const passwordEl = document.getElementById("password");
      const confirmPasswordEl = document.getElementById("confirmPassword");
      const message = document.getElementById("registrationMessage");

      const password = passwordEl ? passwordEl.value : "";
      const confirmPassword = confirmPasswordEl ? confirmPasswordEl.value : "";

      if (password !== confirmPassword) {
        if (message) {
          message.textContent = "Error: passwords do not match.";
          message.className = "message error";
        }
        return;
      }

      if (message) {
        message.textContent = "Registration successful!";
        message.className = "message success";
      }
      registrationForm.reset();
    });
  }

  // 5. Booking Form & Calculation (Contact Page)
  const bookingForm = document.getElementById("bookingForm");
  const guestsInput = document.getElementById("guests");
  const packageSelect = document.getElementById("package");
  const totalDisplay = document.getElementById("total");

  function updateTotal() {
    if (!guestsInput || !packageSelect || !totalDisplay) return;
    const guests = Number(guestsInput.value) || 0;
    const price = Number(packageSelect.value) || 0;
    totalDisplay.textContent = `$${(guests * price).toFixed(2)}`;
  }

  if (guestsInput && packageSelect && totalDisplay) {
    guestsInput.addEventListener("input", updateTotal);
    packageSelect.addEventListener("change", updateTotal);
    updateTotal();
  }

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!bookingForm.reportValidity()) return;

      const message = document.getElementById("bookingMessage");
      const eventDateEl = document.getElementById("eventDate");
      const eventDate = eventDateEl ? eventDateEl.value : "";
      const selectedDate = new Date(`${eventDate}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        if (message) {
          message.textContent = "Error: choose today's date or a future date.";
          message.className = "message error";
        }
        return;
      }

      if (message) {
        message.textContent = `Booking submitted successfully. Estimated total: ${totalDisplay ? totalDisplay.textContent : ""}.`;
        message.className = "message success";
      }

      bookingForm.reset();
      updateTotal();
    });
  }
});
