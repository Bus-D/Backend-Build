import { loadHeader, loadFooter } from "./HeaderFooter.js";

document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
  loadFooter();
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
