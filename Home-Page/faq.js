document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('chat-toggle');
    const close = document.getElementById('chat-close');
    const chatWindow = document.getElementById('chat-window');
    const form = document.getElementById('chat-form');
    const input = document.getElementById('chat-input');
    const messages = document.getElementById('chat-messages');
    const quickQuestions = document.getElementById('quick-questions');
    if (!toggle || !chatWindow || !form) return;

    const suggestions = ['Pola makan sehat', 'Berapa minum air?', 'Tips olahraga', 'Tidur yang cukup'];
    const answers = [
        { keys: ['makan', 'gizi', 'piring', 'diet'], texts: ['Coba susun piringmu: setengahnya sayur dan buah, seperempat protein seperti telur, ikan, atau tempe, lalu sisanya karbohidrat. Makan teratur juga sangat membantu.', 'Tidak perlu langsung mengubah semuanya. Mulai saja dengan menambah satu porsi sayur atau buah di setiap waktu makan, lalu kurangi makanan tinggi gula dan garam.', 'Pola makan sehat itu soal seimbang, bukan menahan lapar. Pilih makanan beragam, cukup protein, dan jangan lupa makan pada jam yang relatif teratur.'] },
        { keys: ['air', 'minum', 'haus'], texts: ['Kebanyakan orang membutuhkan sekitar 6 sampai 8 gelas air putih per hari. Saat cuaca panas atau banyak bergerak, tubuh biasanya perlu lebih banyak.', 'Biar tidak lupa minum, coba letakkan botol air di dekatmu dan minum sedikit-sedikit sepanjang hari. Air putih tetap pilihan yang paling baik.', 'Rasa haus adalah tanda awal tubuh butuh cairan. Kamu bisa mulai dengan satu gelas setelah bangun tidur dan satu gelas setiap selesai makan.'] },
        { keys: ['olahraga', 'gerak', 'latihan'], texts: ['Mulai dari yang ringan saja, misalnya jalan cepat, bersepeda, atau menari sekitar 30 menit. Aktivitas yang kamu nikmati biasanya lebih mudah dijadikan kebiasaan.', 'Tidak harus langsung ke gym. Naik tangga, jalan kaki saat istirahat, atau peregangan 5 menit juga termasuk cara untuk membuat tubuh lebih aktif.', 'Target yang nyaman adalah bergerak aktif sekitar 30 menit, 5 hari dalam seminggu. Kalau baru mulai, bagi menjadi sesi pendek pun tidak masalah.'] },
        { keys: ['tidur', 'istirahat', 'begadang'], texts: ['Untuk orang dewasa, tidur 7 sampai 9 jam per malam biasanya ideal. Coba tidur dan bangun pada jam yang sama agar tubuh lebih mudah beradaptasi.', 'Kalau sulit tidur, redupkan lampu dan jauhkan layar sekitar 30 menit sebelum tidur. Rutinitas kecil ini sering membuat kualitas istirahat lebih baik.', 'Istirahat cukup membantu energi, fokus, dan daya tahan tubuh. Hindari kopi terlalu sore dan buat kamar senyaman mungkin untuk tidur.'] },
        { keys: ['sarapan'], texts: ['Sarapan sederhana bisa berupa roti gandum dengan telur dan buah. Yang penting, ada sumber energi dan protein agar kamu lebih siap memulai hari.', 'Tidak perlu sarapan yang rumit. Oat, pisang, telur rebus, atau nasi dengan lauk bergizi bisa menjadi pilihan yang praktis.', 'Jika terbiasa melewatkan sarapan, mulailah dengan porsi kecil. Coba buah dan yogurt atau roti isi telur, lalu lihat pilihan yang paling cocok untukmu.'] }
    ];
    const fallbackReplies = ['Aku bisa bantu soal pola makan sehat, minum air, olahraga, tidur, dan sarapan. Coba tanyakan salah satunya, ya.', 'Pertanyaan yang menarik. Untuk saat ini, aku paling siap membahas makan sehat, cukup minum, aktivitas fisik, tidur, atau sarapan.', 'Aku belum punya jawaban khusus untuk itu, tetapi kamu bisa pilih topik makan, minum air, olahraga, tidur, atau sarapan di bawah ini.'];
    let lastReply = '';

    function addMessage(text, sender = 'bot') {
        const bubble = document.createElement('p');
        bubble.className = sender === 'user' ? 'ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-[#ef4444] px-4 py-2 text-sm leading-relaxed text-white' : 'w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-white px-4 py-2 text-sm leading-relaxed text-gray-700 shadow-sm';
        bubble.textContent = text;
        messages.appendChild(bubble);
        messages.scrollTop = messages.scrollHeight;
    }

    function reply(question) {
        const normal = question.toLowerCase();
        const match = answers.find(({ keys }) => keys.some((key) => normal.includes(key)));
        const options = match ? match.texts : fallbackReplies;
        let replyText = options[Math.floor(Math.random() * options.length)];
        if (options.length > 1 && replyText === lastReply) replyText = options[(options.indexOf(replyText) + 1) % options.length];
        lastReply = replyText;
        addMessage(replyText);
    }

    function openChat() { chatWindow.classList.remove('hidden'); toggle.setAttribute('aria-expanded', 'true'); input.focus(); }
    function closeChat() { chatWindow.classList.add('hidden'); toggle.setAttribute('aria-expanded', 'false'); }

    suggestions.forEach((question) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = question;
        button.className = 'rounded-full border border-red-200 bg-white px-3 py-1 text-xs font-medium text-red-500 transition hover:bg-red-50';
        button.addEventListener('click', () => { addMessage(question, 'user'); reply(question); });
        quickQuestions.appendChild(button);
    });

    addMessage('Halo! Aku Teman Sehat gizy. Ada yang ingin kamu tanyakan tentang pola hidup sehat?');
    toggle.addEventListener('click', openChat);
    close.addEventListener('click', closeChat);
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const question = input.value.trim();
        if (!question) return;
        addMessage(question, 'user');
        input.value = '';
        reply(question);
    });
});
