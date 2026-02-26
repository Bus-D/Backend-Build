// ------------------------------
// HEADER + FOOTER MODULE
// ------------------------------

export function loadHeader() {
  document.querySelector("header").innerHTML = `
  <div class="header-top">
    <a href="index.html" class="logo-link">
      <img src="images/logo/Bus-DLogo.png" alt="Bus-D Designs Logo" class="logo" />
    </a>
    <div class="menu-btn">
      <div class="bar1"></div>
      <div class="bar2"></div>
      <div class="bar3"></div>
    </div>
  </div>
    
    <nav class="nav-links">
      <a href="index.html">Home</a>
      <a href="contact.html">Contact</a>
      <a href="services.html">Services</a>
      <a href="contact.html" class="order-button">Get a Quote</a>
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
  <section class="footer-content">
    <p>Bus-D Designs &copy;</p>

    <div class="site-links">
      <p>Site Links</p>
      <a href="index.html">Home</a>
      <a href="contact.html">Contact</a>
      <a href="services.html">Services</a>
      <a href="about.html">About</a>
    </div>

    <div class="social-links">
      <p>Social Links</p>
      <a href="https://www.instagram.com/busd_designs?igsh=ZjA0YThzdXZ1Znlv&utm_source=qr">
        <img src="images/images/instagram.jpg" alt="Instagram" />
      </a>
      <a href="https://www.facebook.com/profile.php?id=61558731148652">
        <img src="images/images/facebook.png" alt="Facebook" />
      </a>
    </div>
    <div class="legal">
    <p>Legal</p>
      <a href="legal/privacy.html">Privacy</a>
    </div>
  </section>
  `;
}
