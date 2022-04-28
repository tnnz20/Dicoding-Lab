# Laporan Proyek Machine Learning (REMAKE)

## Domain Proyek
Domain proyek yang saya pilih dalam proyek _Machine Learning_ ini adalah mengenai **kesehatan** dengan judul "Klasifikasi Penyakit Stroke".

Latar Belakang : 

Stroke adalah kondisi medis dimana otak tidak mendapatkan aliran darah yang cukup sehingga menyebabkan sel mati ([wikipedia](https://en.wikipedia.org/wiki/Stroke)). Tanpa darah, otak tidak akan mendapatkan asupan oksigen dan nutrisi, sehingga sel-sel pada area otak yang terdampak akan segera mati. Stroke merupakan keadaan darurat medis karena sel otak dapat mati hanya dalam hitungan menit. Matinya sel otak menyebabkan bagian tubuh yang dikendalikan oleh area otak yang rusak tidak dapat berfungsi dengan baik. Dikutip dari [WHO](https://www.who.int/news-room/fact-sheets/detail/the-top-10-causes-of-death), Stroke merupakan salah satu penyakit yang berpotensi untuk mematikan manusia bahkan pada riset WHO  mengatakan penyakit stroke termasuk nomor 2 penyakit mematikan di dunia. 

![WHO](https://lh3.googleusercontent.com/tsJMRht1HYVqW7F7dweI8Yb97ZdMoGrRuNzkIKbZOZ2DOf80e7em-V3XkGgO0ufCLZVCTB04p0PJBq0c3JKc-N5WeOnPAgOL3_-tBrE54XQeoynI_U9svy1LLrIRZ6-_1dRUMOM)

Pada proyek ini, data yang saya pakai adalah data prediksi penyakit stroke dengan 12 fitur klinis sebagai parameter prediksi. Dari data ini, nantinya kita akan dapat mengklasifikasikan apakah penyebab seseorang terkena penyakit stroke. Dataset ini memiliki 12 fitur yaitu umur, jenis kelamin, memiliki hipertensi atau tidak, status kawin, riwayat penyakit jantung, pekerjaan, lokasi tinggal, rata-rata glukosa, berat badan, smoking status. dan target kita yaitu stroke atau tidak


## Business Understanding
### Problem Statements
Stroke sering kali melanda manusia kapan pun dan di mana pun, Stroke sendiri adalah penyakit yang sulit sekali untuk diprediksi oleh manusia. Banyak faktor yang sampai saat ini masih diteliti orang para ahli di dunia, sehingga permasalahan yang akan dijawab di proyek ini adalah

1. Bagaimana cara memprediksi stroke menggunakan Machine Learning?


### Goal
Tujuan dari proyek ini adalah untuk memprediksi apakah pasien dengan fitur yang ada berpotensi terkena penyakit stroke atau tidak dengan menggunakan model _Machine Learning_.

### Solution Statement
Untuk menyelesaikan masalah ini, saya akan mengajukan 3 solusi model _Machine Learning_ yang sederhana karena data ini merupakan data `klasifikasi`. berikut penjelasan dari model-model yang akan saya gunakan dalam proyek ini :

* Suport Vector Machine
  <br>Support Vector Machine adalah algoritma machine learning yang memungkinkan kita memprediksi suatu masukkan dengan cara dengan memasukkan konsep kernel pada ruang berdimensi tinggi. Kernel disini maksudnya layaknya membagi setiap koloni dengan menarik garis pemisah antara kelas satu dan kelas lainnya. SVM adalah salah satu metode yang paling populer dalam machine learning. 
<br>![SVM](https://camo.githubusercontent.com/cb35d60438381330a3385c87cff87785ff63c8155873d36b6cea160b249eed53/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f686166696468736f656b6d612f696d6167652f75706c6f61642f76313633333035353835322f52616e646f6d2f737331325f79336e7465752e706e67)

* Decision Tree
  <br>Decision Tree adalah algoritma machine learning yang memungkinkan kita memprediksi suatu masukkan dengan cara dimulai dengan satu node kemudian node tersebut bercabang untuk menyatakan pilihan-pilihan yang ada. Sederhananya algoritma ini mirip dengan control flow. 
  <br>![Decission_tree](https://miro.medium.com/max/360/1*XMId5sJqPtm8-RIwVVz2tg.png)
  
* Random Forest
  <br>Random forest (RF) adalah suatu algoritma yang digunakan pada klasifikasi data dalam jumlah yang besar. Klasifikasi random forest dilakukan melalui penggabungan pohon (tree) dengan melakukan training pada sampel data yang dimiliki. Penggunaan pohon (tree) yang semakin banyak akan mempengaruhi akurasi yang akan didapatkan menjadi lebih baik. Penentuan klasifikasi dengan random forest diambil berdasarkan hasil voting dari tree yang terbentuk. Pemenang dari tree yang terbentuk ditentukan dengan vote terbanyak. 
  ![Random_forest](https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/academy/dos:5e086364e59025d11dd0dfd3bc965e7c20210912094833.png)
  
* Logstic Regression
  <br>Logistic regression dikenal juga sebagai logit regression, maximum-entropy classification, dan log-linear classification merupakan salah satu metode yang umum digunakan untuk klasifikasi. Pada kasus klasifikasi, logistic regression bekerja dengan menghitung probabilitas kelas dari sebuah sampel. 
 
* K-Neighbors
<br> K-nearest neighbors (KNN) salah satu algoritma supervised learning yang bisa digunakan untuk kasus classification. KNN memprediksi dengan cara menghitung jarang antara data test dengan semua data training. lalu memilih nomor K sebagai poin yang terdekat pada data test.


## Data Understanding
  ![dataset](https://user-images.githubusercontent.com/76864673/139538711-09c5bac0-9afc-413d-bd84-7754f277022e.png)

**Information :**

Type | Information
--- | ---
Source | [Kaggle Dataset : Stroke Prediction Dataset](https://www.kaggle.com/fedesoriano/stroke-prediction-dataset)
License | Data files © Original Authors
Category | Health
Usage Rating | 10.0 (Gold)
File Type and Size | CSV (317 kb)
  
pada dataset ini terdapat `5110` data dan `12` attribut dengan keterangan sebagai berikut :

Attribute | Information
--- | ---
id | unique indentifier
gender | jenis kelamin pasien ('Male', 'Female', or 'Other')
age | umur pasien
hypertension | `0` jika tidak memiliki hipertensi, `1` jika memiliki hipertensi
heart_disease | `0` jika tidak memiliki riwayat penyakit jantung, 1 jika memiliki riwayat penyakit jantung
ever_married | status kawin "Tidak" atau "Ya"
work_type | pekerjaan "children", "Govt_jov", "Never_worked", "Private" or "Self-employed"
Residence_type | tempat tinggal "Rural" or "Urban"
avg_glucose_level | rata-rata glukosa dalam darah
bmi | berat badan
smoking_status | status merokok "formerly smoked", "never smoked", "smokes" or "Unknown"*
stroke | `1` jika pasient terkena stroke or `0` jika tidak

**Catatan: "Unknown" dalam smoking_status berarti informasi tersebut tidak tersedia**

### Visualisasi data attribut sebagai berikut

1. gender

![image](https://user-images.githubusercontent.com/76864673/142897328-dd7188eb-5dc7-4551-a2f6-3945269a3a0b.png)

2. age

![image](https://user-images.githubusercontent.com/76864673/142897469-4e053cca-9200-4f91-a9aa-4932989c1c10.png)

3. hypertension

![image](https://user-images.githubusercontent.com/76864673/142897553-5eaf4731-d30f-430d-a93c-8848dd34fed1.png)

4. heart_disease

![image](https://user-images.githubusercontent.com/76864673/142897590-d4a9d86c-cc1e-4800-b1ba-e36841685f7f.png)

5. ever_married

![image](https://user-images.githubusercontent.com/76864673/142897645-627bb5f4-93a6-4c1b-9975-d659893bb0e6.png)

6. work_type
![image](https://user-images.githubusercontent.com/76864673/142897717-8f0f2f9d-9eda-46df-9d71-1d8dc0d2f983.png)

7. Residence_type
![image](https://user-images.githubusercontent.com/76864673/142897752-c27e4829-b9fc-470c-9eb5-5d2e598a64f8.png)

8. avg_glucose_level
![image](https://user-images.githubusercontent.com/76864673/142897810-83d85681-72e4-4cf4-9abd-1fe2d204498f.png)

9. bmi
![image](https://user-images.githubusercontent.com/76864673/142897829-1e52d44d-67b6-44fd-ad0f-05b524567c0a.png)

10. smoking_status
![image](https://user-images.githubusercontent.com/76864673/142897786-89501755-e527-4cb4-962c-7f8e13b03106.png)

11. stroke
![newplot](https://user-images.githubusercontent.com/76864673/142898104-0affa7aa-dd34-49a3-9b40-585a7922b437.png)

### Visualisasi Multivariate 

hue = stroke

![image](https://user-images.githubusercontent.com/76864673/142898181-da44a506-ebde-420b-a1a9-4bda8d1845eb.png)
![image](https://user-images.githubusercontent.com/76864673/142898198-c0f89e20-c8d1-408a-b8f5-9bdacf2cad57.png)
![image](https://user-images.githubusercontent.com/76864673/142898215-75563b93-207e-4d79-b372-b07c86d1d7fd.png)
![image](https://user-images.githubusercontent.com/76864673/142898248-867652f4-3f06-4f09-a354-aafcc9288c7f.png)
![image](https://user-images.githubusercontent.com/76864673/142898262-d98e54e7-5a5b-4a7a-820d-e232654a6603.png)
![image](https://user-images.githubusercontent.com/76864673/142898278-ebec703e-4dca-41b2-9ef7-202b6308e65d.png)
![image](https://user-images.githubusercontent.com/76864673/142898293-89faab9d-dd3f-4ccb-b610-bedcd7003ed9.png)

hue = gender

![image](https://user-images.githubusercontent.com/76864673/142898435-9d8e2109-fe7d-4fa5-9a96-185df1ec03ff.png)
![image](https://user-images.githubusercontent.com/76864673/142898450-59e765be-fe02-45ba-a834-e7e7c7166c4b.png)
![image](https://user-images.githubusercontent.com/76864673/142898470-7e27a2bb-2a77-4793-8cc9-2e866350f3c1.png)
![image](https://user-images.githubusercontent.com/76864673/142898496-e355dc2a-f88d-456c-a52c-aa2eb6c4b955.png)
![image](https://user-images.githubusercontent.com/76864673/142898512-c77eb6ff-7463-4331-ba4a-488c87e3e56c.png)
![image](https://user-images.githubusercontent.com/76864673/142898526-89998cb8-5b8c-4f45-ab5d-54966475fd6c.png)


Relasi fitur :
![image](https://user-images.githubusercontent.com/76864673/142898666-efc5c286-b450-4c42-95c3-1c427bd7d3dc.png)


> Kesimpulan :
  * pada grafik feature `Gender` data dominan adalah perempuan dan dalam grafik tersebut terlihat ada *Other* yang dimana Gender manusia hanya ada dua Yaitu *female* dan *male*
  * pada grafik feature `ever_maried` data dominan terhadap pernah kawin
  * pada grafik feature `work_type` data cenderung pada *private* 
  * pada grafik feature `residence_type` data *urban* maupun *rural* hampir berimbang data *urabn* sedikit lebih banyak.
  * pada grafik feature `smoking_status` data terbanyak adalah *never smoked* dan iringi oleh data *unknown*
  * pada grafik feature `heartt_disease` data dominan terhadap yang tidak pernah terkena serangan jantung *0* ketimbang kena *1*
  * pada grafik feature `hypertension` data dominan terhadap yang tidak memiliki hypertensi *0* ketimbang memiliki *1*
  * pada grafik ini dapat dilihat bahwa lebih banyak data yang tidak memiliki stroke dibanding yang stroke **Imbalance Data**


## Data Preparation
* Pertama drop terlebih dahulu attribut `id` karena setelah di cek data yang dimiliki tidak ada satupun yang duplikat sehingga attribut `id` tidak diperlukan
* selanjutnya pada attribut `gender` terdapat data yang memiliki jenis kelamin `other` yang mana ini tidak relevan dengan jenis kelamin manusia sehingga data ini di drop
* setelah di cek ternyata data memiliki penamaan yang tidak konsisten pada attribut jadi agar mempermudah nama attribut di samakan baik dari huruf besar dan kecilnya
* pada datasets terdapat attribut yang memiliki data kurang lengkap yaitu `bmi` terdapat 201 data yang kosong, untuk itu saya memasukan data yang kosong dengan rata rata pada bmi tersebut
* setelah itu saya mencek dan menghapus data yang outlier menggunakan z-score untuk melihat score yang memiliki data outlier terbanyak
* lalu encode data object menjadi numerik dengan dua metode encode yaitu label encoder dan one-hot encoder
* setelah itu melakukan teknik oversampling kepada data yang imbalance menggunakan SMOTE
* saya membagi data menjadi dua train 80% dan test 20% dari total data untuk tahap modeling nanti.
* terakhir saya Standarization agar nilai fitur memiliki skala yang sama dengan menggunakan metode z score.
<br>![standarization](https://drive.google.com/uc?export=view&id=1VMat3oOOS2cGyETOfFyK4bgBwFMRt8Ui)

## Modeling
Setelah melakukan _Data Preparation_ , selanjutnya saya akan membuat model _Machine Learning_ . Pada sub-bab sebelumnya, telah disampaikan bahwa ada 3 model _Machine Learning_ yang saya gunakan yaitu :
1. Suport Vector Machine
2. Decison Tree
3. Random Forest
4. Logistic Regression
5. K-neighbors

Berdasarkan metric evaluasi :
* Model *Decision Tree* memiliki akurasi tertinggi pada data training tetapi pada data testing akurasi menurun sekitar `6%`
* Model *Suport Vector Machine* memiliki akurasi yang stabil baik itu pada data training maupun data testing dan ketika dilakukan hyper tunning akurasi meningkat.
* Model *Random Forest* memiliki akurasi yang lumayan stabil dan ketika di hyper tuning akurasi sangat meningkat drastis.
* Model *Logistic Regression* memiliki akurasi yang stabil tetapi ketika di hyper tuning akurasi yang dimiliki menurun.
* Model *K-neighbors* memiliki akursai stabil tetapi ketika di hyper tuning akurasi tidak meningkat

![image](https://user-images.githubusercontent.com/76864673/142900717-8fe14f32-6635-49f0-b80f-3e674fe51c1a.png)


## Evaluation

Pada bagian ini, saya menguji performa model dengan *classification report* , *confussion matrix* , dan *model.score* karena ini adalah masalah klasifikasi. Berikut penjelasannya :

1. `Classification Report` : Merupakan _performance evaluation metric_ dalam _Machine Learning_. Di dalam metrik ini, terdapat **accuracy, precision, recall, dan F1 score**. Berikut penjelasannya :
    - **Accuracy** : Merupakan hasil akurasi dari model yang telah dibuat. Cara menghitungnya adalah dengan menjumlah semua prediksi yang benar dan dibagi dengan total semua prediksi yang benar maupun yang salah.

    ![acuracy](https://user-images.githubusercontent.com/76864673/139538988-74803a14-f14b-48e2-922d-829cfb66d2c1.jpeg)
    
    - **Precision** : Dapat didefinisikan sebagai rasio positif benar dengan jumlah _true positive_ dan _false positives_.

    ![precision](https://user-images.githubusercontent.com/76864673/139538993-8dd5a22d-be64-470b-a385-94abd6d8010a.jpeg)

    - **Recall** : Digunakan untuk menghitung berapa data yang salah dalam melakukan prediksi.

    ![recal](https://user-images.githubusercontent.com/76864673/139539006-e919ec02-922f-4af6-a47b-2ce30dec2ed5.jpeg)

    - **F1 Score** : Merupakan _weighted harmonic mean_ dari _precision_ dan _recall_.

    ![recal](https://user-images.githubusercontent.com/76864673/139539010-4622a312-5222-4e5a-aa63-f76f572829fa.jpeg)

2. `Confussion Matrix` : Merupakan pengukuran performa untuk masalah klasifikasi _Machine Learning_ dengan empat tabel kombinasi berbeda dari nilai prediksi dan nilai aktual. Ada empat istilah yang merupakan representasi hasil proses klasifikasi pada confusion matrix yaitu True Positif, True Negatif, False Positif, dan False Negatif. Berikut penjelasannya :
    - TN / True Negative : kasusnya negatif dan diprediksi negatif
    - TP / True Positive : kasusnya positif dan diprediksi positif
    - FN / False Negative : kasusnya positif tetapi diprediksi negatif
    - FP / False Positive : kasusnya negatif tetapi diprediksi positif

3. `model.score` : Merupakan hasil dari penjumlahan prediksi yang benar lalu dibagikan dengan prediksi yang benar ditambah prediksi yang salah. Ini sama dengan _accuracy_ pada **Classification Report** namun perbedaannya adalah pada **Classification Report** akurasinya dibulatkan menjadi dua bilangan di belakang 0, yang mana hal ini dapat menyebabkan bias pada akurasi model.


## Conclusion
Model klasifikasi penyakit stroke telah selesai dibuat dan model ini dapat digunakan untuk mengklasifikasikan data yang sebenarnya. Berdasarkan model tersebut dapat diketahui bahwa algoritma terbaik dalam model ini adalah *Suport Vector Machine* &  *K-neighbors* karena memiliki akurasi yang stabil baik itu pada data training maupun data testing (Good fits)

![image](https://user-images.githubusercontent.com/76864673/142901191-b376ed52-e20d-4de2-a5eb-2992ab1a92f3.png)
