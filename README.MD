# Backend Data Siswa

Backend aplikasi Data Siswa dibuat menggunakan Node.js, Express.js, dan MySQL.

## Teknologi
- Node.js
- Express.js
- MySQL
- mysql2
- CORS

## Struktur Folder

text
backend/
src/
db.js
server.js
.env
.gitignore
package-lock.json
package.json
README.md

## Instalasi

Jalankan perintah berikut di terminal:

bash
npm install


## Konfigurasi Database

Sesuaikan file `.env`:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=data_siswa
```

Database menggunakan MySQL dari Laragon.

## Menjalankan Backend

```bash
npm run dev
```

Server berjalan di:

http://localhost:3000

## API Endpoint

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | /siswa | Menampilkan data siswa |
| POST | /siswa | Menambahkan data siswa |
| PUT | /siswa/:id | Mengubah data siswa |
| DELETE | /siswa/:id | Menghapus data siswa |

## Database

Nama database: `data_siswa`

Nama tabel: `siswa`