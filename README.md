# kitameraki_recruitmen_SyahrunFthan

Project tes pemrograman

## Daftar Isi

- [kitameraki_recruitmen_SyahrunFthan](#kitameraki_recruitmen_syahrunfthan)
  - [Daftar Isi](#daftar-isi)
  - [Persyaratan](#persyaratan)
  - [Instalasi](#instalasi)
    - [Backend](#backend)
  - [Penggunaan](#penggunaan)
    - [Backend](#backend-1)

## Persyaratan

Sebelum memulai, pastikan Anda memiliki perangkat lunak berikut terinstal di sistem Anda:

- [Node.JS](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## Instalasi

Cloning repository ini dan menjalankan perintah berikut di terminal Anda:

```bash
git clone https://github.com/SyahrunFthan/kitameraki_recruitment_SyahrunFthan.git


```

### Backend

1. Navigasi ke direktori backend:

```bash
cd backend
```

2. Install dependensi

```bash
npm install
```

3. Konfigurasi file .env:

   ```bash
   MONGODB_URL= // isi dengan uri database  MongoDB Anda
   PORT_APP=5001
   ACCESS_TOKEN= //  isi dengan token akses yang Anda inginkan

   ```

4. Jalankan server backend:
   ```bash
   npm start
   ```

Anda dapat mengakses API di [http://localhost:5001/](http://localhost:5001/)

## Penggunaan

### Backend

1. Setelah server berjalan, anda dapat mengakses api di [http://localhost:5000/]
2. Gunakan alat seperti [Postman](https://www.postman.com/) untuk mengirim request ke API.
3. Import file openapi.auth.json untuk menguji API.
