// ------------------------------
// HEADER + FOOTER MODULE
// ------------------------------

export function loadHeader() {
  document.querySelector("header").innerHTML = `
    <a href="index.html" class="logo-link">
      <img src="images/logo/Bus-DLogo.png" alt="Bus-D Designs Logo" class="logo" />
    </a>
    <nav>
      <a href="index.html">Home</a>
      <a href="contact.html">Contact/About</a>
      <a href="faq.html">FAQ</a>
      <a href="contact.html" class="order-button">Get in Contact</a>
    </nav>
  `;

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

export function loadFooter() {
  document.querySelector("footer").innerHTML = `
    <p>Bus-D Designs &copy;</p>
    <div class="social-links">
      <p>Follow me</p>
      <a href="https://www.instagram.com/busd_designs?igsh=ZjA0YThzdXZ1Znlv&utm_source=qr">
        <img src="images/images/instagram.jpg" alt="Instagram" />
      </a>
      <a href="https://www.facebook.com/profile.php?id=61558731148652">
        <img src="images/images/facebook.png" alt="Facebook" />
      </a>
    </div>
  `;
}
