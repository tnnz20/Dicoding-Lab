# Laporan Proyek Machine Learning Terapan

## Project Overview
Domain proyek yang saya pilih pada proyek ini tentang `Sistem Rekomendasi Film`

Menurut [Wikipedia](https://simple.wikipedia.org/wiki/Movie) : Movie atau film adalah salah satu tipe komunikasi visual yang dimana menggunakan gambar bergerak dan suara untuk menceritakan sebuah kisah. Kebanyakan orang menonton film untuk menghibur diri mereka, untuk sebagian orang sebuah film bisa membuat bahagia atau pun sedih berdasarkan cerita yang disampaikan dalam film tersebut. Di era sekarang banyak bermunculan film film yang menarik dan beragam misalnya seperti film tentang komedi, dokumenter, horor dan sebagainya. Bahkan sebuah film tidak hanya menampilkan manusia saja dalam film tersebut, ada film yang menampilkan *cartoon* sebagai tokoh dalam filmnya.

Sebagian besar film dibuat agar dapat ditampilkan di layar Bioskop dan juga di rumah. Film ditampilkan di Bioskop untuk jangka waktu beberapa minggu atau bulan, sebuah film dapat dipasarkan melalui beberapa media lain. Contohnya ditampilkan di televisi berbayar atau televisi kabel, dan dijual atau disewakan pada disk DVD atau kaset video, sehingga orang dapat menonton film di rumah. Kita juga dapat mengunduh atau streaming film. Film-film lama ditayangkan di stasiun-stasiun penyiaran televisi. Ada ribuan bahkan jutaan film yang ada pada zaman sekarang bahkan kategori atau genre dari sebuah film sangat beragam, kita bisa dengan leluasa mencari sebuah film yang mungkin kita sukai. 

## Business Understanding
Sistem rekomendasi adalah suatu aplikasi yang digunakan untuk memberikan rekomendasi dalam membuat suatu keputusan yang diinginkan pengguna. Untuk meningkatkan user experience dalam menemukan judul film yang menarik dan yang sesuai dengan yang user inginkan, maka sistem rekomendasi adalah pilihan yang tepat untuk diterapkan. Dengan adanya sistem rekomendasi, user experience tentu akan lebih baik karena pengguna bisa mendapatkan rekomendasi judul film yang ingin ditonton.

### Problem Statement
Bagaimana cara mencari judul film yang mungkin disukai oleh pengguna berdasarkan judul yang dipersonalisasi sesaui pengguna dan judul film yang belum pernah di tonton oleh pengguna sebelumnya?


### Goal
Membuat sebuah **Sistem Rekomendasi** agar memudahkan pengguna mencari judul film yang mungkin mirip dengan film yang sudah ditonton sebelumnya atau mencari judul film yang mungkin disukai pengguna dan sebelumnya belum pernah di tonton pengguna.


### Solution
Untuk menyelesaikan masalah ini, saya mengajukan 2 solusi yaitu teknik content-based filtering dan teknik collaborative filtering. Berikut adalah penjelasan teknik-teknik yang akan digunakan untuk masalah ini :

* Content-Based Filtering : Merupakan cara untuk memberi rekomendasi bedasarkan genre atau fitur pada item yang disukai oleh pengguna. Content-based filtering mempelajari profil minat pengguna baru berdasarkan data dari objek yang telah dinilai pengguna.
* Collaborative Filtering : Merupakan cara untuk memberi rekomendasi bedasarkan penilaian komunitas pengguna atau biasa disebut dengan *rating*. Collaborative filtering tidak memerlukan atribut untuk setiap itemnya seperti pada sistem berbasis konten.

## Data Understanding

![image](https://user-images.githubusercontent.com/76864673/140640142-57306111-f34e-4223-99a7-4d970aba3867.png)


Datasets ini di ambil dari [Kaggle](https://www.kaggle.com/sunilgautam/movielens), dalam datasets ini terdiri dari 5 file csv yaitu :

* README.txt
* links.csv
* ratings.csv
* movies.csv
* tags.csv

Di proyek `sistem rekomendasi` kali ini saya hanya menggunakan 2 file yaitu : 
1. *movies.csv*
    <br>Keterangan :
    * `movieId` = Id dari film (int64)
      <br>movieId memiliki 9742 data unik.
    * `title` = Judul dari film beserta tahun rilisnya (object)
      <br>title memiliki 9737 data unik.
    * `genres` = Genre dari film (object)
      <br>genres Memiliki 951 data unik.
    
    *Jumlah Data 9742, dan memiliki 3 kolom*

Berikut adalah Grafik Distribusi tahun rilis film dalam data *movie.csv* :

![distribusi_tahun](https://user-images.githubusercontent.com/76864673/140754307-a38fbf63-fecb-4f22-b442-987843d075d3.png)
 
>Dapat dilihat pada grafik di atas rata rata rilis sebuah film berkisar antara tahun 1990-2000 ke atas, dalam grafik di atas juga dapat diliat pada tahun 2000 keatas banyak film film yang dirilis atau dibuat.

Berikut adalah jumlah genre yang ada di dalam data *movie.csv* :

![total_genre](https://user-images.githubusercontent.com/76864673/140755394-16e12f72-b474-4165-8b20-c15bc5873d02.png)

> Terlihat pada gambar di atas ada 20 kategori atau genre di dalam data ini. genre `Drama` yang paling banyak dan diikuti oleh genre `Comedy` lalu ada beberapa movies yang tidak memiliki genre `no genres listed`

2. *ratings.csv*
    <br>Keterangan :
    * `userId` = Id pengguna (int64)
      <br>userId  memiliki 610 data unik.   
    * `movieId` = Id film yang di rating (int64)
      <br>movieId memiliki 9724 data unik.
    * `rating` = Skor dari rating yang diberikan (float64)
      <br>rating memiliki 10 data unik. dengan range 0 - 5 dan skala 0.5
      
      Berikut adalah jumlah rating yang diberikan user terhadap film
      
      ![image](https://user-images.githubusercontent.com/76864673/140758043-53bd2b5e-fa1b-41d4-b24b-ebfe1d0a590a.png)
      
    * `timestamp` = Waktu saat rating diberikan (int64)
      <br>timestamp memiliki 85043 data unik.
    
    *Jumlah Data 100836, dan memiliki 4 kolom*

Berikut Gambar 10 rating tertinggi sebuah film yang diberikan user pada data ini.

![top_rating](https://user-images.githubusercontent.com/76864673/140755401-0ff0f11c-2f47-4e75-9c79-59ee4c5e9f44.png)

> Terlihat pada grafik diatas bahwa movies dengan judul `Forrest Gump (1994)` memiliki rating tertingi.

## Data Preparation
Pada tahap **Data Preparation** saya menggunakan dua buah datasets yaitu `movies.csv` & `ratings.csv` kedua datasets ini saya taruh ke dalam dua buah variable yang berbeda yaitu **movies** untuk datasets movies.csv & **ratings** untuk datasets ratings.csv . setelah menyiapkan datasets yang digunakan saya melakukan tahap sebagai berikut :
1. Memastikan tidak ada missing value
<br>Missing value dapat menganggu proses modeling yang menyebabkan menurunnya performa untuk memprediksi sehinggi hal yang perlu dilakukan pertama adalah memastikan tidak adad data yang missing.
   
2. Sorting `ratings` value berdasarkan userId dan mengubah data tersebut ke dalam integer
<br> Setelah itu saya melakukan sorting atau mengurutkan userId pada datasets ratings dan memastikan bahwa userId bertipe *Integer* sebagai ID dari user.

3. Mendrop data duplicate
<br> Saya juga memastikan bahwa data yang saya miliki ini tidak mengandung data duplicate dengan cara mendrop data duplicate berdasarkan `title` pada datasets movies, dan `userId`, `movieId` pada datasets ratings.

4. Mengabungkan data `ratings` dengan `movies` setelah itu seleksi value dalam kolom genres yang tidak mengandung np.nan
<br> selanjutnya adalah membuat sebuah variable baru yang digunakan untuk model **Collaborative Filtering** dari gabungan datasets `movies.csv` & `ratings.csv` dang membuat kolom *timestamp* karena tidak diperlukan. dan pada proses penggabungan terdapat data pada kolom genres yang mengandung *numpy.nan* atau data *nan* sehingga saya melakukan seleksi kembali untuk data yang memiliki *nan*.

## Modeling and Result
Untuk tahap modeling, saya akan menggunakan *Neural Network* dan *Cosine Similarity*. Model *Deep Learning* akan saya gunakan untuk Sistem Rekomendasi berbasis `Collaborative Filtering` yang mana model ini akan menghasilkan rekomendasi untuk satu pengguna. *Cosine Similarity* akan saya gunakan untuk Sistem Rekomendasi berbasis `Content-Based Filtering` yang akan menghitung kemiripan antara satu film dengan lainnya berdasarkan fitur yang terdapat pada satu film. Berikut penjelasan tahapannya :

### Content Based Filtering
Langkah pertama, saya menggunakan TF-IDF Vectorizer untuk menemukan representasi fitur penting dari setiap genre movies. Fungsi yang saya gunakan adalah tfidfvectorizer() dari library sklearn. Berikut sebagian outputnya :

![tf-vectorizer](https://user-images.githubusercontent.com/76864673/140756858-26338cd1-075c-41e5-97ab-098443006b1f.png)

Selanjutnya saya melakukan fit dan transformasi ke dalam bentuk matriks. Outputnya adalah matriks berukuran (9737, 23). Nilai 9737 merupakan ukuran data dan 23 merupakan matrik genre movie.

Untuk menghitung derajat kesamaan (similarity degree) antar movie, saya menggunakan teknik cosine similarity dengan fungsi cosine_similarity dari library sklearn. Berikut adalah rumusnya :

![rumus](https://user-images.githubusercontent.com/76864673/140756988-dc8b42eb-c346-4ce1-9f57-23c911b7a4cd.png)

Langkah selanjutnya adalah saya menggunakan argpartition untuk mengambil sejumlah nilai k tertinggi dari similarity data kemudian mengambil data dari bobot (tingkat kesamaan) tertinggi ke terendah.

Kemudian saya menguji akurasi dari sistem rekomendasi ini untuk menemukan rekomendasi movies yang mirip dengan Mean Streets (1973). Berikut adalah detail informasi film yang akan saya uji :

![image](https://user-images.githubusercontent.com/76864673/140765212-852928eb-b418-46ec-a13e-df87f2c08837.png)

terlihat pada keterangan judul film di atas bahwa Mean Streets (1973) memiliki genre Crime & Drama. Berikut hasil sistem Rekomendasi berdasarkan judul Mean Streets (1973) :

![content](https://user-images.githubusercontent.com/76864673/140757141-0f1ac286-f8c8-432d-854e-dad6fe629a76.png)

Terlihat pada gambar di atas bahwa ada sepuluh rekomendasi yang memiliki genre sama yaitu Crime & Drama.

### Collaborative Filtering
Pada modeling `Collaborative Filtering` saya menggunakan data hasil gabungan dari dua datasets yaitu *movies.csv* & *ratings.csv*. Langkah Pertama adalah melakukan encode data `userId` & `movieId` setelah di encode saya melakukan mapping ke dalam data yang digunakan dan juga mengubah nilai rating menjadi float. Selanjutnya saya mebagi data membagi data untuk Training dan Validasi.

Lalu melakukan proses embedding terhadap data user dan movie. Lalu melakukan operasi perkalian dot product antara embedding user dan movie. Selain itu, saya juga menambahkan bias untuk setiap user dan movie. Skor kecocokan ditetapkan dalam skala [0,1] dengan fungsi aktivasi sigmoid. Untuk mendapatkan rekomendasi movie, saya mengambil sampel user secara acak dan mendefinisikan variabel movie_not_watched yang merupakan daftar movie yang belum pernah ditonton oleh pengguna.

Berikut adalah gambar 10 rekomendasi film terhadap user 474:

![collaborative](https://user-images.githubusercontent.com/76864673/140757232-9de903a1-870e-497f-996f-18b7e1a57815.png)

## Evaluation
Pada tahap ini, saya menggunakan Mean Absolute Error (MAE) dan Root Mean Squared Error (RMSE) sebagai metrics evaluation `Collaborative Filtering`. Berikut penjelasannya :

1. Mean Absolute Error (MAE) mengukur besarnya rata-rata kesalahan dalam serangkaian prediksi yang sudah dilatih kepada data yang akan dites, tanpa mempertimbangkan arahnya. Semakin rendah nilai MAE (mean absolute error) maka semakin baik dan akurat model yang dibuat.

Berikut rumusnya :

![MAE](https://user-images.githubusercontent.com/76864673/140756134-0968ed33-4255-43aa-bcee-338a0f979138.png)

Berikut visualisasi dari fitting menggunakan metric MAE :

![plotMAEpng](https://user-images.githubusercontent.com/76864673/140757407-0adf8093-c31d-4079-8f40-ce3a90e7e0a6.png)

Berdasarkan hasil fitting nilai konvergen metric MAE berada pada 0.1319 untuk training dan 0.1450 untuk validasi.

2. Root mean squared error (RMSE) adalah aturan penilaian kuadrat yang juga mengukur besarnya rata-rata kesalahan. Sama seperti MAE, semakin rendahnya nilai root mean square error juga menandakan semakin baik model tersebut dalam melakukan prediksi.

Berikut rumusnya :

![RMSE](https://user-images.githubusercontent.com/76864673/140756327-b3c93de6-1c15-4ca8-8c66-8295eb418e49.png)

Berikut visualisasi dari fitting menggunakan metric MAE :

![plotRMSE](https://user-images.githubusercontent.com/76864673/140757411-c21ddec8-4227-494a-901d-9a9e5a0cfbd6.png)

Berdasarkan hasil fitting nilai konvergen metric RMSE berada pada 0.1718 untuk training dan 0.1881 untuk validasi.

Untuk menghasilkan nilai yang konvergen proses `fitting` memerlukan 15 epoch. Dari hasil perhitungan kedua metric diatas dapat disimpulkan bahwa model ini memiliki tingkat eror di bawah 20%.

Dan untuk menghitung metric similarity `Content Based Filtering` saya menggunakan *Precision* dengan rumus sebagai berikut :

![image](https://user-images.githubusercontent.com/76864673/140904619-1de3fb26-be15-4c97-a10d-84f7a7a69b00.png)

dan hasilnya sebagai berikut :

![content](https://user-images.githubusercontent.com/76864673/140757141-0f1ac286-f8c8-432d-854e-dad6fe629a76.png)

Sistem merekomendasikan 10 judul film yang relevan dengan judul *Mean Streets (1973)* yang memiliki genre Crime & Drama

![image](https://user-images.githubusercontent.com/76864673/140765212-852928eb-b418-46ec-a13e-df87f2c08837.png)

dari gambar di atas dapat dilihat bahwa semua film yang direkomendasikan oleh sistem memiliki genre yang sama dengan film *Mean Streets (1973)*
berdasarkan rumus *Precision* maka dapat disimpulkan bahwa model ini memiliki precision 100%
