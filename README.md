Aplikasi-Post-Status
====================

Cara membuat file markdown menjadi pdf :

```
pandoc --template template-penulisan.tex  --variable mainfont="Droid Serif" --variable sansfont="Droid Sans" --variable fontsize=12pt --variable version=1.0 --variable --latex-engine=xelatex --toc -N -o hasil.pdf *md
```

Cara Membuat Apk :

-	buka folder Post-Status-Client lalu jalankan sintak :

```
cordova build --release android
```

maka file apk berada pada folder `Post-Status-Client/platforms/android/build/outputs/apk`

-	kemudian buat sebuah keystore dengan sintak :

```
keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
```

-	setelah selesai kemudian clone atau download zipaligner dari https://github.com/aureljared/zipaligner
-	semua file zipaligner masukkan ke dalam folder `Post-Status-Client/platforms/android/build/outputs/apk`
-	beri hak akses terhadap file zipalign dengan sintak :

```
chmod a+x zipalign
```

-	untuk membuat apk yang sudah release jalankan sintak :

```
./zipalign -v 4 android-release-unsigned.apk aplikasi_post_status.apk
```

-	file aplikasi_post_status.apk digenerate di dalam 1 folder dengan apk sebelumnya
