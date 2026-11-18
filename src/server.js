
import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

// Mengecek koneksi database
db.getConnection()
    .then((connection) => {
        console.log("Database MySQL berhasil terhubung!");
        connection.release();
    })
    .catch((error) => {
        console.error("Koneksi database gagal:", error.message);
    });

// Menampilkan data siswa
app.get("/siswa", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM siswa ORDER BY id DESC"
        );

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Gagal mengambil data siswa"
        });
    }
});

// Menambahkan data siswa
app.post("/siswa", async (req, res) => {
    try {
        const {
            kode_siswa,
            nama_siswa,
            alamat_siswa,
            tgl_siswa,
            jurusan_siswa
        } = req.body;

        const sql = `
            INSERT INTO siswa
            (kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa)
            VALUES (?, ?, ?, ?, ?)
        `;

        const [result] = await db.query(sql, [
            kode_siswa,
            nama_siswa,
            alamat_siswa,
            tgl_siswa || null,
            jurusan_siswa
        ]);

        res.status(201).json({
            message: "Data siswa berhasil ditambahkan",
            id: result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Gagal menambahkan data siswa"
        });
    }
});

// Mengubah data siswa
app.put("/siswa/:id", async (req, res) => {
    try {
        const {
            kode_siswa,
            nama_siswa,
            alamat_siswa,
            tgl_siswa,
            jurusan_siswa
        } = req.body;

        const sql = `
            UPDATE siswa SET
            kode_siswa = ?,
            nama_siswa = ?,
            alamat_siswa = ?,
            tgl_siswa = ?,
            jurusan_siswa = ?
            WHERE id = ?
        `;

        const [result] = await db.query(sql, [
            kode_siswa,
            nama_siswa,
            alamat_siswa,
            tgl_siswa || null,
            jurusan_siswa,
            req.params.id
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Data siswa tidak ditemukan"
            });
        }

        res.json({
            message: "Data siswa berhasil diubah"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Gagal mengubah data siswa"
        });
    }
});

// Menghapus data siswa
app.delete("/siswa/:id", async (req, res) => {
    try {
        const [result] = await db.query(
            "DELETE FROM siswa WHERE id = ?",
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Data siswa tidak ditemukan"
            });
        }

        res.json({
            message: "Data siswa berhasil dihapus"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Gagal menghapus data siswa"
        });
    }
});

// Menjalankan server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Backend berjalan di http://localhost:${PORT}`);
});