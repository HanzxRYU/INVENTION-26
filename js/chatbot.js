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

// ================= LOGIKA CHATBOT =================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const messages = document.getElementById("chat-messages");
  const quickQuestions = document.getElementById("quick-questions");
  if (!form || !messages) return;

  // Saran cepat sesuai desain
  const suggestions = ["Rekomendasi Sarapan Bergizi", "Persentase Gizi Indonesia", "Penyebab Obesitas"];

  const answers = [
    { keys: ["makan", "gizi", "piring", "diet"], texts: ["Coba susun piringmu: setengahnya sayur dan buah, seperempat protein seperti telur, ikan, atau tempe, lalu sisanya karbohidrat. Makan teratur juga sangat membantu.", "Tidak perlu langsung mengubah semuanya. Mulai saja dengan menambah satu porsi sayur atau buah di setiap waktu makan, lalu kurangi makanan tinggi gula dan garam.", "Pola makan sehat itu soal seimbang, bukan menahan lapar. Pilih makanan beragam, cukup protein, dan jangan lupa makan pada jam yang relatif teratur."] },
    { keys: ["air", "minum", "haus"], texts: ["Kebanyakan orang membutuhkan sekitar 6 sampai 8 gelas air putih per hari. Saat cuaca panas atau banyak bergerak, tubuh biasanya perlu lebih banyak.", "Biar tidak lupa minum, coba letakkan botol air di dekatmu dan minum sedikit-sedikit sepanjang hari. Air putih tetap pilihan yang paling baik.", "Rasa haus adalah tanda awal tubuh butuh cairan. Kamu bisa mulai dengan satu gelas setelah bangun tidur dan satu gelas setiap selesai makan."] },
    { keys: ["olahraga", "gerak", "latihan"], texts: ["Mulai dari yang ringan saja, misalnya jalan cepat, bersepeda, atau menari sekitar 30 menit. Aktivitas yang kamu nikmati biasanya lebih mudah dijadikan kebiasaan.", "Tidak harus langsung ke gym. Naik tangga, jalan kaki saat istirahat, atau peregangan 5 menit juga termasuk cara untuk membuat tubuh lebih aktif.", "Target yang nyaman adalah bergerak aktif sekitar 30 menit, 5 hari dalam seminggu. Kalau baru mulai, bagi menjadi sesi pendek pun tidak masalah."] },
    { keys: ["tidur", "istirahat", "begadang"], texts: ["Untuk orang dewasa, tidur 7 sampai 9 jam per malam biasanya ideal. Coba tidur dan bangun pada jam yang sama agar tubuh lebih mudah beradaptasi.", "Kalau sulit tidur, redupkan lampu dan jauhkan layar sekitar 30 menit sebelum tidur. Rutinitas kecil ini sering membuat kualitas istirahat lebih baik.", "Istirahat cukup membantu energi, fokus, dan daya tahan tubuh. Hindari kopi terlalu sore dan buat kamar senyaman mungkin untuk tidur."] },
    { keys: ["sarapan"], texts: ["Sarapan sederhana bisa berupa roti gandum dengan telur dan buah. Yang penting, ada sumber energi dan protein agar kamu lebih siap memulai hari.", "Tidak perlu sarapan yang rumit. Oat, pisang, telur rebus, atau nasi dengan lauk bergizi bisa menjadi pilihan yang praktis.", "Jika terbiasa melewatkan sarapan, mulailah dengan porsi kecil. Coba buah dan yogurt atau roti isi telur, lalu lihat pilihan yang paling cocok untukmu."] },
    { keys: ["obesitas", "gemuk"], texts: ["Obesitas biasanya terjadi karena asupan kalori lebih banyak daripada yang tubuh gunakan — sering dipicu makanan tinggi gula, lemak, dan kebiasaan kurang bergerak.", "Faktor lain seperti kurang tidur, stres, dan genetik juga bisa berperan. Karena itu perubahannya sebaiknya bertahap: atur porsi, pilih makanan less processed, dan rajin bergerak.", "Kalau ingin mulai menurunkan berat badan, lakukan perlahan dan kalau perlu konsultasikan ke tenaga kesehatan supaya aman dan sesuai kondisimu."] },
  ];

  const fallbackReplies = ["Aku bisa bantu soal pola makan sehat, minum air, olahraga, tidur, sarapan, dan obesitas. Coba tanyakan salah satunya, ya.", "Pertanyaan yang menarik. Untuk saat ini, aku paling siap membahas makan sehat, cukup minum, aktivitas fisik, tidur, sarapan, atau obesitas.", "Aku belum punya jawaban khusus untuk itu, tetapi kamu bisa pilih topik di bawah ini."];

  let lastReply = "";
  let sedangMenjawab = false; // ← kunci anti-spam: true selama bot "mengetik"

  // ================= SCROLL DI MANA PUN → GESER CHAT =================
  document.addEventListener("wheel", function (e) {
    // Kalau kursornya emang di dalam area pesan, biarkan default
    // (jangan dobel: sekali default, sekali dipaksa)
    if (messages.contains(e.target)) return;

    // Kursornya di luar area pesan (background putih, header, dll)
    // → cegah halaman ikut ke-scroll, lalu geser isi chat sesuai arahnya
    e.preventDefault();
    messages.scrollTop += e.deltaY;
  }, { passive: false });

  // ================= TYPING INDICATOR (gambar kotak-lengkung) =================
  function tampilkanTyping() {
    const typing = document.createElement("div");
    typing.className = "w-fit rounded-2xl rounded-bl-md shadow-sm";
    typing.id = "typing-indicator";

    typing.innerHTML = `
      <img
        src="../assets/vector/kotak-lengkung-muda.svg"
        alt="Sedang mengetik..."
        class="w-10 h-10 animate-spin"
      />
    `;

    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;
  }

  function hapusTyping() {
    const typing = document.getElementById("typing-indicator");
    if (typing) typing.remove();
  }

  // USER = pil pink di kanan | BOT = teks polos di kiri
  function addMessage(text, sender = "bot") {
    const bubble = document.createElement("p");
    bubble.className =
      sender === "user"
        ? "ml-auto w-fit max-w-[85%] rounded-[16px] bg-[#F8B0A9] px-5 py-2.5 text-[18px] text-white leading-relaxed"
        : "w-fit max-w-[85%] text-[18px] text-gray-700 leading-relaxed";
    bubble.textContent = text;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
  }

  // ================= REPLY (satu-satunya, dengan loading) =================
  function reply(question) {
    // Kalau bot masih "mengetik", abaikan pesan baru
    if (sedangMenjawab) return;
    sedangMenjawab = true;

    // Cari jawaban yang cocok berdasarkan kata kunci
    const normal = question.toLowerCase();
    const match = answers.find(({ keys }) => keys.some((key) => normal.includes(key)));
    const options = match ? match.texts : fallbackReplies;

    // Pilih jawaban acak (jangan sama dengan jawaban terakhir)
    let replyText = options[Math.floor(Math.random() * options.length)];
    if (options.length > 1 && replyText === lastReply)
      replyText = options[(options.indexOf(replyText) + 1) % options.length];
    lastReply = replyText;

    // 1. Tampilkan kotak-lengkung (bot "sedang mengetik")
    tampilkanTyping();

    // 2. Tunggu 1–1.5 detik, lalu ganti dengan jawaban asli
    const delay = 1000 + Math.random() * 500;
    setTimeout(function () {
      hapusTyping();
      addMessage(replyText);
      sedangMenjawab = false; // selesai, siap nerima pertanyaan lagi
    }, delay);
  }

  // Pil saran: warnanya muter — hijau, ungu, pink, hijau, ungu, ...
  const pillStyles = [
    "bg-[#F6FFE5] text-[#7E9C4F] border border-[#C6D4A9] hover:bg-[#C6D4A9]",
    "bg-[#F2D0FF] text-[#655A8C] border border-[#C2A6CC] hover:bg-[#C2A6CC]",
    "bg-[#FFAEAF] text-[#C0534B] border border-[#FF8385] hover:bg-[#FF8385]",
  ];

  suggestions.forEach((question, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = question;
    button.className =
      "rounded-[16px] px-5 py-3 text-sm font-medium transition " + pillStyles[index % pillStyles.length];
    button.addEventListener("click", () => {
      addMessage(question, "user");
      reply(question);
    });
    quickQuestions.appendChild(button);
  });

  // Pesan pembuka
  addMessage("Halo! Aku Teman Sehat gizy. Ada yang ingin kamu tanyakan tentang pola hidup sehat?");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question || sedangMenjawab) return; // gak bisa kirim pas bot ngetik
    addMessage(question, "user");
    input.value = "";
    input.disabled = true; // matikan input selama bot "mengetik"
    reply(question);
    setTimeout(() => {
      input.disabled = false;
      input.focus();
    }, 1500);
  });
});