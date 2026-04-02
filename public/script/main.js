document.addEventListener("DOMContentLoaded", () => {
  menuToggle();
});

function menuToggle() {
  const btn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");

  btn.addEventListener('click', () => {
    btn.classList.toggle("change");
    navLinks.classList.toggle("show");
  })
}

function loadHeader() {
  // Highlight active page
  const currentPage = window.location.pathname.split("/").pop();
  document
    .querySelectorAll("nav a")
    .forEach(link => {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
      }
    });
}

loadHeader();
