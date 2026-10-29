/* Entry screen logic. Animation style is in css/entry.css */

const entry = $("entry");
function enterShop() {
  entry.classList.add("gone");
  document.body.classList.remove("locked");
  window.scrollTo(0, 0);
  openFromHash();
}
$("spoolBtn").addEventListener("click", enterShop);
$("ctaBtn").addEventListener("click", enterShop);