// Batas konsumsi harian sesuai Permenkes No. 30 Tahun 2013 tentang GGL
const BATAS_HARIAN = {
  gula: 50,      // gram
  natrium: 2000, // mg
  lemak: 67      // gram
};

function klasifikasi(persen) {
  if (persen < 10) return { label: 'Rendah', cls: 'lvl-rendah' };
  if (persen <= 30) return { label: 'Sedang', cls: 'lvl-sedang' };
  return { label: 'Tinggi', cls: 'lvl-tinggi' };
}

function buatKartu(nama, nilai, satuan, batas) {
  const persen = Math.round((nilai / batas) * 100);
  const kat = klasifikasi(persen);
  return `
    <div class="result-card ${kat.cls}">
      <h3>${nama}</h3>
      <div class="value">${nilai}${satuan}</div>
      <span class="level">${kat.label}</span>
      <p class="pct">${persen}% dari batas harian</p>
    </div>
  `;
}

$('#btn-cek').on('click', function () {
  const gula = parseFloat($('#input-gula').val()) || 0;
  const natrium = parseFloat($('#input-natrium').val()) || 0;
  const lemak = parseFloat($('#input-lemak').val()) || 0;

  if (!$('#input-gula').val() && !$('#input-natrium').val() && !$('#input-lemak').val()) {
    alert('Isi minimal salah satu angka dari label kemasan ya.');
    return;
  }

  const cardsHtml =
    buatKartu('Gula', gula, 'g', BATAS_HARIAN.gula) +
    buatKartu('Garam/Natrium', natrium, 'mg', BATAS_HARIAN.natrium) +
    buatKartu('Lemak', lemak, 'g', BATAS_HARIAN.lemak);

  $('#result-cards').html(cardsHtml);

  const persenGula = (gula / BATAS_HARIAN.gula) * 100;
  const persenNatrium = (natrium / BATAS_HARIAN.natrium) * 100;
  const persenLemak = (lemak / BATAS_HARIAN.lemak) * 100;
  const maxPersen = Math.max(persenGula, persenNatrium, persenLemak);

  let banner;
  if (maxPersen > 30) {
    banner = `<i class="fa-solid fa-triangle-exclamation" style="color:#D9483A;"></i>
      <div><strong>Salah satu kandungan cukup tinggi untuk satu sajian.</strong><br>
      Kalau kamu makan lebih dari satu sajian, sisihkan ruang untuk gula/garam/lemak dari makanan lain hari ini.</div>`;
    $('#overall-banner').css('background', '#FCE7E5');
  } else if (maxPersen > 10) {
    banner = `<i class="fa-solid fa-circle-info" style="color:#D98E14;"></i>
      <div><strong>Masih dalam batas wajar, tapi tetap perhatikan porsinya.</strong><br>
      Cocok dikonsumsi sesekali, bukan jadi kebiasaan harian dalam jumlah besar.</div>`;
    $('#overall-banner').css('background', '#FDF1DD');
  } else {
    banner = `<i class="fa-solid fa-circle-check" style="color:#3FA66B;"></i>
      <div><strong>Kandungan gula, garam, dan lemaknya cukup rendah.</strong><br>
      Aman dikonsumsi dalam pola makan harianmu.</div>`;
    $('#overall-banner').css('background', '#E6F5EC');
  }
  $('#overall-banner').html(banner);

  $('#result-section').fadeIn(200);
  $('#result-section')[0].scrollIntoView({ behavior: 'smooth' });
});