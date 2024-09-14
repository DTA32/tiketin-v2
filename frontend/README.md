# Frontend

## Installation Guide

Execute these lines in your terminal

1. `npm install`

To run frontend, execute

`npm run dev`

Frontend will be available at [localhost:5173](localhost:5173)

### Docker Setup

1. `docker build -t tiketin-v2-fe .`
1. `docker run -d -p 7003:80 tiketin-v2-fe`

Note:

- Saat melakukan pemesanan, pada bagian pembayaran harap tekan tombol saya sudah membayar, karena fitur pembayaran tsb hanya dummy
