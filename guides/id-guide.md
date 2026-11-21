---
layout: default
title: Kerusakan Sensor Hall HP Victus 16 dan Solusinya (FU6) - Panduan Bahasa Indonesia
permalink: /id-guide/
lang: id
description: Diagnosis dan perbaikan sensor efek Hall (Toshiba TCS40DLR, LA8) dan sekring FU6 pada HP Victus 16, dengan Allegro A1126 sebagai pengganti.
---
<div align="center">
  <h1>HP Victus 16: Kerusakan Sensor Efek Hall dan Solusinya</h1>
  <p><b>Buğra Güngöz</b><br><i>EEE</i></p>
</div>

**Penggunaan:** Boleh dikutip selama sumbernya dicantumkan; tidak boleh digunakan untuk tujuan komersial. Jika ada pertanyaan atau pendapat, Anda dapat menghubungi saya di gungozb@gmail.com.

**PERINGATAN:** *Modifikasi perangkat keras dalam dokumentasi ini membutuhkan keterampilan menyolder tingkat SMD, kemampuan membaca skematik, dan pengetahuan tentang pengukuran listrik. Tanggung jawab atas kemungkinan kerusakan perangkat keras, kehilangan data, atau cedera yang dapat terjadi saat menerapkan informasi di sini sepenuhnya berada pada masing-masing orang. Setiap intervensi fisik akan menghentikan garansi pabrik perangkat Anda. Selama semua pekerjaan, perangkat wajib dalam keadaan tidak bertegangan dan konektor baterai harus dilepas. Karena kemasan komponen SMD sangat kecil dan area kerja pada papan sempit, Anda harus sangat berhati-hati agar tidak merusak komponen lain. Pengukuran tegangan dalam keadaan bertegangan yang disebutkan dalam panduan ini adalah satu-satunya pengecualian dan harus dilakukan dengan tindakan pencegahan yang disebutkan pada langkah-langkah tersebut.*

*SAYA TIDAK BERTANGGUNG JAWAB DALAM BENTUK APA PUN ATAS AKIBAT DARI PEKERJAAN YANG ANDA LAKUKAN DENGAN SALAH!*

*Versi ini adalah terjemahan. Versi acuan adalah [naskah asli berbahasa Inggris]({{ '/en-guide/' | relative_url }}).*

---

<!-- slot:intro -->

## 1. Pendahuluan
Artikel ini membahas analisis dan cara perbaikan kerusakan sensor efek Hall yang terutama muncul saat beban panas tinggi pada laptop seri HP Victus 16 (khususnya varian s0 dan r0), dengan gejala khas seperti sistem tiba-tiba mati, layar hitam, perangkat keras macet, dan layar berkedip. Penyebab utama kerusakan ini adalah sensor efek Hall bawaan yang sebenarnya tidak cocok secara termal dengan desainnya, serta sebuah sekring pada jalur suplai yang mengalami degradasi termal akibat desain termal yang kurang baik. Alasan mengapa sensor bawaan menjadi tidak stabil secara termal akibat desain ini akan dijelaskan pada bagian-bagian berikutnya. Masalah terjadi ketika chip EC terpicu secara keliru oleh sensor efek Hall, sehingga sistem mengira layar laptop sedang ditutup lalu mematikan lampu latar keyboard dan layar. Karena rangkaian sensor yang bekerja tidak stabil di bawah tekanan termal terus memicu EC secara keliru, lampu latar layar dan keyboard menyala dan mati pada selang waktu acak atau berkedip.

Sumber-sumber yang digunakan dalam dokumentasi ini dapat dilihat pada daftar pustaka di akhir dokumen. Sumber-sumber tersebut menyebutkan dua metode solusi utama; dokumentasi ini berfokus pada penerapan keduanya secara bersamaan, dan alasan mengapa keduanya diperlukan akan dijelaskan pada bagian berikutnya. Saya menerapkan sendiri semua langkah dalam dokumentasi ini pada komputer saya; perbaikannya belum terlalu lama, tetapi saya sudah tidak mengalami masalah apa pun. Saya membebani komputer dalam waktu lama dengan uji stres termal dan semuanya berjalan normal; saya dapat mengatakan bahwa masalahnya sudah teratasi.

---

