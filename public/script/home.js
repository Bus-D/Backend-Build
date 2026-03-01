let portfolio;

async function getData() {
  try {
    const response = await fetch('data/portfolio.json');
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching JSON", error);
    return null;
  }
}

async function setPortfolioGrid() {
  const items = await getData();
  if (!items || !Array.isArray(items)) return;
  portfolio.innerHTML = items.map(portfolioGridTemplate).join('');
}

function init() {
  // query the DOM element after document is loaded
  portfolio = document.querySelector(".portfolio-grid");
  setPortfolioGrid();
}

document.addEventListener('DOMContentLoaded', init);