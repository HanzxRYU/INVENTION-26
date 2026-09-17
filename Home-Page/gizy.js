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

// ================= NAVBAR SCROLL EFFECT =================
const mainNav = document.getElementById("main-nav");
const navContainer = document.getElementById("nav-container");
const navLogo = document.getElementById("nav-logo");
const navItems = document.querySelectorAll(".nav-item");

// Tambahan: ambil elemen hamburger & menu mobile
const navToggle = document.getElementById("nav-toggle");
const navToggleIcon = document.getElementById("nav-toggle-icon");
const mobileMenu = document.getElementById("mobile-menu");

// Jalankan fungsi ini setiap kali layar di-scroll
window.addEventListener("scroll", function () {
  // Cek apakah posisi scroll sudah lebih dari 40 piksel
  if (window.scrollY > 40) {
    // --- TAMPILAN SAAT DI-SCROLL (KAPSUL PINK + BLUR) ---
    mainNav.classList.remove("top-0", "py-5");
    mainNav.classList.add("top-4"); // Turun sedikit dari atas layar

    // CATATAN: yang di-remove harus "max-w-[1006px]" (sesuai HTML),
    // bukan "max-w-5xl" — kalau gak sama, kapsulnya gak akan mengecil.
    navContainer.classList.remove("max-w-[1006px]", "px-4");
    navContainer.classList.add(
      "max-w-xl",
      "px-6",
      "py-3",
      "mx-4", // biar kapsul gak nempel banget ke pinggir layar HP
      "bg-[#FFA2A2]/50", // Background pink transparan
      "backdrop-blur-md", // Efek buram pada elemen di belakangnya
      "rounded-full", // Bentuk kapsul melengkung
      "border",
      "border-white/80", // Garis tepi putih
      "shadow-lg",
    );

    // Ubah warna teks logo & ikon hamburger jadi putih
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
      "max-w-xl",
      "px-6",
      "py-3",
      "mx-4",
      "bg-[#FFA2A2]/50",
      "backdrop-blur-md",
      "rounded-full",
      "border",
      "border-white/80",
      "shadow-lg",
    );
    navContainer.classList.add("max-w-[1006px]", "px-4");

    // Kembalikan warna teks logo & ikon hamburger ke hitam
    navLogo.classList.replace("text-white", "text-black");
    navToggle.classList.replace("text-white", "text-black");

    navItems.forEach((item) => {
      item.classList.remove("text-white", "hover:opacity-80");
      item.classList.add("text-gray-600", "hover:text-black");
    });
  }
});

// ================= MENU MOBILE (HAMBURGER) =================
// Fungsi kecil biar gak nulis kode yang sama berkali-kali
function tutupMenuMobile() {
  mobileMenu.classList.add("hidden");
  navToggleIcon.classList.replace("fa-xmark", "fa-bars"); // ikon X -> garis 3
  navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", function () {
  const lagiTertutup = mobileMenu.classList.contains("hidden");

  if (lagiTertutup) {
    mobileMenu.classList.remove("hidden"); // tampilkan menu
    navToggleIcon.classList.replace("fa-bars", "fa-xmark"); // garis 3 -> X
    navToggle.setAttribute("aria-expanded", "true");
  } else {
    tutupMenuMobile();
  }
});

// Tutup menu otomatis setelah salah satu link di dalamnya diklik
document.querySelectorAll(".mobile-link").forEach(function (link) {
  link.addEventListener("click", tutupMenuMobile);
});

// Tutup juga kalau user klik di luar area menu / tombolnya
document.addEventListener("click", function (e) {
  if (
    !mobileMenu.classList.contains("hidden") &&
    !mobileMenu.contains(e.target) &&
    !navToggle.contains(e.target)
  ) {
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

  //==== Klik masalah langsung scroll ke section masalah ====
  document.querySelectorAll('a[href="#masalah"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetY = beranda.offsetHeight;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    });
  });
})();