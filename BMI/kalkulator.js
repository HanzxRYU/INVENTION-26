// ================= SELALU MULAI DARI ATAS SAAT HALAMAN DIBUKA =================

// 1. Matikan fitur browser yang "mengingat" posisi scroll terakhir
history.scrollRestoration = "manual";

// 2. Hapus tanda # di URL (misal #hasil) supaya tidak lompat ke section itu
if (window.location.hash) {
  history.replaceState(null, "", window.location.pathname);
}

// 3. Tarik langsung ke paling atas begitu halaman dibuka
window.scrollTo({ top: 0, left: 0, behavior: "instant" });

// 4. Jaga-jaga: ulangi lagi setelah semua gambar/aset selesai dimuat,
//    karena kadang itu bisa menggeser posisi scroll
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

// ================= KLIK 'BMI' (DI NAVBAR ATAU DI FOOTER) → SCROLL KE ATAS =================
document.querySelectorAll(".scroll-top-link").forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// ================= LOGIKA KALKULATOR BMI =================
let selectedGender = "L";

// ----- TOMBOL GENDER (IKON BULAT, BUKAN TOMBOL TEKS) -----
// Dua "paket" class ini ditukar bolak-balik: kalau satu paket masuk,
// paket satunya pasti dikeluarkan dulu. Jadi gak akan ada bentrok
// (misalnya warna latar lama nempel bareng warna latar baru).
const genderActiveClasses = ["bg-[#FF6B81]", "border-[#FF6B81]", "text-white"];
const genderInactiveClasses = ["bg-white", "border-black/[0.09]", "text-[#6B6B6B]"];

document.querySelectorAll(".gender-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    // matikan semua tombol dulu -> pasang paket "tidak aktif" ke semuanya
    document.querySelectorAll(".gender-btn").forEach((b) => {
      b.classList.remove(...genderActiveClasses, "active");
      b.classList.add(...genderInactiveClasses);
    });
    // baru nyalakan tombol yang diklik -> pasang paket "aktif"
    btn.classList.remove(...genderInactiveClasses);
    btn.classList.add(...genderActiveClasses, "active");
    selectedGender = btn.dataset.gender;
  });
});

// ----- GAMBAR ILUSTRASI BADAN SESUAI KATEGORI BMI -----
// GANTI value (path) di bawah ini dengan path gambar kamu sendiri.
// "Sangat Kurus" & "Kurus" sengaja dibikin sama-sama pakai gambar "kurus"
// -- kalau kamu punya gambar terpisah untuk masing-masing, tinggal
// pisahkan value-nya jadi 2 baris berbeda.
const gambarBadan = {
  "Sangat Kurus": "../assets/badan/badan-kurus.svg",
  "Kurus": "../assets/badan/badan-kurus.svg",
  "Normal": "../assets/badan/badan-normal.svg",
  "Gemuk": "../assets/badan/badan-gendut.svg",
  "Obesitas": "../assets/badan/obesitas.svg",
};

function kategoriBMI(bmi) {
  if (bmi < 17)
    return {
      label: "Sangat Kurus",
      color: "#D9483A",
      bg: "#FCE7E5",
      desc: "Berat badanmu di bawah kisaran sehat. Prioritaskan tambahan kalori dan protein secara bertahap, dan pertimbangkan konsultasi ke tenaga medis.",
    };
  if (bmi < 18.5)
    return {
      label: "Kurus",
      color: "#D98E14",
      bg: "#FDF1DD",
      desc: "Berat badanmu sedikit di bawah kisaran ideal. Tambahkan porsi makan secara bertahap, fokus ke sumber protein dan karbohidrat kompleks.",
    };
  if (bmi <= 25.0)
    return {
      label: "Normal",
      color: "#3FA66B",
      bg: "#E6F5EC",
      desc: "Berat badanmu berada di kisaran sehat. Pertahankan pola makan seimbang dan tetap aktif bergerak.",
    };
  if (bmi <= 27.0)
    return {
      label: "Gemuk",
      color: "#D98E14",
      bg: "#FDF1DD",
      desc: "Berat badanmu sedikit di atas kisaran ideal. Kurangi porsi karbohidrat sederhana dan perbanyak aktivitas fisik ringan secara rutin.",
    };
  return {
    label: "Obesitas",
    color: "#D9483A",
    bg: "#FCE7E5",
    desc: "Berat badanmu jauh di atas ideal. Atur pola makan bertahap dan konsultasi ke tenaga medis.",
  };
}

function hitungBMR(gender, weight, height, age) {
  return gender === "L"
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
}

