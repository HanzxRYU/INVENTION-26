// ================= KEMBALI KE HERO SAAT HALAMAN DI-REFRESH =================

// 1. Matikan fitur browser yang \"mengingat\" posisi scroll terakhir
history.scrollRestoration = 'manual';

// 2. Hapus tanda # di URL (misal #faq) supaya tidak lompat ke section itu
if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname);
}

// 3. Tarik langsung ke paling atas (bagian hero)
window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

// 4. Jaga-jaga: ulangi lagi setelah semua gambar selesai dimuat,
//    karena gambar besar bisa menggeser posisi scroll
window.addEventListener('load', function() {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
});

// ================= NAVBAR SCROLL EFFECT =================
    const mainNav = document.getElementById('main-nav');
    const navContainer = document.getElementById('nav-container');
    const navLogo = document.getElementById('nav-logo');
    const navItems = document.querySelectorAll('.nav-item');

    // Jalankan fungsi ini setiap kali layar di-scroll
    window.addEventListener('scroll', function() {
        
        // Cek apakah posisi scroll sudah lebih dari 40 piksel
        if (window.scrollY > 40) {
            
            // --- TAMPILAN SAAT DI-SCROLL (KAPSUL PINK + BLUR) ---
            mainNav.classList.remove('top-0', 'py-5');
            mainNav.classList.add('top-4'); // Turun sedikit dari atas layar

            navContainer.classList.remove('max-w-5xl', 'px-4');
            navContainer.classList.add(
                'max-w-xl', 
                'px-6', 
                'py-3', 
                'bg-[#FFA2A2]/50',  /* Background pink transparan 85% */
                'backdrop-blur-md', /* Efek buram/blur pada elemen di belakangnya */
                'rounded-full',     /* Bentuk kapsul melengkung */
                'border', 
                'border-white/80',  /* Garis tepi putih */
                'shadow-lg'
            );

            // Ubah warna teks logo dan menu menjadi putih
            navLogo.classList.replace('text-black', 'text-white');
            navItems.forEach(item => {
                item.classList.remove('text-gray-600', 'hover:text-black');
                item.classList.add('text-white', 'hover:opacity-80');
            });

        } else {
            
            // --- TAMPILAN AWAL (KEMBALI TRANSPARAN & TEKS GELAP) ---
            mainNav.classList.remove('top-4');
            mainNav.classList.add('top-0', 'py-5');

            navContainer.classList.remove(
                'max-w-xl', 
                'px-6', 
                'py-3', 
                'bg-[#FFA2A2]/50', 
                'backdrop-blur-md', 
                'rounded-full', 
                'border', 
                'border-white/80', 
                'shadow-lg'
            );
            navContainer.classList.add('max-w-5xl', 'px-4');

            // Kembalikan warna teks logo dan menu ke warna awal
            navLogo.classList.replace('text-white', 'text-black');
            navItems.forEach(item => {
                item.classList.remove('text-white', 'hover:opacity-80');
                item.classList.add('text-gray-600', 'hover:text-black');
            });
        }
    });

    // ================= ANIMASI ANGKA (COUNT UP ON HOVER) =================