## 2. Diagnosis
Jika lampu latar keyboard dalam keadaan mati, menyalakannya akan membantu untuk mengamati masalah ini dengan lebih baik dan menyadari bahwa masalahnya bukan hanya pada layar. Sayangnya, tidak ada solusi perangkat lunak. Saya membersihkan sepenuhnya driver kartu grafis internal maupun eksternal dengan DDU lalu memasangnya ulang dari awal, memperbarui BIOS, dan selain itu saya memang tidak berpikir ada solusi perangkat lunak di tingkat yang lebih tinggi, jadi tidak perlu membuang waktu dengan menginstal ulang sistem operasi. Tidak ada yang berhasil. Masalah tetap ada meskipun opsi "Do nothing" (Tidak melakukan apa pun) dipilih untuk penutupan layar di pengaturan daya Windows. Karena meskipun sudah mencoba semua itu saya masih mengalami gejala seperti layar berkedip serta lampu latar layar dan keyboard yang menyala-mati, saya yakin bahwa masalah saya adalah kerusakan sensor efek Hall.

Penyebab utama kerusakan ini adalah degradasi termal dan ketidakstabilan termal. Namun, tekanan termal ini tidak hanya memengaruhi sensor efek Hall; tekanan ini juga merusak sebuah sekring pada jalur suplai sensor efek Hall sehingga sekring tersebut mengalami degradasi termal dan resistansinya meningkat. Sensor bawaannya adalah Toshiba TCS40DLR berkode LA8, dan data lembar data (datasheet) mengenai kondisi operasinya tersedia di bawah ini.

<img alt="Kondisi operasi Toshiba TCS40DLR" src="https://github.com/user-attachments/assets/eedd46d0-9ef8-4678-9d09-5715da7cb701" loading="lazy" />

Suhu operasi maksimumnya sangat terbatas untuk sebuah laptop gaming. Bahkan, Toshiba mencantumkan sebuah catatan terkait hal ini di dalam datasheet:

<img alt="Catatan keandalan pada datasheet Toshiba" src="https://github.com/user-attachments/assets/1dad43f2-c007-4554-bb62-81e7b429138a" loading="lazy" />

Kesimpulannya, modifikasi perangkat keras apa pun yang dilakukan, sensor ini bukan pilihan yang tepat untuk desain laptop ini; penggantian dengan sensor lain yang lebih tahan suhu tinggi mutlak diperlukan. Bypass sekring pada jalur suplai sensor yang akan saya bahas sebentar lagi tidak akan cukup jika dilakukan sendirian; setelah beberapa waktu, sensor bawaan akan kembali bekerja tidak stabil akibat tekanan termal.

---

## 3. Solusi
Sensor efek Hall bukan satu-satunya sumber masalah; seperti yang saya sebutkan di atas, rusaknya sebuah sekring pada jalur suplai sensor ini juga menjadi penyebab. Kerusakan ini tidak muncul sebagai rangkaian terbuka seperti sekring putus pada umumnya, melainkan sebagai kenaikan resistansi setelah degradasi termal, sehingga menyebabkan ketidakstabilan pada jalur suplai. Untuk memastikan apakah sekring ini benar-benar rusak, Anda dapat melakukan pengukuran resistansi (hasilnya tidak pasti tanpa melepas sekring dari rangkaian, tetapi saya tidak melihat resistor paralel pada sekring ini; jika probe ditahan cukup lama, hasilnya dapat mendekati nilai sebenarnya) atau pemeriksaan dalam mode kontinuitas. Hasil pengukuran resistansi saya pada rangkaian adalah 260 ohm. Nilai ini dapat berubah tergantung pada kelelahan termal. Pada uji kontinuitas saya tidak mendengar bunyi buzzer, multimeter tetap menunjukkan 260 ohm. Berdasarkan hasil pengukuran saya, sekring ini jelas telah kehilangan fungsi utamanya dan sekarang menjadi resistansi pada jalur. Namun, resistansi ini akan berubah sesuai kondisi kerusakannya, artinya resistansi sekring akan terus meningkat akibat tekanan termal.

<!-- slot:diagram -->

