// ================= INTRO VIDEO (LOOPING + DURASI CUSTOM) =================
const introScreen = document.getElementById("intro-screen");
const introVideo = document.getElementById("intro-video");

// ★★★ ATUR DURASI INTRO DI SINI ★★★
// dalam MILIDETIK (1000 = 1 detik)
// contoh: 5000 = 5 detik, 8000 = 8 detik
const DURASI_INTRO = 6000;

let introSudahSelesai = false; // penjaga biar gak dobel eksekusi

function akhiriIntro() {
  // cegah dobel (timer & tombol skip bisa kepicu barengan)
  if (introSudahSelesai) return;
  introSudahSelesai = true;

  document.body.classList.remove("overflow-hidden"); // buka scroll lagi
  introScreen.classList.add("opacity-0");            // memudar halus
  setTimeout(() => introScreen.remove(), 600);       // dihapus total setelah fade
}

// 1. TIMER UTAMA: intro berakhir sesuai durasi yang kamu tentukan
setTimeout(akhiriIntro, DURASI_INTRO);

// 2. Tombol "Lewati" → keluar duluan
document.getElementById("intro-skip").addEventListener("click", akhiriIntro);

// 3. Kunci scroll selama intro
document.body.classList.add("overflow-hidden");


// ================= KEMBALI KE HERO SAAT HALAMAN DI-REFRESH =================

// 1. Matikan fitur browser yang "mengingat" posisi scroll terakhir
history.scrollRestoration = "manual";

// 2. Hapus tanda # di URL (misal #faq) supaya tidak lompat ke section itu
if (window.location.hash) {
  history.replaceState(null, "", window.location.pathname);
}

// 3. Tarik langsung ke paling atas (bagian hero)
window.scrollTo({ top: 0, left: 0, behavior: "instant" });

// 4. Jaga-jaga: ulangi lagi setelah semua gambar selesai dimuat,
//    karena gambar besar bisa menggeser posisi scroll
window.addEventListener("load", function () {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
});

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
  if (window.scrollY > 40) {
    // --- TAMPILAN SAAT DI-SCROLL (KAPSUL PINK + BLUR) ---
    mainNav.classList.remove("top-0", "py-5");
    mainNav.classList.add("top-4");
    navContainer.classList.remove("max-w-5xl", "px-4");
    navContainer.classList.add(
      "max-w-xl", "px-6", "py-3", "mx-4",
      "bg-[#FFA2A2]/50", "backdrop-blur-md", "rounded-full",
      "border", "border-white/80", "shadow-lg",
    );
    navLogo.classList.replace("text-black", "text-white");
    navToggle.classList.replace("text-black", "text-white");
    navItems.forEach((item) => {
      item.classList.remove("text-gray-600", "hover:text-black");
      item.classList.add("text-white", "hover:opacity-80");
    });
  } else {
    // --- TAMPILAN AWAL (KEMBALI TRANSPARAN & TEKS GELAP) ---
    mainNav.classList.remove("top-4");
    mainNav.classList.add("top-0", "py-5");
    navContainer.classList.remove(
      "max-w-xl", "px-6", "py-3", "mx-4",
      "bg-[#FFA2A2]/50", "backdrop-blur-md", "rounded-full",
      "border", "border-white/80", "shadow-lg",
    );
    navContainer.classList.add("max-w-5xl", "px-4");
    navLogo.classList.replace("text-white", "text-black");
    navToggle.classList.replace("text-white", "text-black");
    navItems.forEach((item) => {
      item.classList.remove("text-white", "hover:opacity-80");
      item.classList.add("text-gray-600", "hover:text-black");
    });
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

// ================= ANIMASI ANGKA (COUNT UP ON HOVER) =================
document.addEventListener("DOMContentLoaded", function () {
  const statCards = document.querySelectorAll(".card-stat");

  statCards.forEach((card) => {
    const numberElement = card.querySelector(".stat-number");
    const targetNumber = parseInt(numberElement.getAttribute("data-target"));
    let timer = null;

    card.addEventListener("mouseenter", function () {
      let current = 1;
      numberElement.textContent = current;
      clearInterval(timer);

      // Hitung kecepatan penambahan angka (durasi total ~0.4 detik)
      const duration = 400;
      const stepTime = Math.max(10, Math.floor(duration / targetNumber));

      timer = setInterval(() => {
        current++;
        numberElement.textContent = current;

        if (current >= targetNumber) {
          clearInterval(timer);
        }
      }, stepTime);
    });
  });
});

// ================= SECTION 1 STICKY =================
// Hero sticky + Section 1 rounded-top nutupin hero,
// lalu Section 1 jadi fixed, baru Section 2 nutupin Section 1.
(function () {
  const beranda = document.getElementById("beranda");
  const masalah = document.getElementById("masalah");
  const spacer = document.getElementById("masalah-spacer");
  let isFixed = false;
  let rafId = null;

  function update() {
    // Hitung threshold: posisi scroll dimana seluruh Section 1 udah terlihat
    // = tinggi hero + tinggi section1 - tinggi layar
    const threshold =
      beranda.offsetHeight + masalah.offsetHeight - window.innerHeight;

    // Scroll sudah melewati seluruh section 1?
    const shouldFix = window.scrollY >= threshold;

    if (shouldFix !== isFixed) {
      if (shouldFix) {
        // Pasang spacer supaya layout tidak jeblog
        spacer.style.height = masalah.offsetHeight + "px";
        masalah.classList.add("masalah-fixed");
        isFixed = true;
      } else {
        masalah.classList.remove("masalah-fixed");
        spacer.style.height = "0";
        isFixed = false;
      }
    }

    rafId = null;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!rafId) {
        rafId = requestAnimationFrame(update);
      }
    },
    { passive: true },
  );

  // Update spacer kalau ukuran berubah (resize)
  window.addEventListener(
    "resize",
    function () {
      if (isFixed) {
        spacer.style.height = masalah.offsetHeight + "px";
      }
      // Re-check posisi
      if (!rafId) {
        rafId = requestAnimationFrame(update);
      }
    },
    { passive: true },
  );

  // ===== KLIK BERANDA → LANGSUNG SCROLL KE HERO =====
  document.querySelectorAll('a[href="#beranda"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      // Langsung lepas fixed state kalau sedang aktif
      if (isFixed) {
        masalah.classList.remove("masalah-fixed");
        spacer.style.height = "0";
        isFixed = false;
      }
      // Smooth scroll ke hero
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
})();