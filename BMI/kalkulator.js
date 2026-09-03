// ================= NAVBAR SCROLL EFFECT (SAMA SEPERTI DI gizy.js) =================
const mainNav = document.getElementById("main-nav");
const navContainer = document.getElementById("nav-container");
const navLogo = document.getElementById("nav-logo");
const navItems = document.querySelectorAll(".nav-item");

window.addEventListener("scroll", function () {
  if (window.scrollY > 40) {
    // --- TAMPILAN SAAT DI-SCROLL (KAPSUL PINK + BLUR) ---
    mainNav.classList.remove("top-0", "py-5");
    mainNav.classList.add("top-4");

    navContainer.classList.remove("max-w-5xl", "px-4");
    navContainer.classList.add(
      "max-w-xl",
      "px-6",
      "py-3",
      "bg-[#FFA2A2]/50",
      "backdrop-blur-md",
      "rounded-full",
      "border",
      "border-white/80",
      "shadow-lg",
    );

    navLogo.classList.replace("text-black", "text-white");
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
      "bg-[#FFA2A2]/50",
      "backdrop-blur-md",
      "rounded-full",
      "border",
      "border-white/80",
      "shadow-lg",
    );
    navContainer.classList.add("max-w-5xl", "px-4");

    navLogo.classList.replace("text-white", "text-black");
    navItems.forEach((item) => {
      item.classList.remove("text-white", "hover:opacity-80");
      item.classList.add("text-gray-600", "hover:text-black");
    });
  }
});

// ================= LOGIKA KALKULATOR BMI (ISI SAMA SEPERTI SEBELUMNYA) =================
let selectedGender = "L";
let riwayat = JSON.parse(localStorage.getItem("gizy_riwayat") || "[]");

// Class Tailwind yang dipakai untuk menandai tombol gender yang lagi aktif/dipilih
const genderActiveClasses = [
  "bg-[#FF6B81]",
  "text-white",
  "border-[#FF6B81]",
];

