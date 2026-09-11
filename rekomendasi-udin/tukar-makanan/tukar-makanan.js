// Data gizi perkiraan berdasarkan referensi umum TKPI & sumber gizi lain.
// Struktur: before (makanan biasa) -> after (alternatif lebih sehat)
const swapData = [
  {
    id: 'nasi',
    before: { name: 'Nasi Putih', portion: '100 gram (~1 centong)', kcal: 130, lemak: '0.3g', extraLabel: 'Serat', extra: '0.4g' },
    after:  { name: 'Nasi Merah', portion: '100 gram (~1 centong)', kcal: 111, lemak: '0.9g', extraLabel: 'Serat', extra: '1.8g' },
    tip: 'Nasi merah punya indeks glikemik lebih rendah dan serat lebih tinggi — bikin kenyang lebih lama dan gula darah lebih stabil.'
  },
  {
    id: 'mie',
    before: { name: 'Mie Instan Goreng', portion: '1 bungkus (85g)', kcal: 380, lemak: '14g', extraLabel: 'Natrium', extra: '1.330mg' },
    after:  { name: 'Mie Rebus + Telur + Sawi', portion: '1 porsi', kcal: 330, lemak: '9g', extraLabel: 'Protein', extra: '+8g' },
    tip: 'Rebus lebih rendah lemak dibanding goreng, dan tambahan telur + sayur bikin lebih mengenyangkan serta bergizi.'
  },
  {
    id: 'ayam',
    before: { name: 'Ayam Goreng Tepung', portion: '100 gram (1 potong)', kcal: 260, lemak: '14.5g', extraLabel: 'Protein', extra: '22g' },
    after:  { name: 'Ayam Panggang Tanpa Kulit', portion: '100 gram (1 potong)', kcal: 165, lemak: '4g', extraLabel: 'Protein', extra: '31g' },
    tip: 'Tanpa kulit dan tanpa digoreng, protein tetap tinggi tapi lemaknya jauh lebih rendah.'
  },
  {
    id: 'gorengan',
    before: { name: 'Bakwan Goreng', portion: '1 buah (~50g)', kcal: 150, lemak: '10g', extraLabel: 'Serat', extra: '1g' },
    after:  { name: 'Jagung Rebus', portion: '1 buah (~100g)', kcal: 96, lemak: '1.5g', extraLabel: 'Serat', extra: '2.7g' },
    tip: 'Direbus, bukan digoreng — hilangkan minyak berlebih sekaligus tambah serat alami.'
  },
  {
    id: 'sodaa',
    before: { name: 'Minuman Bersoda', portion: '1 kaleng (330ml)', kcal: 140, lemak: '0g', extraLabel: 'Gula', extra: '35g' },
    after:  { name: 'Air Kelapa Muda', portion: '1 gelas (250ml)', kcal: 40, lemak: '0g', extraLabel: 'Gula', extra: '6g' },
    tip: 'Rasa tetap segar, tapi gula tambahan jauh lebih rendah dan ada elektrolit alami.'
  },
  {
    id: 'esteh',
    before: { name: 'Es Teh Manis', portion: '1 gelas (250ml)', kcal: 90, lemak: '0g', extraLabel: 'Gula', extra: '22g' },
    after:  { name: 'Es Teh Tawar', portion: '1 gelas (250ml)', kcal: 5, lemak: '0g', extraLabel: 'Gula', extra: '0g' },
    tip: 'Butuh waktu buat terbiasa, tapi ini salah satu cara termudah mengurangi gula harian secara signifikan.'
  },
  {
    id: 'sosis',
    before: { name: 'Sosis Goreng', portion: '1 buah (50g)', kcal: 150, lemak: '12g', extraLabel: 'Natrium', extra: '~400mg' },
    after:  { name: 'Telur Rebus', portion: '1 butir (50g)', kcal: 78, lemak: '5g', extraLabel: 'Natrium', extra: '~62mg' },
    tip: 'Sumber protein yang lebih rendah natrium dan tanpa pengawet tambahan dari olahan daging.'
  },
  {
    id: 'kerupuk',
    before: { name: 'Kerupuk', portion: '5 keping (~15g)', kcal: 75, lemak: '4g', extraLabel: 'Serat', extra: '0.2g' },
    after:  { name: 'Edamame Rebus', portion: '30 gram', kcal: 60, lemak: '2.5g', extraLabel: 'Serat', extra: '2g' },
    tip: 'Camilan tetap gurih, tapi tambah protein dan serat dibanding kerupuk yang cuma karbohidrat dan minyak.'
  }
];

const $select = $('#food-select');
swapData.forEach(item => {
  $select.append(`<option value="${item.id}">${item.before.name}</option>`);
});

$select.on('change', function () {
  const val = $(this).val();
  if (!val) { $('#result-section').hide(); return; }
  const item = swapData.find(f => f.id === val);
  renderCompare(item);
});

function renderCompare(item) {
  $('#before-name').text(item.before.name);
  $('#before-portion').text(item.before.portion);
  $('#before-kcal').html(item.before.kcal + ' <span style="font-size:13px;">kkal</span>');
  $('#before-lemak').text(item.before.lemak);
  $('#before-extra-label').text(item.before.extraLabel);
  $('#before-extra').text(item.before.extra);

  $('#after-name').text(item.after.name);
  $('#after-portion').text(item.after.portion);
  $('#after-kcal').html(item.after.kcal + ' <span style="font-size:13px;">kkal</span>');
  $('#after-lemak').text(item.after.lemak);
  $('#after-extra-label').text(item.after.extraLabel);
  $('#after-extra').text(item.after.extra);

  const selisih = item.before.kcal - item.after.kcal;
  const persen = Math.round((selisih / item.before.kcal) * 100);
  $('#saving-banner').html(`Hemat <strong>${selisih} kkal</strong> (${persen}% lebih rendah) tiap kali kamu pilih alternatif ini`);
  $('#tip-text').html(`<i class="fa-solid fa-lightbulb"></i> ${item.tip}`);

  $('#result-section').fadeIn(200);
}