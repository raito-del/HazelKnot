/* Shop, product popup, custom order */

let activeCat = "all", showWishOnly = false, currentProduct = null;
let wishlist = [];
try { wishlist = JSON.parse(localStorage.getItem("hk-wishlist") || "[]"); } catch (e) { wishlist = []; }
function saveWish() {
  try { localStorage.setItem("hk-wishlist", JSON.stringify(wishlist)); } catch (e) {}
  $("wishCount").textContent = wishlist.length;
}
function toggleWish(id) {
  const i = wishlist.indexOf(id);
  if (i >= 0) { wishlist.splice(i, 1); showToast("পছন্দের তালিকা থেকে সরানো হয়েছে"); }
  else { wishlist.push(id); showToast("পছন্দের তালিকায় যোগ হয়েছে ❤️"); }
  saveWish(); render();
}

function applySite() {
  $("aboutText").textContent = SITE.aboutText;
  $("aboutPoints").innerHTML = SITE.aboutPoints.map(p => `<li>${esc(p)}</li>`).join("");
  $("footerMsg").href = `https://m.me/${SITE.messengerUsername}`;
  const items = SITE.marqueeItems.map(t => `<span>${esc(t)}</span>`).join("");
  $("marquee").innerHTML = items + items;
  $("cItem").innerHTML = SITE.categories.map(c => `<option>${esc(c)}</option>`).join("") + "<option>অন্য কিছু</option>";
  $("year").textContent = new Date().getFullYear();
}

function buildFilters() {
  const cats = [...new Set(PRODUCTS.map(p => p.category))];
  $("filters").innerHTML = `<button class="chip active" data-cat="all">সব</button>` +
    cats.map(c => `<button class="chip" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
}
$("filters").addEventListener("click", e => {
  const b = e.target.closest(".chip"); if (!b) return;
  document.querySelectorAll(".chip").forEach(x => x.classList.remove("active"));
  b.classList.add("active"); activeCat = b.dataset.cat; render();
});
$("wishToggle").addEventListener("click", () => {
  showWishOnly = !showWishOnly;
  $("wishToggle").classList.toggle("on", showWishOnly);
  render();
});
$("wishNav").addEventListener("click", e => {
  e.preventDefault(); showWishOnly = true; $("wishToggle").classList.add("on"); render();
  $("shop").scrollIntoView({ behavior: "smooth" });
});

function visibleProducts() {
  const q = $("search").value.trim().toLowerCase();
  let list = PRODUCTS.filter(p =>
    (activeCat === "all" || p.category === activeCat) &&
    (!showWishOnly || wishlist.includes(p.id)) &&
    (!q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)));
  const sort = $("sort").value;
  if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
  if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  return list;
}

function render() {
  $("wishCount").textContent = wishlist.length;
  const list = visibleProducts();
  if (!list.length) {
    $("grid").innerHTML = `<p class="empty">${showWishOnly ? "এখনো কোনো পছন্দের পণ্য নেই।" : "এই মুহূর্তে কোনো পণ্য পাওয়া যাচ্ছে না।"}</p>`;
    return;
  }
  $("grid").innerHTML = list.map(p => {
    const liked = wishlist.includes(p.id);
    return `
    <article class="card" data-id="${esc(p.id)}">
      <div class="thumb">
        🧶
        <img src="${esc(p.images[0])}" alt="${esc(p.name)}" onerror="this.style.display='none'">
        ${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ""}
        <button class="heart" data-heart="${esc(p.id)}" aria-label="পছন্দে যোগ করুন">${liked ? "❤️" : "🤍"}</button>
      </div>
      <div class="card-body">
        <span class="card-cat">${esc(p.category)}</span>
        <h3>${esc(p.name)}</h3>
        <p>${esc(p.description)}</p>
        <div class="price">${SITE.currency} ${esc(p.price)}${p.inStock ? "" : " · স্টক নেই"}</div>
      </div>
    </article>`;
  }).join("");
}
$("search").addEventListener("input", render);
$("sort").addEventListener("change", render);

$("grid").addEventListener("click", e => {
  const heart = e.target.closest("[data-heart]");
  if (heart) { e.stopPropagation(); toggleWish(heart.dataset.heart); return; }
  const card = e.target.closest(".card");
  if (card) openProduct(card.dataset.id);
});

/* ============================================================
   PRODUCT MODAL + SHARE LINK
   ============================================================ */
function openProduct(id, updateHash = true) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  currentProduct = p;
  if (updateHash) history.replaceState(null, "", `#product=${encodeURIComponent(p.id)}`);
  $("mImgWrap").innerHTML = `🧶<img src="${esc(p.images[0])}" alt="${esc(p.name)}" onerror="this.style.display='none'">`;
  $("mCat").textContent = p.category;
  $("mName").textContent = p.name;
  $("mPrice").textContent = `${SITE.currency} ${p.price}`;
  $("mDesc").textContent = p.description;
  $("mColor").innerHTML = p.colors.map(c => `<option>${esc(c)}</option>`).join("");
  $("mQty").value = 1;
  $("mOrder").disabled = !p.inStock;
  $("mOrder").textContent = p.inStock ? "💬 Messenger-এ অর্ডার করুন" : "এখন স্টকে নেই";
  $("modal").classList.add("open");
  document.body.classList.add("locked");
}
function closeModal() {
  $("modal").classList.remove("open");
  document.body.classList.remove("locked");
  if (location.hash.startsWith("#product=")) history.replaceState(null, "", location.pathname + location.search);
}
$("modalClose").addEventListener("click", closeModal);
$("modal").addEventListener("click", e => { if (e.target.id === "modal") closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

$("mOrder").addEventListener("click", () => {
  const p = currentProduct; if (!p) return;
  const qty = Math.max(1, parseInt($("mQty").value, 10) || 1);
  sendToMessenger(`হ্যালো Hazelknot! আমি অর্ডার করতে চাই:\nপণ্য: ${p.name} (কোড: ${p.id})\nরং: ${$("mColor").value}\nপরিমাণ: ${qty}\nমোট: ${SITE.currency} ${p.price * qty}\n\nঠিকানা ও ফোন নম্বর দিচ্ছি।`);
  closeModal();
});

$("mShare").addEventListener("click", async () => {
  const p = currentProduct; if (!p) return;
  const link = `${location.origin}${location.pathname}#product=${encodeURIComponent(p.id)}`;
  if (navigator.share) { try { await navigator.share({ title: p.name, text: `${p.name} - Hazelknot`, url: link }); return; } catch (e) {} }
  const ok = await copyText(link);
  showToast(ok ? "পণ্যের লিংক কপি হয়েছে 🔗" : link);
});

function openFromHash() {
  const m = location.hash.match(/^#product=(.+)$/);
  if (!m) return;
  openProduct(decodeURIComponent(m[1]), false);
}
window.addEventListener("hashchange", openFromHash);

/* ============================================================
   CUSTOM ORDER
   ============================================================ */
$("customBtn").addEventListener("click", () => {
  const name = $("cName").value.trim() || "(নাম লেখা হয়নি)";
  const item = $("cItem").value;
  const details = $("cDetails").value.trim() || "(বিস্তারিত লেখা হয়নি)";
  const area = $("cArea").value.trim() || "(এলাকা লেখা হয়নি)";
  sendToMessenger(`হ্যালো Hazelknot! কাস্টম অর্ডার দিতে চাই।\nনাম: ${name}\nপণ্য: ${item}\nবিস্তারিত: ${details}\nএলাকা: ${area}`);
});

/* ============================================================
   START
   ============================================================ */
applySite();
buildFilters();
saveWish();
render();
openFromHash();