function saranPerBagian(kat) {
  const map = {
    "Sangat Kurus": [
      {
        icon: "../assets/icon/Api.svg",
        title: "Kalori",
        text: "Tambah 300-500 kkal dari kebutuhan harianmu secara bertahap, bukan sekaligus.",
      },
      {
        icon: "../assets/icon/ayam.svg",
        title: "Protein",
        text: "Perbanyak telur, ikan, tahu, tempe di setiap waktu makan untuk bantu tambah massa otot.",
      },
      {
        icon: "../assets/icon/Baju.svg",
        title: "Karbohidrat",
        text: "Pilih karbohidrat padat energi seperti nasi, kentang, dan ubi dalam porsi cukup.",
      },
      {
        icon: "../assets/icon/Orang-lari.svg",
        title: "Aktivitas",
        text: "Latihan beban ringan bisa membantu berat badan bertambah sebagai otot, bukan cuma lemak.",
      },
    ],
    Kurus: [
      {
        icon: "../assets/icon/Api.svg",
        title: "Kalori",
        text: "Tambah sedikit porsi di setiap waktu makan, sekitar 200-300 kkal dari kebutuhan harianmu.",
      },
      {
        icon: "../assets/icon/ayam.svg",
        title: "Protein",
        text: "Pastikan ada sumber protein di setiap makan besar: telur, ayam, ikan, atau tempe.",
      },
      {
        icon: "../assets/icon/Baju.svg",
        title: "Karbohidrat",
        text: "Jangan lewatkan waktu makan, terutama sarapan, untuk menjaga energi harian.",
      },
      {
        icon: "../assets/icon/Orang-lari.svg",
        title: "Aktivitas",
        text: "Tetap aktif bergerak, tapi tidak perlu berlebihan — fokus ke kecukupan makan dulu.",
      },
    ],
    Normal: [
      {
        icon: "../assets/icon/Api.svg",
        title: "Kalori",
        text: "Pertahankan pola makan saat ini, sesuaikan porsi dengan tingkat aktivitas harianmu.",
      },
      {
        icon: "../assets/icon/ayam.svg",
        title: "Protein",
        text: "Variasikan sumber protein hewani dan nabati agar nutrisi lebih lengkap.",
      },
      {
        icon: "../assets/icon/Baju.svg",
        title: "Karbohidrat",
        text: "Pilih karbohidrat kompleks (nasi merah, oat) lebih sering dibanding yang olahan.",
      },
      {
        icon: "../assets/icon/Orang-lari.svg",
        title: "Aktivitas",
        text: "Jaga rutinitas aktif minimal 30 menit per hari untuk menjaga kebugaran.",
      },
    ],
    Gemuk: [
      {
        icon: "../assets/icon/Api.svg",
        title: "Kalori",
        text: "Kurangi sekitar 200-300 kkal dari kebutuhan harianmu secara bertahap, jangan drastis.",
      },
      {
        icon: "../assets/icon/ayam.svg",
        title: "Protein",
        text: "Pertahankan asupan protein agar tetap kenyang lebih lama saat mengurangi porsi.",
      },
      {
        icon: "../assets/icon/Baju.svg",
        title: "Karbohidrat",
        text: "Kurangi gula dan karbohidrat olahan (gorengan, minuman manis), ganti dengan serat.",
      },
      {
        icon: "../assets/icon/Orang-lari.svg",
        title: "Aktivitas",
        text: "Tambahkan aktivitas fisik ringan-sedang, seperti jalan cepat 30 menit, 4-5x seminggu.",
      },
    ],
    Obesitas: [
      {
        icon: "../assets/icon/Api.svg",
        title: "Kalori",
        text: "Penyesuaian kalori sebaiknya dilakukan bertahap dan didampingi tenaga profesional.",
      },
      {
        icon: "../assets/icon/ayam.svg",
        title: "Protein",
        text: "Utamakan protein rendah lemak seperti ikan, dada ayam, dan tahu.",
      },
      {
        icon: "../assets/icon/Baju.svg",
        title: "Karbohidrat",
        text: "Kurangi signifikan gula tambahan dan makanan olahan tinggi kalori.",
      },
      {
        icon: "../assets/icon/Orang-lari.svg",
        title: "Aktivitas",
        text: "Mulai dari aktivitas ringan yang konsisten, tingkatkan bertahap sesuai kemampuan tubuh.",
      },
    ],
  };
  return map[kat];
}

