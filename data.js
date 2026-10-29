/* ============================================================
   HAZELKNOT - DATA (edit shop info and products here)
   ============================================================ */

const SITE = {
  shopName: "Hazelknot",
  messengerUsername: "PAGE_USERNAME_HERE",   // Facebook Page-এর username বা Page ID এখানে বসাবেন (যেমন: hazelknot বা 123456789)
  currency: "৳",
  heroSubtitle: "Turning yarn into cozy, handcrafted joy.",
  marqueeItems: ["Handmade Crochet", "Cozy Bags", "Cute Bonnets", "Keychains", "Custom Orders", "Shipping Across BD"],
  categories: ["Bags", "Bonnets & Caps", "Keychains", "Flower Decor", "Coasters", "Bookmarks", "Gifts"],
  aboutText: "Every piece is handmade, one loop at a time. From a single keychain to a full gift set, each creation is made specially for you.",
  aboutPoints: ["100% handmade crochet", "Custom colors and sizes", "Shipping across Bangladesh", "Simple order through Messenger"],
  footerText: "Made with yarn & love."
};

const PRODUCTS = [
  { id: "flower-bonnet", name: "Flower Bonnet", category: "Bonnets & Caps", price: 450, badge: "Bestseller", inStock: true, colors: ["সাদা", "কমলা-হলুদ"], images: ["images/uploads/flower-bonnet.png"], description: "Soft white bonnet with orange and yellow crochet flowers." },
  { id: "rose-bag", name: "Rose Bag", category: "Bags", price: 850, badge: "New", inStock: true, colors: ["মেরুন", "গোলাপি"], images: ["images/uploads/rose-bag.png"], description: "Round maroon rose bag with a pearl strap." },
  { id: "pink-coaster", name: "Pink Coaster", category: "Coasters", price: 150, badge: "", inStock: true, colors: ["গোলাপি"], images: ["images/uploads/pink-coaster.png"], description: "Pink flower coaster. Perfect for your cup or table." },
  { id: "ice-cream-keychain", name: "Ice Cream Keychain", category: "Keychains", price: 200, badge: "Cute", inStock: true, colors: ["মিক্স"], images: ["images/uploads/ice-cream-keychain.png"], description: "Tiny ice-cream cup keychain with a cozy yellow top." },
  { id: "red-rose-flower", name: "Red Rose Flower", category: "Flower Decor", price: 250, badge: "", inStock: false, colors: ["লাল"], images: ["images/uploads/red-rose.png"], description: "Handmade red rose with green leaves. Use as a pin or a decoration." },
  { id: "bookmark-rose-set", name: "Bookmark Rose Set", category: "Bookmarks", price: 180, badge: "Gift", inStock: true, colors: ["গোলাপি", "বেগুনি"], images: ["images/uploads/bookmark-set.png"], description: "Three rose bookmarks in one set. A great gift for readers." }
];