Masalah sebenarnya adalah tegangan jalur suplai sensor efek Hall yang anjlok akibat kenaikan resistansi ini. Dalam sumber-sumber rujukan, modifikasi seperti menarik jalur dari suplai sensor IR untuk suplai sensor Hall dilakukan karena alasan ini, tetapi hal tersebut tidak diperlukan. Dalam artikel ini, bypass sekring yang telah rusak ini dijelaskan sebagai solusi yang lebih rapi. Saat rangkaian bertegangan, saya mengukur penurunan tegangan 30 mV pada sekring (di sini harus berhati-hati, kontak probe yang salah pada rangkaian dapat menyebabkan korsleting); jika resistansi sekring lebih tinggi lagi, penurunan ini akan lebih besar dan tegangan jalur suplai sensor akan anjlok. Hal terpenting adalah bahwa dengan sekring yang rusak ini, karena arus kerja sensor Allegro yang saya pasang lebih tinggi, tegangan jalur akan turun lebih jauh dan sensor baru juga akan bekerja tidak stabil. Karena itu, mengganti sensor saja tidak akan cukup; agar jalur suplai stabil, sekring wajib di-bypass.

Mem-bypass sekring mungkin terlihat sebagai pendekatan yang berbahaya. Tugas sekring ini adalah melindungi jalur 3V3 jika terjadi korsleting pada papan sensor atau pada kabel FFC yang menghubungkannya ke motherboard; artinya, perlindungan ini seharusnya tidak pernah bekerja kecuali ada kerusakan fisik pada papan sensor (kabel tergencet, jembatan solder, terkena cairan, dan sebagainya). Bahkan dalam kasus seperti itu, perlindungan tetap ada karena rangkaian regulator di bagian suplai memiliki proteksi arus lebih sendiri untuk jalur 3V3. Namun, karena ambang proteksi regulator berada di kisaran ampere, korsleting sebagian yang berada di bawah ambang tersebut dapat memanaskan kabel dan jalur tembaga yang tipis; bagi yang ingin menghilangkan risiko ini sepenuhnya, dapat memasang sekring baru dengan rating yang sesuai sebagai ganti bypass. Selain itu, perlu dicatat bahwa proteksi korsleting yang disebutkan dalam datasheet sensor Allegro adalah milik pin keluaran sensor; proteksi ini melindungi transistor keluaran, bukan jalur suplai. Dengan kata lain, keamanan bypass bergantung pada proteksi regulator, bukan pada proteksi ini. Karena artikel ini menyajikan solusi yang lengkap, saya merasa tidak perlu membahas gejala dan solusi alternatif lainnya. Jika Anda tidak dapat menerapkan langkah-langkah di sini dan mencari solusi yang lebih mudah, Anda dapat mencoba beberapa solusi sederhana yang disebutkan setelah mempelajari tautan di daftar pustaka dengan saksama.

Sebagai sensor efek Hall yang baru, saya menggunakan Allegro A1126. Saya memilih komponen ini karena dapat memperolehnya dengan cepat dan mudah; sensor yang sesuai dari merek atau model lain juga dapat dipilih dengan membandingkan datasheet sensor bawaan dengan sensor yang akan dibeli. Allegro A1126 adalah komponen kelas otomotif dan secara termal jauh lebih tahan dibandingkan sensor bawaan. Selain itu, seperti yang saya sebutkan di atas, sensor ini memiliki fitur seperti keluaran yang terlindung dari korsleting. Perbedaan paling mencolok dari sensor Toshiba adalah cara sensor ini menarik arus. Sensor Toshiba tidak menarik arus secara terus-menerus; seperti disebutkan dalam datasheet-nya, rangkaian internalnya menarik arus dalam bentuk pulsa periodik. Nilai 1,2 mA yang diberikan untuk 3,3 V adalah nilai puncak pulsa tersebut, sedangkan arus rata-ratanya jauh di bawahnya. Hasil pengukuran saya juga membenarkan hal ini: dengan sensor bawaan terpasang, saya mengukur penurunan tegangan 30 mV pada sekring dan 260 ohm untuk sekringnya, sehingga arus rata-ratanya adalah 30 mV / 260 Ω ≈ 115 µA (jika 1,2 mA ditarik terus-menerus, penurunannya akan menjadi 312 mV). Sebaliknya, sensor Allegro adalah sensor dengan stabilisasi chopper yang menarik arus secara terus-menerus, dan datasheet-nya menyebutkan arus suplai maksimum 4 mA. Dengan sekring rusak yang sama, dalam kondisi terburuk akan terjadi penurunan 4 mA × 260 Ω ≈ 1,04 V pada sekring, artinya hanya sekitar 2,26 V yang sampai ke sensor, jauh di bawah tegangan suplai minimumnya yaitu 3 V. Jika dilihat dari arah sebaliknya, margin 0,3 V antara 3,3 V dan 3 V dengan sekring 260 ohm hanya cukup hingga arus 0,3 V / 260 Ω ≈ 1,15 mA; datasheet tidak menjamin bahwa sensor akan tetap di bawah arus ini, dan karena resistansi sekring meningkat akibat tekanan termal, batas ini akan turun lebih jauh lagi (sensor bawaan masih dapat menoleransi sekring yang rusak untuk sementara karena dapat bekerja hingga 2,3 V; sensor Allegro tidak memiliki margin ini). Oleh karena itu, tanpa bypass sekring, sensor baru tidak dapat bekerja dengan stabil.