document.addEventListener('DOMContentLoaded', function() {
    const statCards = document.querySelectorAll('.card-stat');

    statCards.forEach(card => {
        const numberElement = card.querySelector('.stat-number');
        const targetNumber = parseInt(numberElement.getAttribute('data-target'));
        let timer = null;

        card.addEventListener('mouseenter', function() {
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
(function() {
    const beranda = document.getElementById('beranda');
    const masalah = document.getElementById('masalah');
    const spacer = document.getElementById('masalah-spacer');
    let isFixed = false;
    let rafId = null;

    function update() {
        // Hitung threshold: posisi scroll dimana seluruh Section 1 udah terlihat
        // = tinggi hero + tinggi section1 - tinggi layar
        const threshold = beranda.offsetHeight + masalah.offsetHeight - window.innerHeight;

        // Scroll sudah melewati seluruh section 1?
        const shouldFix = window.scrollY >= threshold;

        if (shouldFix !== isFixed) {
            if (shouldFix) {
                // Pasang spacer supaya layout tidak jeblog
                spacer.style.height = masalah.offsetHeight + 'px';
                masalah.classList.add('masalah-fixed');
                isFixed = true;
            } else {
                masalah.classList.remove('masalah-fixed');
                spacer.style.height = '0';
                isFixed = false;
            }
        }

        rafId = null;
    }

    window.addEventListener('scroll', function() {
        if (!rafId) {
            rafId = requestAnimationFrame(update);
        }
    }, { passive: true });

    // Update spacer kalau ukuran berubah (resize)
    window.addEventListener('resize', function() {
        if (isFixed) {
            spacer.style.height = masalah.offsetHeight + 'px';
        }
        // Re-check posisi
        if (!rafId) {
            rafId = requestAnimationFrame(update);
        }
    }, { passive: true });

    // ===== KLIK BERANDA → LANGSUNG SCROLL KE HERO =====
    document.querySelectorAll('a[href=\"#beranda\"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Langsung lepas fixed state kalau sedang aktif
            if (isFixed) {
                masalah.classList.remove('masalah-fixed');
                spacer.style.height = '0';
                isFixed = false;
            }
            // Smooth scroll ke hero
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

})();

// bagian kebutuhan kalori
// 1. DATA KEBUTUHAN GIZI (Berdasarkan AKG Indonesia - Disederhanakan untuk pemula)
    // Data ini yang menentukan angka dan panjang diagram batang.
    const dataGizi = {
        'laki': {
            '6-11': { kalori: 800, karbo: 50, lemak: 35, protein: 15, info: 'Usia MPASI awal. Fokus pada pengenalan tekstur makanan dan energi untuk merangkak/belajar berdiri. Lemak tinggi untuk perkembangan otak.' },
            '1-3':  { kalori: 1350, karbo: 55, lemak: 30, protein: 15, info: 'Anak sangat aktif bergerak, belajar jalan & bicara. Butuh energi stabil dari karbohidrat dan protein untuk pertumbuhan otot.' },
            '4-6':  { kalori: 1400, karbo: 55, lemak: 25, protein: 20, info: 'Masa prasekolah. Energi untuk bermain dan sosialisasi. Kebutuhan protein meningkat untuk daya tahan tubuh dan pertumbuhan tulang.' }
        },
        'perempuan': {
            '6-11': { kalori: 750, karbo: 50, lemak: 35, protein: 15, info: 'Usia MPASI awal. Pertumbuhan fisik cepat. Membutuhkan zat besi tinggi dari protein hewani dan lemak sehat.' },
            '1-3':  { kalori: 1200, karbo: 55, lemak: 30, protein: 15, info: 'Aktif bermain dan bereksplorasi. Lemak sehat mendukung kecerdasan, karbohidrat sebagai bahan bakar utamanya.' },
            '4-6':  { kalori: 1300, karbo: 55, lemak: 25, protein: 20, info: 'Persiapan sekolah. Kebutuhan gizi seimbang untuk konsentrasi belajar dan aktivitas fisik yang semakin beragam.' }
        }
    };

    // Variabel untuk menyimpan pilihan user (Default: Laki-laki)
    let genderAktif = 'laki';

    // 2. FUNGSI UNTUK MEMILIH GENDER (Diklik)
    function setGender(gender) {
        genderAktif = gender;
        
        // Hapus kelas 'active' dari semua tombol gender
        document.querySelectorAll('.gender-btn').forEach(btn => btn.classList.remove('active'));
        
        // Tambahkan kelas 'active' ke tombol yang diklik
        document.getElementById('btn-' + gender).classList.add('active');
        
        // Perbarui diagram
        updatePapaDiagram();
    }

    // 3. FUNGSI UTAMA UNTUK MENGUBAH TAMPILAN DIAGRAM
    function updatePapaDiagram() {
        // A. Ambil nilai umur dari dropdown
        const umurSelect = document.getElementById('umur-select');
        const umurAktif = umurSelect.value;

        // B. Ambil data yang tepat dari \"Gudang Data\" (dataGizi) di atas
        const dataPilihan = dataGizi[genderAktif][umurAktif];

        if(!dataPilihan) return;

        // 1. Ubah Teks Kalori
        document.getElementById('teks-kalori').innerHTML = `${dataPilihan.kalori} <span class=\"text-xl font-bold text-gray-700\">Kkal/hari</span>`;

        // 2. Ubah Panjang Diagram Batang (CSS Width)
        // Kita ubah style \"width\" nya secara otomatis
        document.getElementById('bar-karbo').style.width = dataPilihan.karbo + '%';
        document.getElementById('bar-lemak').style.width = dataPilihan.lemak + '%';
        document.getElementById('bar-protein').style.width = dataPilihan.protein + '%';

        // 3. Ubah Angka Persentase di Legenda
        document.getElementById('legenda-karbo').innerText = dataPilihan.karbo + '%';
        document.getElementById('legenda-lemak').innerText = dataPilihan.lemak + '%';
        document.getElementById('legenda-protein').innerText = dataPilihan.protein + '%';

        // 4. Ubah Teks Penjelasan Perkembangan
        document.getElementById('teks-perkembangan').innerText = dataPilihan.info;
    }

    // Menjalankan fungsi sekali saat halaman pertama kali dimuat agar data default muncul
    window.onload = updatePapaDiagram;