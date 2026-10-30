# Berkontribusi

Terima kasih sudah mau membantu.

Dengan berkontribusi, kamu setuju mengikuti [Code of Conduct](CODE_OF_CONDUCT.md). Laporkan celah keamanan lewat [SECURITY.md](SECURITY.md), bukan issue publik.

## Menjalankan saat mengembangkan

```bash
python3 -m http.server 8080
```

Buka http://localhost:8080 dan muat ulang setelah mengubah file. Tidak ada build step, linter, atau dependency yang perlu dipasang.

## Aturan

- **Jangan menambahkan data asli.** Nama orang, nama perusahaan, logo, URL internal, token, dan nama project kantor tidak boleh masuk repo. Pakai nama fiktif di `src/config.js` dan `src/mock-data.js`.
- **Jangan menambahkan file berhak cipta** seperti lagu, foto, atau logo milik pihak lain. Folder `assets/` sengaja kosong.
- **Bentuk data mengikuti [docs/API.md](docs/API.md).** Kalau menambah route baru, tambahkan juga contoh di `src/mock-data.js` dan dokumentasinya di `docs/API.md`, supaya mode demo tetap lengkap.
- **Tetap tanpa build step.** `src/config.js` dan `src/mock-data.js` sengaja berupa script biasa (bukan ES module) supaya `index.html` bisa dibuka langsung dari file.
- Ikuti gaya kode yang sudah ada: komentar singkat berbahasa Indonesia, tanpa titik koma.

## Sebelum membuka pull request

- Buka game, jalankan Office Tour sampai selesai, dan pastikan tidak ada error di console.
- Cek di layar lebar dan lebar ponsel (sekitar 390px).
- Cek dengan grafis Low (tombol G) kalau perubahanmu menyentuh scene 3D.
