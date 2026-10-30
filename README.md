# Virtual Office Mini Player

Kantor virtual 3D yang jalan di browser. Kamu keluar dari lift, jalan ke ruang IT, lalu mengecek dashboard di TV, mereview merge request di meja, memadamkan "api" incident dengan APAR, atau JJ bareng rekan kerja. Semua data proyek (build, MR, task, incident) tampil sebagai objek di dalam ruangan.

- **Tanpa build step.** Satu `index.html` + dua file konfigurasi. three.js dan font diambil dari CDN.
- **Langsung jalan dengan data dummy.** Tidak butuh server, token, atau akun apa pun.
- **Bisa disambungkan ke data asli.** Ganti `data.mode` ke `'api'` dan sediakan endpoint sesuai [docs/API.md](docs/API.md).

## Menjalankan

Paling cepat: buka `index.html` langsung di browser (double-click). Butuh koneksi internet untuk memuat three.js dan font.

Lewat server lokal (disarankan, dan wajib kalau memakai lagu JJ sendiri):

```bash
python3 -m http.server 8080
# atau: npx serve .
```

lalu buka http://localhost:8080.

Bisa juga di-host sebagai situs statis (GitHub Pages, Netlify, Vercel, dan sejenisnya); cukup unggah isi folder ini.

## Kontrol

| Tombol | Fungsi |
|---|---|
| WASD / panah, klik lantai | Jalan (Shift = lari) |
| E · F | Interaksi dengan objek terdekat / terdekat kedua |
| Tab | HP: maps, pesan, quest, Ori |
| Ctrl/⌘ + K | Pindah cepat ke objek mana pun |
| V · G · T · L | Kamera follow/denah · grafis · waktu siang/senja/malam · label |
| O | Menu sambutan (office tour, pilih tujuan) |
| H | Bantuan lengkap di dalam game |
| J | JJ bareng rekan (dekati penari dulu) |

## Menyesuaikan

Semua yang biasanya ingin diganti ada di [`src/config.js`](src/config.js):

- `company`: nama di papan resepsionis, dinding lift, rambu, poster; `color` untuk logo.
- `office.floor`: nomor lantai di dinding lift dan teks sambutan.
- `values`: poster vision, mission, dan values di lorong.
- `npcs`: rekan kerja (nama, peran, kursi) dan panel yang terbuka saat diajak ngobrol, plus tampilannya: pakaian (`outfit`: kemeja, jas + dasi, blazer terbuka, rompi), gaya rambut (`hairStyle`: pendek, belah samping, disisir ke belakang, cepol, bob, topi, panjang), kacamata, warna dasi, hijab.
- `player.look`: tampilan karakter pemain, dengan opsi yang sama.
- `dancers`: dua rekan yang bisa diajak JJ.
- `links.grafana`: tautan dashboard monitoring (opsional).
- `audio.jjSong`: lagu JJ milikmu sendiri (lihat [assets/README.md](assets/README.md)).

Logo dibuat dari kode, bukan file gambar. Untuk memakai logo sendiri, ubah fungsi `drawLogo()` di `index.html`; semua papan nama dan poster memakai fungsi itu.

## Mode data

| `data.mode` | Sumber | Aksi tulis (merge, trigger build, solve incident) |
|---|---|---|
| `'mock'` (default) | [`src/mock-data.js`](src/mock-data.js), di memori browser | Selalu aktif, hanya mengubah data demo. Muat ulang = reset |
| `'api'` | `data.baseUrl` + route di [docs/API.md](docs/API.md) | Mati, kecuali `data.allowWrites: true` |

Data dummy memakai waktu relatif terhadap saat halaman dibuka, jadi grafik build 12 jam, task overdue, dan incident aktif selalu terlihat hidup.

Nama tool di dalam game (GitLab, Jenkins, Asana, Grafana, n8n) hanya label untuk jenis data. Mode demo tidak menghubungi layanan-layanan itu.

## Struktur

```
index.html          game: scene three.js, karakter, HUD, panel, quest, tour
src/config.js       perusahaan, lantai, nilai, rekan kerja, mode data
src/mock-data.js    data dummy + aksi tulis demo (bentuk JSON = docs/API.md)
docs/API.md         kontrak endpoint untuk mode 'api'
assets/             tempat file milikmu sendiri (lagu JJ, dll.), tidak ada file bawaan
```

## Kebutuhan browser

Browser modern dengan WebGL (Chrome, Edge, Firefox, Safari versi terbaru). Grafis turun otomatis ke Medium/Low kalau FPS rendah; bisa diatur manual dengan tombol G.

## Lisensi

[MIT](LICENSE). three.js (MIT) dan font Google Fonts (SIL OFL) dimuat dari CDN dan memakai lisensinya masing-masing.

Semua nama orang, perusahaan, project, dan data di repo ini fiktif.
