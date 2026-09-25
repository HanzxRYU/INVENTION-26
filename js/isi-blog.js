// ================= NAVBAR SCROLL EFFECT (sama seperti gizy.js) =================
const mainNav = document.getElementById("main-nav");
const navContainer = document.getElementById("nav-container");
const navLogo = document.getElementById("nav-logo");
const navItems = document.querySelectorAll(".nav-item");
const navToggle = document.getElementById("nav-toggle");
const navToggleIcon = document.getElementById("nav-toggle-icon");
const mobileMenu = document.getElementById("mobile-menu");
const mobilePanel = document.getElementById("mobile-panel"); // panel menu putih (di dalam layer gelap)

window.addEventListener("scroll", function () {
  if (window.scrollY > 70) {
    mainNav.classList.remove("top-0", "py-5");
    mainNav.classList.add("-top-2");
    navContainer.classList.remove("max-w-5xl", "px-4");
    navContainer.classList.add(
      "max-w-xl",
      "md:w-auto",
      "md:py-5",
      "py-3",
      "md:px-10",
      "px-5",
      "mt-5",
      "bg-white",
      "rounded-[16px]",
      "mx-5",
      "border-2",
      "border-[#F7F7F7]",
      "shadow-lg",
    );
  } else {
    mainNav.classList.remove("-top-2");
    mainNav.classList.add("top-0", "py-5");
    navContainer.classList.remove(
      "max-w-xl",
      "md:w-auto",
      "md:py-5",
      "py-3",
      "md:px-10",
      "px-5",
      "mt-5",
      "bg-white",
      "rounded-[16px]",
      "mx-5",
      "border-2",
      "border-[#F7F7F7]",
      "shadow-lg",
    );
    navContainer.classList.add("max-w-5xl", "px-4");
  }
});

// ================= MENU MOBILE (OVERLAY GELAP) =================
// Layer gelap = #mobile-menu (nutupin seluruh layar)
// Panel putih = #mobile-panel (daftar menu, turun dari atas pas dibuka)
function bukaMenuMobile() {
  mobileMenu.classList.remove("hidden");            // layer gelap muncul
  document.body.classList.add("overflow-hidden");   // halaman belakang gak bisa di-scroll

  // sedikit jeda (satu frame) supaya transisi turun-nya terbaca browser
  requestAnimationFrame(() => {
    mobilePanel.classList.remove("-translate-y-full");
    mobilePanel.classList.add("translate-y-0");
  });

  navToggleIcon.classList.replace("fa-bars", "fa-xmark");
  navToggle.setAttribute("aria-expanded", "true");
}

function tutupMenuMobile() {
  mobilePanel.classList.add("-translate-y-full");   // panel naik keluar layar
  mobilePanel.classList.remove("translate-y-0");
  document.body.classList.remove("overflow-hidden");
  navToggleIcon.classList.replace("fa-xmark", "fa-bars");
  navToggle.setAttribute("aria-expanded", "false");

  // layer gelapnya baru dihilangkan SETELAH panel selesai naik (300ms,
  // sama dengan duration-300 di HTML-nya)
  setTimeout(() => {
    mobileMenu.classList.add("hidden");
  }, 300);
}

navToggle.addEventListener("click", function () {
  const lagiTertutup = mobileMenu.classList.contains("hidden");
  if (lagiTertutup) {
    bukaMenuMobile();
  } else {
    tutupMenuMobile();
  }
});

// Klik link mana pun → tutup menunya dulu, baru pindah halaman
document.querySelectorAll(".mobile-link").forEach(function (link) {
  link.addEventListener("click", function () {
    tutupMenuMobile();
  });
});

// Bonus: klik area GELAP di luar panel → tutup menu juga
mobileMenu.addEventListener("click", function (e) {
  if (!mobilePanel.contains(e.target)) {
    tutupMenuMobile();
  }
});

// ================= KLIK scroll-top-link → SCROLL KE ATAS =================
document.querySelectorAll(".scroll-top-link").forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});