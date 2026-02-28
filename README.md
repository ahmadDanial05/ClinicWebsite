# 🏥 Sistem Pengurusan Klinik Kesihatan

Sistem pengurusan pesakit dan sampel darah untuk klinik kesihatan dengan interface yang moden dan mudah digunakan.

## ✨ Fitur Utama

### 📋 Pengurusan Pesakit
- ✅ Pendaftaran pesakit baru dengan validasi No. KP
- ✅ Senarai lengkap semua pesakit
- ✅ **Carian pesakit** (nama, No. KP, alamat, telefon)
- ✅ **Filter berdasarkan tarikh pendaftaran**
- ✅ Papar maklumat terperinci pesakit
- ✅ Rekod sampel untuk setiap pesakit
- ✅ Export data ke CSV

### 💉 Pengurusan Sampel
- ✅ Rekod pengambilan sampel darah
- ✅ Pelbagai jenis sampel (Darah Penuh, Serum, Plasma, Urin)
- ✅ Maklumat pegawai yang mengambil sampel
- ✅ Nota tambahan untuk setiap sampel
- ✅ Tarikh & masa pengambilan automatik

### 🏷️ Cetak Label Pesakit (FEATURE BARU!)
- ✅ Cetak label pengenalan pesakit
- ✅ QR Code untuk setiap pesakit
- ✅ Pilih bilangan label
- ✅ Format label professional
- ✅ Siap untuk print

### 🧪 Pengurusan Jenis Sampel
- ✅ Tambah jenis sampel baru
- ✅ Edit dan padam jenis sampel
- ✅ Validasi penggunaan sebelum padam

### 📊 Dashboard
- ✅ Statistik ringkas (jumlah pesakit, sampel, dll)
- ✅ Aktiviti terkini
- ✅ Menu navigasi pantas

### 🔐 Keselamatan
- ✅ Sistem login
- ✅ Session management
- ✅ CSRF protection
- ✅ Audit logging

## 🚀 Cara Instalasi

### Keperluan Sistem
- PHP 7.4 atau lebih tinggi
- MySQL 5.7 atau lebih tinggi
- Apache/Nginx web server
- Browser moden (Chrome, Firefox, Edge, Safari)

### Langkah Instalasi

1. **Clone atau Download Projek**
   ```bash
   git clone [url-repo]
   # atau download ZIP dan extract
   ```

2. **Setup Database**
   - Buka phpMyAdmin atau MySQL client
   - Import fail `database-setup.sql`
   - Atau jalankan command:
   ```bash
   mysql -u root -p < database-setup.sql
   ```

3. **Konfigurasi Database**
   - Edit fail `config.php`
   - Ubah kredensial database:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_USER', 'root');           // Username MySQL anda
   define('DB_PASS', '');               // Password MySQL anda
   define('DB_NAME', 'klinik_db');
   ```

4. **Setup Web Server**
   
   **Untuk XAMPP/WAMP:**
   - Copy folder projek ke `htdocs/` (XAMPP) atau `www/` (WAMP)
   - Akses: `http://localhost/klinik-system/`
   
   **Untuk PHP Built-in Server (Development):**
   ```bash
   cd klinik-system
   php -S localhost:8000
   ```
   Akses: `http://localhost:8000/`

5. **Login ke Sistem**
   - URL: `http://localhost/klinik-system/login.html`
   - Username: `admin`
   - Password: `admin123`

## 📁 Struktur Folder

```
klinik-system/
├── css/
│   └── style.css              # Stylesheet utama
├── js/
│   ├── auth.js               # Authentication
│   ├── dashboard.js          # Dashboard logic
│   ├── login.js              # Login functionality
│   ├── pendaftaran-pesakit.js
│   ├── senarai-pesakit.js    # List + Search + Filter
│   ├── pengambilan-sampel.js
│   ├── jenis-sampel.js
│   └── cetak-label.js        # Label printing (NEW!)
├── api/                       # API endpoints (untuk production)
├── login.html
├── index.html                # Dashboard
├── pendaftaran-pesakit.html
├── senarai-pesakit.html      # UPDATED with filters
├── pengambilan-sampel.html
├── jenis-sampel.html
├── cetak-label.html          # Label printing page (NEW!)
├── config.php                # Database config
├── auth-check.php            # Session checker
├── login-process.php         # Login handler
├── logout.php                # Logout handler
├── database-setup.sql        # Database schema
└── README.md                 # Documentation ini
```

## 🎯 Cara Penggunaan

### 1️⃣ Mendaftar Pesakit Baru
1. Klik "Pendaftaran Pesakit" dari dashboard
2. Isi maklumat pesakit (Nama dan No. KP wajib)
3. Format No. KP: `XXXXXX-XX-XXXX`
4. Klik "Daftar Pesakit"

### 2️⃣ Mencari & Menapis Pesakit
1. Buka "Senarai Pesakit"
2. **Carian**: Taip nama, No. KP, alamat atau telefon
3. **Filter Tarikh**: 
   - Pilih "Tarikh Mula" dan/atau "Tarikh Akhir"
   - Sistem akan papar pesakit dalam julat tarikh tersebut
