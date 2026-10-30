# Kebijakan keamanan

## Melaporkan celah keamanan

**Jangan** membuka issue publik untuk celah keamanan.

Laporkan secara privat lewat tab **Security → Report a vulnerability** di halaman repo GitHub ini (GitHub private vulnerability reporting). Sertakan:

- penjelasan celahnya dan dampaknya,
- langkah untuk mereproduksi,
- versi atau commit yang terdampak,
- saran perbaikan kalau ada.

Kami akan membalas dalam 7 hari dan memberi kabar perkembangan sampai perbaikannya dirilis. Nama pelapor dicantumkan di catatan rilis kalau yang bersangkutan berkenan.

## Ruang lingkup

Game ini adalah halaman statis. Di mode demo tidak ada data yang dikirim ke server mana pun. Hal yang paling relevan untuk dilaporkan:

- XSS: teks dari data (judul MR, nama task, isi incident) yang tidak di-escape saat ditampilkan,
- cara memuat skrip pihak ketiga (CDN) yang bisa disalahgunakan,
- masalah pada contoh backend atau kontrak di [docs/API.md](docs/API.md) yang mendorong praktik tidak aman, misalnya token di sisi browser.

Keamanan backend milikmu sendiri (mode `api`) adalah tanggung jawab backend tersebut. Simpan token di server, jangan di `src/config.js`.
