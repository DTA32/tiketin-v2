# TIKETIN

## Software Engineering Project

Aplikasi website sederhana pemesanan tiket pesawat yang dibuat untuk tugas akhir mata kuliah Software Engineering, dan di-rework di versi ini dengan memisahkan Frontend (dipindah ke React) dan Backend. Kelebihan dari website ini adalah user dapat memilih kursi yang diinginkan saat memesan penerbangan

Disclaimer:

- Data yang digunakan web ini hanya dummy
- Segala order yang dilakukan dalam web ini tidak dapat digunakan di dunia nyata
- Khusus di staging server, dikarenakan efisiensi server, penerbangan yang tersedia hanya di esok hari dan semua data akan di-reset setiap harinya
- Website ini didesain untuk mobile, oleh karena itu disarankan untuk membuka web ini di handphone atau menggunakan DevTools->Mobile View

## Installation Guide

Tersedia di folder backend dan frontend

### Docker Setup

Container in root folder is to serve NGINX as webserver alongside with React, not separating React to different container as it's only generated static page (no server components).

## Fitur

- Reservasi tiket pesawat
  - Mencari dan memilih penerbangan yang diinginkan
  - Memasukkan data penumpang
  - Memilih kursi penerbangan
  - Konfirmasi pemesanan dan melakukan pembayaran
- Riwayat pemesanan
- Export E-Ticket dari pemesanan
- Customer Service
- Berita pariwisata
- Pengaturan profil
- Admin Dashboard (Read)

**belum berfungsi**

- Authentication (fitur yang terdampak ada dibawah)
  - Login
  - Register
  - Profile
- Filter (on step 1 order)
- Admin (Create, Update, and Delete function)