Saat laptop bekerja dengan beban, suhunya akan jauh lebih tinggi, tetapi data datasheet sensor efek Hall Toshiba bawaan pada kondisi nominal adalah sebagai berikut:

Tabel yang menunjukkan kebutuhan 1,2 mA pada 3,3 V untuk sensor Toshiba:

<img alt="Konsumsi arus Toshiba TCS40DLR" src="https://github.com/user-attachments/assets/2728d3a7-d420-4dde-bd3e-52f6d03ddd70" loading="lazy" />

Data datasheet untuk sensor Allegro adalah sebagai berikut:

Tabel yang menunjukkan tegangan suplai minimum, nilai maksimum pembatas arus, dan arus suplai dalam kondisi kerja untuk sensor Allegro:

<img alt="Karakteristik listrik Allegro A1126" src="https://github.com/user-attachments/assets/4565e1dc-3f7f-47f6-b414-031f3b0ae486" loading="lazy" />

Cuplikan bagian deskripsi datasheet sensor Allegro yang memuat teks tentang proteksi arus lebih:

<img alt="Teks deskripsi datasheet Allegro A1126" src="https://github.com/user-attachments/assets/af264158-5024-42a5-87cf-1398ab47dae9" loading="lazy" />

Tabel yang menunjukkan rentang suhu operasi sensor Allegro:

<img alt="Rentang suhu operasi Allegro A1126" src="https://github.com/user-attachments/assets/1a727310-dff8-43d0-9b88-8aa4e556ccbe" loading="lazy" />

Terlihat bahwa tegangan suplai minimum sensor Allegro adalah 3 V. Karena itu, jalur suplai sensor wajib stabil; sekring yang rusak (atau yang pasti akan rusak seiring waktu akibat tekanan termal) pada jalur suplai harus di-bypass (jika komponen baru yang dipasang tidak memiliki ketahanan suhu yang tinggi, komponen itu juga akan mengalami degradasi termal dengan cara yang sama) agar tegangan jalur tidak pernah anjlok (margin untuk penurunan tegangan maksimum memang hanya 0,3 V). Selain itu, seperti disebutkan dalam teks deskripsi datasheet sensor, terdapat pembatasan arus 60 mA. Batas ini berlaku untuk arus keluaran sensor, artinya jika terjadi korsleting pada jalur keluaran yang menuju EC, keluaran sensor akan melindungi dirinya sendiri. Seperti terlihat, batas atas suhu operasi sensor Allegro adalah 150 °C, yaitu 65 °C lebih tinggi daripada batas atas sensor bawaan yang 85 °C.

Pin sensor bawaan dan sensor baru sepenuhnya kompatibel, artinya sensor lama dapat dilepas dan sensor baru dapat langsung disolder di tempatnya; sensor Toshiba menggunakan kemasan SOT-23F, sedangkan sensor Allegro menggunakan kemasan SOT-23W, dan kedua kemasan tersebut kompatibel satu sama lain.

Susunan pin sensor Toshiba:

<img alt="Susunan pin Toshiba TCS40DLR" src="https://github.com/user-attachments/assets/78919efa-1adc-40e4-9c5b-60211b4ee484" loading="lazy" />

Susunan pin sensor Allegro:

<img alt="Susunan pin Allegro A1126" src="https://github.com/user-attachments/assets/b57c2697-5b96-42e7-849d-b27661cbcc0e" loading="lazy" />

Untuk mengakses papan tempat sensor berada, langkah-langkah dalam panduan perawatan HP dapat diikuti:

Gambar yang menunjukkan semua kabel yang harus dilepas terlebih dahulu agar motherboard dapat dibongkar:

<img alt="Kabel yang harus dilepas sebelum membongkar motherboard" src="https://github.com/user-attachments/assets/bfaacb83-548e-4ca1-b132-b8ab5a3ff457" loading="lazy" />