4. **Reset**: Klik butang "Reset" untuk clear semua filter

### 3️⃣ Cetak Label Pesakit
1. Dari Senarai Pesakit, klik butang "🏷️ Label" pada pesakit
2. ATAU buka menu "Cetak Label" terus
3. Pilih pesakit dari dropdown
4. Tetapkan bilangan label (1-10)
5. Pilih sama ada mahu QR Code atau tidak
6. Klik "🖨️ Cetak Label" untuk print

### 4️⃣ Rekod Pengambilan Sampel
1. Klik "Pengambilan Sampel"
2. Pilih pesakit
3. Pilih jenis sampel
4. Masukkan nama pegawai
5. Tambah nota jika perlu
6. Klik "Rekod Pengambilan Sampel"

### 5️⃣ Urus Jenis Sampel
1. Klik "Jenis Sampel"
2. Tambah jenis baru atau edit yang sedia ada
3. Jenis sampel yang digunakan tidak boleh dipadam

## 🎨 Features Highlights

### Search & Filter (UPDATED!)
```javascript
// Carian support multiple fields:
- Nama pesakit
- No. Kad Pengenalan
- Alamat
- No. Telefon

// Filter tarikh:
- Tarikh mula sahaja
- Tarikh akhir sahaja
- Range (kedua-dua tarikh)
```

### Label Printing (NEW!)
```
Label mengandungi:
✓ Logo klinik
✓ ID Pesakit
✓ Nama lengkap
✓ No. Kad Pengenalan
✓ Tarikh lahir
✓ Jantina
✓ QR Code (optional)
✓ Tarikh cetak

Format: 100mm x 60mm (standard label)
```

## 🔧 Konfigurasi Tambahan

### Auto-format No. KP
No. Kad Pengenalan akan auto-format semasa user menaip:
- Input: `123456011234`
- Output: `123456-01-1234`

### Session Timeout
Default: 30 minit (1800 saat)
Boleh ubah di `auth-check.php`:
```php
$timeout_duration = 1800; // dalam saat
```

### QR Code Data
QR Code mengandungi data JSON:
```json
{
  "id": "P00001",
  "nama": "Nama Pesakit",
  "no_kad": "123456-01-1234",
  "type": "patient"
}
```

## 📊 Database Schema

### Tables:
1. **users** - Pengguna sistem
2. **patients** - Data pesakit
3. **sample_types** - Jenis sampel
4. **samples** - Rekod sampel
5. **audit_log** - Log aktiviti

## 🛠️ Troubleshooting

### Login tidak berfungsi
- Pastikan database sudah diimport
- Check credentials di `config.php`
- Pastikan PHP session enabled

### Label tidak print dengan baik
- Gunakan browser Chrome/Firefox
- Set paper size ke A4
- Enable background graphics
- Check printer settings

### Data tidak tersimpan
- Check browser localStorage tidak disabled
- Untuk production, pastikan database connection berfungsi
- Check error log PHP

### QR Code tidak keluar
- Pastikan library QRCode.js loaded
- Check console untuk errors
- Pastikan JavaScript enabled

## 🔐 Default Login Credentials

**Mode Demo (localStorage):**
- Username: `admin`
- Password: `admin123`

**Mode Production (Database):**
- Username: `admin`
- Password: `admin123`
- **PENTING**: Tukar password selepas first login!

## 📝 Notes

### Demo Mode vs Production Mode

**Demo Mode (Current):**
- Data disimpan dalam localStorage
- Sesuai untuk testing dan demo
- Data hilang bila clear browser data

**Production Mode:**
- Uncomment API calls dalam JS files
- Data disimpan dalam MySQL database
- Permanent dan selamat

### Upgrade ke Production

1. Setup database menggunakan `database-setup.sql`
2. Update `config.php` dengan credentials betul
3. Create API endpoints di folder `/api`
4. Uncomment fetch() calls dalam JS files
5. Comment localStorage operations

## 🆕 Changelog

### Version 2.0 (Latest)
- ✨ NEW: Label printing page dengan QR Code
- ✨ NEW: Search functionality untuk pesakit
- ✨ NEW: Date range filter untuk senarai pesakit
- ✨ NEW: Export to CSV
- 🔧 Improved UI/UX
- 🔧 Better responsive design

### Version 1.0
- ✅ Basic CRUD operations
- ✅ Login system
- ✅ Dashboard dengan statistik
- ✅ Patient registration
- ✅ Sample collection
- ✅ Sample types management

## 🤝 Support

Untuk bantuan atau pertanyaan:
- Email: support@klinik.my
- Telefon: +60X-XXX-XXXX

## 📄 License

© 2026 Sistem Pengurusan Klinik. All rights reserved.

---

**Dibuat dengan ❤️ untuk kemudahan pengurusan klinik kesihatan**