document.querySelectorAll(".gender-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".gender-btn").forEach((b) => {
      b.classList.remove(...genderActiveClasses);
      b.classList.remove("active");
    });
    btn.classList.add(...genderActiveClasses);
    btn.classList.add("active");
    selectedGender = btn.dataset.gender;
  });
});

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
    desc: "Berat badanmu cukup jauh di atas kisaran ideal. Disarankan mengatur pola makan bertahap dan berkonsultasi dengan tenaga medis untuk pendampingan yang tepat.",
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
        icon: "fa-fire",
        title: "Kalori",
        text: "Tambah 300-500 kkal dari kebutuhan harianmu secara bertahap, bukan sekaligus.",
      },
      {
        icon: "fa-drumstick-bite",
        title: "Protein",
        text: "Perbanyak telur, ikan, tahu, tempe di setiap waktu makan untuk bantu tambah massa otot.",
      },
      {
        icon: "fa-bread-slice",
        title: "Karbohidrat",
        text: "Pilih karbohidrat padat energi seperti nasi, kentang, dan ubi dalam porsi cukup.",
      },
      {
        icon: "fa-person-walking",
        title: "Aktivitas",
        text: "Latihan beban ringan bisa membantu berat badan bertambah sebagai otot, bukan cuma lemak.",
      },
    ],
    Kurus: [
      {
        icon: "fa-fire",
        title: "Kalori",
        text: "Tambah sedikit porsi di setiap waktu makan, sekitar 200-300 kkal dari kebutuhan harianmu.",
      },
      {
        icon: "fa-drumstick-bite",
        title: "Protein",
        text: "Pastikan ada sumber protein di setiap makan besar: telur, ayam, ikan, atau tempe.",
      },
      {
        icon: "fa-bread-slice",
        title: "Karbohidrat",
        text: "Jangan lewatkan waktu makan, terutama sarapan, untuk menjaga energi harian.",
      },
      {
        icon: "fa-person-walking",
        title: "Aktivitas",
        text: "Tetap aktif bergerak, tapi tidak perlu berlebihan — fokus ke kecukupan makan dulu.",
      },
    ],
    Normal: [
      {
        icon: "fa-fire",
        title: "Kalori",
        text: "Pertahankan pola makan saat ini, sesuaikan porsi dengan tingkat aktivitas harianmu.",
      },
      {
        icon: "fa-drumstick-bite",
        title: "Protein",
        text: "Variasikan sumber protein hewani dan nabati agar nutrisi lebih lengkap.",
      },
      {
        icon: "fa-bread-slice",
        title: "Karbohidrat",
        text: "Pilih karbohidrat kompleks (nasi merah, oat) lebih sering dibanding yang olahan.",
      },
      {
        icon: "fa-person-walking",
        title: "Aktivitas",
        text: "Jaga rutinitas aktif minimal 30 menit per hari untuk menjaga kebugaran.",
      },
    ],
    Gemuk: [
      {
        icon: "fa-fire",
        title: "Kalori",
        text: "Kurangi sekitar 200-300 kkal dari kebutuhan harianmu secara bertahap, jangan drastis.",
      },
      {
        icon: "fa-drumstick-bite",
        title: "Protein",
        text: "Pertahankan asupan protein agar tetap kenyang lebih lama saat mengurangi porsi.",
      },
      {
        icon: "fa-bread-slice",
        title: "Karbohidrat",
        text: "Kurangi gula dan karbohidrat olahan (gorengan, minuman manis), ganti dengan serat.",
      },
      {
        icon: "fa-person-walking",
        title: "Aktivitas",
        text: "Tambahkan aktivitas fisik ringan-sedang, seperti jalan cepat 30 menit, 4-5x seminggu.",
      },
    ],
    Obesitas: [
      {
        icon: "fa-fire",
        title: "Kalori",
        text: "Penyesuaian kalori sebaiknya dilakukan bertahap dan didampingi tenaga profesional.",
      },
      {
        icon: "fa-drumstick-bite",
        title: "Protein",
        text: "Utamakan protein rendah lemak seperti ikan, dada ayam, dan tahu.",
      },
      {
        icon: "fa-bread-slice",
        title: "Karbohidrat",
        text: "Kurangi signifikan gula tambahan dan makanan olahan tinggi kalori.",
      },
      {
        icon: "fa-person-walking",
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
  const activity = parseFloat(document.getElementById("input-activity").value);

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

  document.getElementById("out-bmi").textContent = bmi.toFixed(1);
  const badgeEl = document.getElementById("out-badge");
  badgeEl.textContent = kat.label;
  badgeEl.style.background = kat.bg;
  badgeEl.style.color = kat.color;
  document.getElementById("out-desc").textContent = kat.desc;
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

  // Kartu saran, sekarang pakai class Tailwind langsung (bukan class kalkulator.css lagi)
  const saranContainer = document.getElementById("saran-container");
  saranContainer.innerHTML = saranPerBagian(kat.label)
    .map(
      (s) => `
    <div class="border border-black/[0.09] rounded-xl p-[18px]">
      <i class="fa-solid ${s.icon} text-[#E14F66] text-lg mb-2 block"></i>
      <h3 class="text-[15px] mb-1.5 font-['Poppins'] font-bold">${s.title}</h3>
      <p class="text-[13.5px] m-0 text-[#6B6B6B]">${s.text}</p>
    </div>
  `,
    )
    .join("");

  // gamifikasi: simpan riwayat + badge pertama
  riwayat.push({
    date: new Date().toISOString(),
    bmi: bmi.toFixed(1),
    kategori: kat.label,
  });
  localStorage.setItem("gizy_riwayat", JSON.stringify(riwayat));
  document.getElementById("out-badge-gamif").textContent =
    riwayat.length === 1 ? "Cek Pertama!" : "Konsisten Cek Gizi";
  document.getElementById("out-streak").textContent =
    riwayat.length > 1
      ? `Sudah ${riwayat.length}x cek BMI di sini`
      : "Data tersimpan di perangkatmu";

  document.getElementById("result-section").style.display = "block";
  document
    .getElementById("result-section")
    .scrollIntoView({ behavior: "smooth" });
});

