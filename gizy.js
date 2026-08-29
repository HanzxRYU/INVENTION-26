// 1. Ambil elemen HTML yang ingin diubah
    const mainNav = document.getElementById('main-nav');
    const navContainer = document.getElementById('nav-container');
    const navLogo = document.getElementById('nav-logo');
    const navItems = document.querySelectorAll('.nav-item');

    // 2. Jalankan fungsi ini setiap kali layar di-scroll
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