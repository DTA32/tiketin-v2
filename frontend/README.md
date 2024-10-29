# Frontend

## Installation Guide

Execute these lines in your terminal

1. `npm install`

To run frontend, execute

`npm run dev`

Frontend will be available at [localhost:5173](localhost:5173)

### Docker Setup

For quick preview, image is available on docker hub and can be pulled by `docker pull dta32/ofgs-api:latest`, but it's based on main branch, so if there's code changes or want to use api on local can do these

1. `docker build --build-arg VITE_API_URL="{localIp:port}" -t dta32/tiketin-v2-fe .`
1. `docker run -d -p {externalPort}:80 dta32/tiketin-v2-fe`

Simple deployment is also available by using docker compose on backend directory, but please build first

Note:

- Saat melakukan pemesanan, pada bagian pembayaran harap tekan tombol saya sudah membayar, karena fitur pembayaran tsb hanya dummy
