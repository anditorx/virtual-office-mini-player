# assets/

Folder ini sengaja kosong. Repo tidak menyertakan lagu, gambar, atau file berhak cipta lainnya.

## Lagu JJ sendiri

1. Taruh file audio milikmu di sini, misalnya `assets/jj.mp3`.
2. Isi `audio.jjSong: 'assets/jj.mp3'` di `src/config.js`.
3. Jalankan lewat server lokal (`python3 -m http.server`), karena browser memblokir pemuatan file audio dari `file://`.

Tanpa langkah di atas, JJ memakai beat bawaan yang disintesis dengan Web Audio. Pemain juga bisa memilih lagu dari perangkatnya sendiri lewat menu JJ (tekan J di dekat penari); lagu itu hanya tersimpan di browser mereka.

File audio di folder ini diabaikan git (lihat `.gitignore`) supaya tidak ikut ter-commit tanpa sengaja.