Gambar yang menunjukkan pembongkaran motherboard:

<img alt="Pembongkaran motherboard" src="https://github.com/user-attachments/assets/4f52088a-cd33-4b4f-aa14-c7c042a5c140" loading="lazy" />

Gambar yang menunjukkan pembongkaran papan tempat sensor Hall berada:

<img alt="Pembongkaran papan sensor Hall" src="https://github.com/user-attachments/assets/6237f31e-8dce-45ea-9878-38d4f6b2ae4d" loading="lazy" />

Seperti terlihat, seluruh motherboard harus dilepas dari tempatnya untuk mengakses papan tempat sensor efek Hall berada. Untuk semua langkah sampai di sini, dokumen panduan perawatan dan servis HP perlu dipelajari dengan saksama. Tautannya tersedia di daftar pustaka.

Papan sensor Hall (sisi sensor IR):

<img alt="Papan sensor Hall, sisi sensor IR" src="https://github.com/user-attachments/assets/22240520-363c-4405-bb39-cab0ff47f7e1" loading="lazy" />

Papan sensor Hall (sisi sensor Hall):

<img alt="Papan sensor Hall, sisi sensor Hall" src="https://github.com/user-attachments/assets/0b367bbf-e471-4a2d-8a5c-6cf2ab95c79f" loading="lazy" />

Gambar papan sensor dapat dilihat di atas; versi dengan resolusi lebih tinggi tersedia melalui tautan yang saya berikan di bawah.

Gambar dekat papan sensor Hall (sisi sensor Hall):

<img alt="Gambar dekat papan sensor Hall" src="https://github.com/user-attachments/assets/7465b064-9eb6-45aa-98ec-f5dcc1c6e522" loading="lazy" />

Sensor Toshiba dapat dilepas dengan hot air rework station atau solder biasa, lalu sensor Allegro dapat langsung dipasang:

Papan sensor Hall (sisi sensor Hall) setelah diganti dengan A1126:

<img alt="Papan sensor Hall dengan A1126 terpasang" src="https://github.com/user-attachments/assets/3c141737-f8c9-4d9d-97e5-86d09733c698" loading="lazy" />

Seperti terlihat, ada dua kapasitor yang sangat dekat dengan sensor; karena kemasannya sangat kecil, akan sulit menyoldernya kembali jika tidak sengaja terlepas. Selain itu, jika menggunakan udara panas, soket JIR2 dapat meleleh atau rusak karena panas. Karena itu, sebelum pengerjaan, area di sekitar sensor dan soket yang rawan rusak harus ditutup dengan selotip Kapton. Setelah penggantian, satu atau dua lapis selotip Kapton dapat ditempelkan di atas sensor untuk memperkuat secara fisik. Sebagai langkah tambahan, blok isolasi tipis juga dapat dibuat dengan menyisipkan selotip teflon di antara lapisan selotip Kapton; saya sudah mencobanya, blok ini hampir tidak menghantarkan panas dari satu sisi ke sisi lainnya. Namun, blok ini hanya mengurangi panas yang datang ke sensor dari arah atas; blok ini tidak dapat menahan panas yang datang melalui jalur tembaga dan pin pada papan. Karena ketahanan suhu sensor Allegro sudah cukup tinggi, langkah ini tidak wajib untuknya; langkah ini dapat dianggap sebagai perlindungan tambahan sederhana bagi yang tetap menggunakan sensor bawaan, atau untuk sekring baru atau resistor 0 ohm yang dipasang sebagai pengganti FU6 (jika diterapkan di atas FU6, pastikan tidak menghalangi heatsink terpasang dengan benar). Blok ini harus tetap tipis; jika terlalu tebal, blok akan menonjol di antara papan sensor dan motherboard serta menekan papan. Pekerjaan pada papan sensor selesai sampai di sini.

Untuk mengerjakan sekring yang disebutkan, papan sensor harus dipasang kembali, motherboard dipasang kembali, lalu pipa pendingin tembaga harus dilepas. Area tersebut dapat dilihat tanpa melepas pipa tembaga, dan pengukuran resistansi, kontinuitas, serta tegangan yang diperlukan dapat dilakukan, tetapi untuk mengerjakannya heatsink wajib dilepas. Setelah sekrup heatsink dilepas, heatsink harus diangkat tegak lurus dengan hati-hati; thermal putty jangan disentuh jika masih lunak (jika sudah kering dan rapuh, harus diganti). Karena blok pendingin sudah diangkat, pasta termal wajib diganti, dan saat pipa tembaga dipasang kembali, sekrup harus dikencangkan sesuai urutannya.

