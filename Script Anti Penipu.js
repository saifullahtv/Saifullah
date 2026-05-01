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