document.getElementById("btn-hitung").addEventListener("click", () => {
  const age = parseFloat(document.getElementById("input-age").value);
  const height = parseFloat(document.getElementById("input-height").value);
  const weight = parseFloat(document.getElementById("input-weight").value);
  // Field "Tingkat Aktivitas Harian" sudah dihapus dari tampilan.
  // Supaya "Kebutuhan Kalori Harian" tetap bisa dihitung, dipakai
  // angka tetap 1.55 (setara "Sedang, olahraga 3-5x/minggu"),
  // yaitu nilai yang dulu jadi pilihan default di dropdown-nya.
  const activity = 1.55;

  if (!age || !height || !weight) {
    alert("Isi semua data dulu ya (usia, tinggi, berat).");
    return;
  }

  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);
  const kat = kategoriBMI(bmi);
  const bmr = hitungBMR(selectedGender, weight, height, age);
  const totalKalori = Math.round(bmr * activity);

  // proporsi makro disesuaikan kategori (dalam AMDR sehat, condong ke pola AKG Indonesia)
  let pKarbo, pProtein, pLemak;
  if (kat.label === "Sangat Kurus" || kat.label === "Kurus") {
    pKarbo = 55;
    pProtein = 20;
    pLemak = 25;
  } else if (kat.label === "Gemuk" || kat.label === "Obesitas") {
    pKarbo = 45;
    pProtein = 25;
    pLemak = 30;
  } else {
    pKarbo = 55;
    pProtein = 17;
    pLemak = 28;
  }

  const gKarbo = Math.round((totalKalori * pKarbo) / 100 / 4);
  const gProtein = Math.round((totalKalori * pProtein) / 100 / 4);
  const gLemak = Math.round((totalKalori * pLemak) / 100 / 9);

  // ----- UPDATE RINGKASAN DI KARTU ATAS (SELALU TERLIHAT) -----
  document.getElementById("out-bmi").textContent = bmi.toFixed(1);

  const badgeEl = document.getElementById("out-badge");
  badgeEl.textContent = kat.label;
  badgeEl.style.color = kat.color; // cuma warna teksnya, tanpa background pill

  // Ganti gambar ilustrasi badan sesuai kategori
  const bodyImg = document.getElementById("body-silhouette");
  if (gambarBadan[kat.label]) {
    bodyImg.src = gambarBadan[kat.label];
  }

  // ----- UPDATE BANNER PENJELASAN KATEGORI (di bawah kartu form) -----
  document.getElementById("out-bmi-banner").textContent = bmi.toFixed(1);

  const badgeBannerEl = document.getElementById("out-badge-banner");
  badgeBannerEl.textContent = kat.label;
  badgeBannerEl.style.color = kat.color;

  document.getElementById("out-desc-banner").textContent = kat.desc;

  // ----- UPDATE BAGIAN DETAIL DI BAWAH -----
  document.getElementById("out-kalori").textContent =
    totalKalori.toLocaleString("id-ID");

  document.getElementById("bar-karbo").style.width = pKarbo + "%";
  document.getElementById("bar-protein").style.width = pProtein + "%";
  document.getElementById("bar-lemak").style.width = pLemak + "%";
  document.getElementById("out-karbo").textContent =
    pKarbo + "% (" + gKarbo + "g)";
  document.getElementById("out-protein").textContent =
    pProtein + "% (" + gProtein + "g)";
  document.getElementById("out-lemak").textContent =
    pLemak + "% (" + gLemak + "g)";

  const saranContainer = document.getElementById("saran-container");
  saranContainer.innerHTML = saranPerBagian(kat.label)
    .map(
      (s) => `
    <div class="border border-white rounded-xl p-[18px]">
      <img src="${s.icon}" alt="${s.title}" class="h-8 w-8 mb-2" />
      <h3 class="text-[15px] mb-1.5 font-bold">${s.title}</h3>
      <p class="text-[13.5px] m-0 text-[#6B6B6B]">${s.text}</p>
    </div>
  `,
    )
    .join("");

      // Tampilkan tombol konsultasi AI (muncul bareng result-section)  ← ★ INI
  document.getElementById("btn-konsultasi").classList.remove("hidden");

  document.getElementById("result-section").style.display = "block";
  document
    .getElementById("result-section")
    .scrollIntoView({ behavior: "smooth" });
});

// ================= TOMBOL "KONSULTASI AI CHATBOT" =================
const btnKonsultasi = document.getElementById("btn-konsultasi");
if (btnKonsultasi) {
  btnKonsultasi.addEventListener("click", function () {
    window.location.href = "../ChatBot/chatbot.html";
  });
}