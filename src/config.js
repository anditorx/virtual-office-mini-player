// Konfigurasi Virtual Office Mini Player.
// Ubah file ini untuk menyesuaikan nama perusahaan, lantai, nilai perusahaan, rekan kerja, dan sumber data.
// Semua nama orang dan perusahaan di bawah ini fiktif.
window.VO_CONFIG = {
  company: {
    name: 'ACME NUSANTARA',        // papan nama resepsionis & rambu panah
    legal: 'PT ACME NUSANTARA',    // huruf timbul di dinding depan lift
    short: 'ACME',                 // label kecil di poster, TV, dan HP
    color: '#1f8fbf',              // warna logo dummy (lihat drawLogo di index.html)
  },
  office: { floor: 12 },
  player: {
    name: 'Tamu',                  // nama awal pemain; bisa diganti di Rak Sepatu (disimpan di browser)
    look: { outfit: 'blazer', hairStyle: 'side' },   // tampilan karakter pemain, opsi sama dengan npcs di bawah
  },

  data: {
    // 'mock' = data dummy dari src/mock-data.js, tanpa server (default, cocok untuk demo/open source)
    // 'api'  = ambil dari server sendiri dengan kontrak di docs/API.md
    mode: 'mock',
    baseUrl: '',                   // prefix URL untuk mode 'api', mis. 'https://office-api.example.com'
    allowWrites: false,            // mode 'api': izinkan merge MR / trigger build / solve incident. Mode 'mock' selalu boleh (hanya mengubah data di browser)
    latency: [150, 700],           // mode 'mock': jeda acak (ms) supaya status "memuat" tetap terlihat
  },
  links: {
    grafana: null,                 // URL dashboard monitoring; null = tombol tidak ditampilkan
  },
  audio: {
    jjSong: null,                  // mis. 'assets/jj.mp3' (file milikmu sendiri). null = beat bawaan hasil sintesis
  },

  // poster di dinding nilai lorong (maksimal 5, urutan menentukan gambar poster)
  values: [
    { t: 'VISION · MISSION', d: 'Kantor digital yang menyenangkan untuk semua · Software yang rapi, cepat, dan bermanfaat' },
    { t: 'CURIOSITY', d: 'Selalu bertanya dan belajar hal baru. (Stay curious)' },
    { t: 'OWNERSHIP', d: 'Bertanggung jawab dari ide sampai produksi. (Own it end to end)' },
    { t: 'CRAFT', d: 'Kerjakan dengan teliti, ukur, lalu perbaiki terus. (Measure, improve, repeat)' },
    { t: 'KINDNESS', d: 'Saling bantu dan berbagi ilmu. (Lift each other up)' },
  ],

  // rekan kerja yang duduk di lantai.
  // n = nomor kursi (1–5 meja head kanan→kiri, 6–55 staff Table 5 → Table 1; kursi 14 = mejamu)
  // id + panel = rekan yang bisa diajak interaksi (panel: data, approval, insights, pipeline, incidents, review, release, docs, qa, asana)
  // verb: teks tombol interaksi, {first} diganti nama depan
  // tampilan: shirt (warna pakaian luar), pants, hair (warna rambut), skin, eyes, hijab (warna hijab), long (rambut panjang)
  //   outfit: 'shirt' kemeja · 'suit' jas tertutup · 'blazer' blazer terbuka · 'vest' rompi di atas kemeja
  //   inner: warna kemeja dalam · tie: warna dasi · glasses: true · belt: warna sabuk
  //   hairStyle: 'short' · 'side' · 'slick' · 'bun' · 'bob' · 'cap' (cap = warna topi) · 'long'
  npcs: [
    { n: 1, name: 'Nadia Putri', role: 'Data Analyst', status: '📊 dashboard · data warehouse', long: true, skin: '#e0b48e', id: 'data', panel: 'data', verb: 'Diskusi data dengan {first}', outfit: 'suit', shirt: '#1f2228', tie: '#1d1d1d', hairStyle: 'bun', hair: '#5a3522', glasses: true },
    { n: 2, name: 'Dimas Saputra', role: 'IT Platform Dept Head', status: '📂 7 MR menunggu approval', id: 'mr', panel: 'approval', verb: 'Cek MR approval di meja {first}', idle: true, outfit: 'suit', shirt: '#2a2d33', tie: '#1f3d8a', hairStyle: 'slick', hair: '#c9a46a', skin: '#e3b895' },
    { n: 3, name: 'Hendra Wijaya', role: 'IT Division Head', status: '📈 membaca laporan divisi', id: 'div', panel: 'insights', verb: 'Lapor ke Pak {first}', idle: true, outfit: 'suit', shirt: '#1b1c20', tie: '#c0392b', hairStyle: 'side', hair: '#d4d4d2', glasses: true },
    { n: 4, name: 'Bayu Anggara', role: 'IT Delivery Dept Head', status: '🧩 siapkan release 2026.21', pants: '#1f2330', id: 'pipeline', panel: 'pipeline', verb: 'Jalankan Pipeline Agent dengan {first}', outfit: 'blazer', shirt: '#3e6ea8', hairStyle: 'short', glasses: true },
    { n: 5, name: 'Fajar Nugraha', role: 'IT Operation Dept Head', status: '🛠 pantau operasional', id: 'ops', panel: 'incidents', verb: 'Bahas incident dengan {first}', idle: true, outfit: 'vest', shirt: '#9a8b7c', tie: '#1f3d8a', hairStyle: 'side', hair: '#3a2a20' },
    { n: 6, name: 'Raka', role: 'Software Engineer', status: '🔨 dev-raka · prepare-branch', shirt: '#3f7cc4', outfit: 'shirt', hairStyle: 'side' },
    { n: 7, name: 'Yoga', role: 'Software Engineer', status: '🔨 coding · incidents API', shirt: '#c4573f', outfit: 'shirt', hairStyle: 'short' },
    { n: 8, name: 'Gilang', role: 'Software Engineer Section Head', status: '👀 review MR !67', id: 'review1', panel: 'review', verb: 'Review MR bersama {first}', outfit: 'vest', shirt: '#4a5568', tie: '#7a1f2b', hairStyle: 'side' },
    { n: 9, name: 'Iqbal', role: 'Security Engineer', status: '🛡 security scan · SAST', shirt: '#1f1f24', outfit: 'shirt', hairStyle: 'short', glasses: true },
    { n: 10, name: 'Dede', role: 'DevOps Engineer', status: '🚀 deploy · develop', shirt: '#4a5468', id: 'release', panel: 'release', verb: 'Buka Release Console di meja {first}', outfit: 'shirt', hairStyle: 'slick' },
    { n: 11, name: 'Salsa', role: 'Technical Writer', status: '📝 menulis TSD', shirt: '#8a6fb0', hijab: '#e9d7c0', skin: '#e0b48e', id: 'writer', panel: 'docs', verb: 'Tanya dokumentasi ke {first}', outfit: 'blazer', inner: '#f3eee6' },
    { n: 12, name: 'Kirana', role: 'Software Engineer', status: '🔨 coding · web-portal', long: true, skin: '#e0b48e', outfit: 'shirt', shirt: '#f2f1ec', hairStyle: 'cap', hair: '#6b4128', glasses: true },
    { n: 13, name: 'Arif', role: 'Software Engineer Section Head', status: '👀 review MR !41', id: 'review2', panel: 'review', verb: 'Review MR bersama {first}', outfit: 'blazer', shirt: '#2f3a4a', hairStyle: 'side', glasses: true },
    { n: 15, name: 'Tegar', role: 'Software Engineer', status: '🔨 coding · billing-api', shirt: '#d08a2a', outfit: 'shirt', hairStyle: 'short' },
    { n: 30, name: 'Rendi Kurniawan', role: 'QA Section Head', status: '🧪 UAT · web-portal', id: 'qa', panel: 'qa', verb: 'Cek UAT dengan {first}', outfit: 'vest', shirt: '#6b7a5a', tie: '#1f3d8a', hairStyle: 'short', glasses: true },
    { n: 43, name: 'Maya Lestari', role: 'Project Manager', status: '📅 sprint S-2026.21', hijab: '#3d5a80', skin: '#e0b48e', id: 'pm', panel: 'asana', verb: 'Bahas sprint dengan {first}', outfit: 'suit', shirt: '#2a2d34' },
  ],
  // dua rekan yang bisa diajak JJ (tekan J di dekatnya); harus sama persis dengan name di npcs
  dancers: ['Kirana', 'Salsa'],
}
