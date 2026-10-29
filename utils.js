/* Helper functions (toast, copy, Messenger) */

const $ = id => document.getElementById(id);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

function showToast(msg) {
  const t = $("toast");
  t.textContent = msg; t.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => t.classList.remove("show"), 4000);
}
async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch (e) {
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    const ok = document.execCommand("copy"); ta.remove(); return ok;
  }
}
function makeOrderCode() {
  return "HK-" + Date.now().toString(36).slice(-3).toUpperCase() + Math.random().toString(36).slice(2, 4).toUpperCase();
}
async function sendToMessenger(message) {
  const code = makeOrderCode();
  const copied = await copyText(`[অর্ডার কোড: ${code}]\n${message}`);
  window.open(`https://m.me/${SITE.messengerUsername}`, "_blank", "noopener");
  showToast(copied
    ? `অর্ডার কোড ${code}। মেসেজ কপি হয়েছে, Messenger-এ পেস্ট করে পাঠান 💌`
    : `অর্ডার কোড ${code}। Messenger খুলেছে, নিচের কোডটি লিখে পাঠান 💌`);
}