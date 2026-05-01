<div style="max-width:900px;margin:auto;font-family:Arial, sans-serif;line-height:1.6;color:#333;">

<!-- Content --> <div style="border:1px solid #eee;padding:25px;border-radius:0 0 12px 12px;background:#fff;"> <h2>📌 Tentang Halaman Ini</h2> <p>Halaman ini berisi laporan dugaan penipuan online dari masyarakat. Gunakan sebagai referensi tambahan sebelum melakukan transaksi.</p> <h2>⚠️ Disclaimer</h2> <p style="background:#fff3cd;padding:15px;border-radius:8px;border:1px solid #ffeeba;"> Data di halaman ini merupakan laporan pengguna dan belum tentu benar secara hukum. Harap lakukan verifikasi mandiri. </p>

    <h2>📩 Kirim Laporan</h2>

    <form id="laporanForm" style="background:#fafafa;padding:20px;border-radius:10px;border:1px solid #eee;">
      
      <label><strong>Nama Terlapor (PENIPU):</strong></label><br> <input type="text" id="nama" placeholder="Contoh: Andi / Toko ABC" style="width:100%;padding:10px;margin-bottom:12px;border-radius:6px;border:1px solid #ccc;">

      <label><strong>Nomor yang dilaporkan:</strong></label><br> <input type="text" id="nomor" placeholder="08xxxxxxxxxx" style="width:100%;padding:10px;margin-bottom:12px;border-radius:6px;border:1px solid #ccc;">

      <label><strong>Alamat:</strong></label>
      <input type="text" id="alamat" placeholder="Contoh: Banjarmasin / Online Shop" style="width:100%;padding:10px;margin-bottom:12px;border-radius:6px;border:1px solid #ccc;">

      <label><strong>Modus penipuan:</strong></label><br> <input type="text" id="modus" placeholder="Contoh: Jual beli online" style="width:100%;padding:10px;margin-bottom:12px;border-radius:6px;border:1px solid #ccc;">

      <label><strong>Kronologi:</strong></label><br> <textarea id="kronologi" placeholder="Ceritakan singkat kejadian" style="width:100%;padding:0px 10px;margin-bottom:12px;border-radius:6px;border:1px solid #ccc;"></textarea>

      <label><strong>Tanggal:</strong></label>
      <input type="date" id="tanggal" style="width:100%;padding:10px;margin-bottom:15px;border-radius:6px;border:1px solid #ccc;">

      <button type="submit" style="font-weight:bold;background:#c62828;color:#fff;padding:0px 10px;border:none;border-radius:8px;width:100%;cursor:pointer;">🚀 Kirim Laporan</button>
    </form>

    <!-- Search -->
    <h2 style="margin-top:40px;">🔍 Cari Laporan</h2>
    <input type="text" id="search" placeholder="Cari nama, nomor, alamat, atau modus..." 
      style="width:100%;padding:10px;margin-bottom:20px;border-radius:8px;border:1px solid #ccc;">

    <!-- Hasil -->
    <h2>📊 Laporan Masuk</h2>
    <div id="hasilLaporan"></div>

  </div>
</div>


<script type="module">
  // 🔥 Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"; import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

  // 🔑 GANTI dengan config kamu
const firebaseConfig = {
  apiKey: "AIzaSyAXrTpa33eIYFGNOf1Xn_7lhbmFz8PmRk8",
  authDomain: "anti-penipu-e45e1.firebaseapp.com",
  projectId: "anti-penipu-e45e1",
  storageBucket: "anti-penipu-e45e1.firebasestorage.app",
  messagingSenderId: "648858270327",
  appId: "1:648858270327:web:0ac4973fa12262eee4e472",
  measurementId: "G-X7LL3KS48D"
};

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const form = document.getElementById('laporanForm');
  const hasil = document.getElementById('hasilLaporan');
  const search = document.getElementById('search');

  let semuaData = [];

  // 🔥 Tambah data ke database online
  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const newData = {
      nama: document.getElementById('nama').value || 'Tanpa Nama',
      nomor: document.getElementById('nomor').value,
      alamat: document.getElementById('alamat').value,
      modus: document.getElementById('modus').value,
      kronologi: document.getElementById('kronologi').value,
      tanggal: document.getElementById('tanggal').value,
      createdAt: new Date()
    };

    await addDoc(collection(db, "laporan"), newData);

    form.reset();
  });

  // 🔥 Ambil data realtime (auto update)
  const q = query(collection(db, "laporan"), orderBy("createdAt", "desc"));

  onSnapshot(q, (snapshot) => {
    semuaData = [];
    snapshot.forEach(doc => {
      semuaData.push(doc.data());
    });
    renderData();
  });

  function renderData(filter = '') {
    hasil.innerHTML = '';

    const filtered = semuaData.filter(item =>
      item.nama.toLowerCase().includes(filter) ||
      item.nomor.toLowerCase().includes(filter) ||
      item.alamat.toLowerCase().includes(filter) ||
      item.modus.toLowerCase().includes(filter)
    );

    if (filtered.length === 0) {
      hasil.innerHTML = '<p style="text-align:center;color:#999;">Data tidak ditemukan</p>';
      return;
    }

    filtered.forEach(item => {
      hasil.innerHTML += `
        <div style="background:#fff;margin-top:15px;padding:18px;border-radius:10px;border:1px solid #eee;">
          <h3 style="margin:0 0 10px;color:#c62828;">⚠️ ${item.nama}</h3>
          <p><strong>📞 Nomor:</strong> ${item.nomor}</p>
          <p><strong>📍 Alamat:</strong> ${item.alamat}</p>
          <p><strong>🛑 Modus:</strong> ${item.modus}</p>
          <p><strong>📝 Kronologi:</strong><br>${item.kronologi}</p>
          <p><strong>📅 Tanggal:</strong> ${item.tanggal}</p>
          <p><strong>Status:</strong> <span style="color:#ff9800;">Belum terverifikasi</span></p>
        </div>
      `;
    });
  }

  search.addEventListener('keyup', function() {
    renderData(this.value.toLowerCase());
  });

</script>