Sekring ini bernama FU6 dan terletak tepat di sebelah soket JIR1, tempat papan sensor Hall dan IR terhubung ke motherboard.

<!-- slot:variant -->

Gambar dekat sekring FU6:

<img alt="Gambar dekat sekring FU6" src="https://github.com/user-attachments/assets/79d82752-efc3-4f26-b131-cfec5d1c2114" loading="lazy" />

Gambar jauh sekring FU6:

<img alt="Posisi FU6 terhadap heatsink" src="https://github.com/user-attachments/assets/30dde8d7-a056-44ac-bcf5-48bd6083d47e" loading="lazy" />

Gambar sangat dekat sekring FU6:

<img alt="Gambar sangat dekat sekring FU6" src="https://github.com/user-attachments/assets/d0c24470-7b7c-405b-a397-3424e1f06495" loading="lazy" />

Saya tidak menemukan data pasti mengenai sekring aslinya; menurut saya, sekring pengganti sekitar 100 sampai 200 mA dengan kemasan yang sesuai dapat dipasang, atau mungkin resistor 0 ohm dengan kemasan yang sesuai. Namun, karena tekanan termal yang terus-menerus, saya tidak menganggap hal tersebut sebagai solusi jangka panjang yang masuk akal; karena itu saya melepas sekring tersebut dan mem-bypass-nya dengan jembatan solder.

Gambar dekat pad setelah sekring FU6 dilepas:

<img alt="Pad setelah FU6 dilepas" src="https://github.com/user-attachments/assets/3182a871-0657-4c5b-b8e4-51107a93122b" loading="lazy" />

Setelah komponen dilepas, saya mem-bypass sekring FU6 dengan jembatan solder, dan saat memeriksa dengan multimeter (harus sangat berhati-hati saat papan bertegangan), saya melihat bahwa jalur 3,3 V sampai ke pin soket tanpa masalah.

Sekring FU6 yang telah di-bypass dengan jembatan solder:

<img alt="FU6 di-bypass dengan jembatan solder" src="https://github.com/user-attachments/assets/4c2260ed-0f74-4f58-9619-de3497ee7953" loading="lazy" />

Pemeriksaan ini juga perlu dilakukan saat papan tidak bertegangan, dengan uji kontinuitas antara pad sekring yang lebih dekat ke soket dan pin-pin soket, untuk menentukan dengan tepat pin mana yang harus membawa tegangan 3V3. Setelah semua pekerjaan solder, kekuatan sambungan solder wajib diperiksa dengan uji kontinuitas.

<!-- slot:checklist -->

---

## 4. Daftar Pustaka

1. **[Reddit: HP Victus 16 Hall Effect Sensor Megathread](https://www.reddit.com/r/HPVictus/comments/1pzcl91/victus_16_hall_effect_sensor_megathread_laptop/)**
   Penulis: [RaguTom](https://www.reddit.com/user/RaguTom/)

2. **[BADCAPS: HP Victus 16 Hall Effect Sensor Problem](https://www.badcaps.net/forum/troubleshooting-hardware-devices-and-electronics-theory/troubleshooting-laptops-tablets-and-mobile-devices/3822460-hp-victus-16-hall-effect-sensor-problem)**
   Penulis: [mitchw](https://www.badcaps.net/member/199143-mitchw)

3. **[Maintenance and Service Guide Victus by HP 16.1 inch](https://kaas.hpcloud.hp.com/pdf-public/pdf_7911438_en-US-1.pdf)**

4. **[Toshiba TCS40DLR Datasheet](https://toshiba.semicon-storage.com/info/TCS40DLR_datasheet_en_20150403.pdf?did=30105&prodName=TCS40DLR)**

5. **[Allegro A1126 Datasheet](https://www.allegromicro.com/~/media/Files/Datasheets/A1126-Datasheet.ashx)**

---

## 5. Gambar Tambahan

**[Klik di sini untuk folder Google Drive](https://drive.google.com/drive/folders/1yIsKV0Ez4vL3xuzYP01oauqGa7uJhQD5?usp=sharing)**

## **Bugra**
