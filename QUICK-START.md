# 🚀 QUICK START GUIDE
## Sistem Pengurusan Klinik Kesihatan

### ⚡ Mula Dengan Cepat (5 Minit!)

#### 1️⃣ SETUP MUDAH (Tanpa Database)

**Cara Paling Mudah - Terus Guna!**

1. **Extract fail ZIP** ke mana-mana folder
2. **Double-click** `login.html` dalam browser
3. **Login** dengan:
   - Username: `admin`
   - Password: `admin123`
4. **Klik butang "Muat Data Demo"** di dashboard
5. **Refresh page** - Siap!

✅ Sistem boleh digunakan terus!
✅ Tiada installation diperlukan!
✅ Tiada database diperlukan untuk testing!

---

#### 2️⃣ SETUP LENGKAP (Dengan Database)

**Untuk Production / Penggunaan Sebenar**

**A. Menggunakan XAMPP (Windows/Mac/Linux)**

1. Download & Install XAMPP dari https://www.apachefriends.org/
2. Start Apache dan MySQL dari XAMPP Control Panel
3. Copy folder `klinik-system` ke dalam `C:\xampp\htdocs\`
4. Buka browser, pergi ke `http://localhost/phpmyadmin`
5. Create database baru: `klinik_db`
6. Import `database-setup.sql`:
   - Click "Import"
   - Choose file `database-setup.sql`
   - Click "Go"
7. Edit `config.php`:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_USER', 'root');
   define('DB_PASS', '');  // Kosongkan jika tiada password
   define('DB_NAME', 'klinik_db');
   ```
8. Buka browser: `http://localhost/klinik-system/login.html`
9. Login dengan admin/admin123

**B. Menggunakan PHP Built-in Server (Quick Test)**

```bash
cd klinik-system
php -S localhost:8000
```

Buka: `http://localhost:8000/login.html`

---

### 📋 CARA GUNA SISTEM

#### Login
- URL: `login.html`
- Username: `admin`
- Password: `admin123`

#### Dashboard
- Statistik ringkas
- Menu navigasi
- Aktiviti terkini
- Button "Muat Data Demo" (jika sistem kosong)

#### Daftar Pesakit Baru
1. Click "Pendaftaran Pesakit"
2. Isi maklumat (Nama & No. KP wajib)
3. Format No. KP auto: `123456-01-1234`
4. Click "Daftar Pesakit"

#### Cari & Filter Pesakit ⭐ (NEW!)
1. Buka "Senarai Pesakit"
2. **Carian**: Taip dalam kotak search
   - Boleh cari: Nama, No. KP, Alamat, Telefon
3. **Filter Tarikh**:
   - Pilih "Tarikh Mula" sahaja (dari tarikh ni ke depan)
   - Pilih "Tarikh Akhir" sahaja (dari awal sampai tarikh ni)
   - Pilih kedua-dua (range tarikh)
4. **Reset**: Click "Reset" untuk clear semua

#### Cetak Label Pesakit 🏷️ (NEW!)
1. Dari Senarai Pesakit, click "🏷️ Label"
   ATAU
   Buka `cetak-label.html` terus
2. Pilih pesakit
3. Set bilangan label (1-10)
4. Enable/disable QR Code
5. Click "🖨️ Cetak Label"
6. Label siap untuk print!

#### Rekod Sampel
1. Click "Pengambilan Sampel"
2. Pilih pesakit
3. Pilih jenis sampel
4. Masuk nama pegawai
5. Click "Rekod"

#### Urus Jenis Sampel
1. Click "Jenis Sampel"
2. Tambah/Edit/Padam jenis sampel
3. Jenis yang digunakan tak boleh padam

---

### 🎯 DEMO DATA

Data demo mengandungi:
- ✅ 5 pesakit sample
- ✅ 5 rekod sampel
- ✅ 4 jenis sampel

Untuk **muat data demo**:
1. Login ke dashboard
2. Click button "✨ Muat Data Demo"
3. Refresh page

Untuk **reset semua data**:
1. Buka Browser Console (F12)
2. Taip: `localStorage.clear()`
3. Refresh page

---

### 🔧 TROUBLESHOOTING

**Problem: Tak boleh login**
- Solution: Pastikan guna username `admin` dan password `admin123`
- Solution: Clear browser cache/cookies

**Problem: Data hilang**
- Reason: localStorage cleared atau tukar browser
- Solution: Muat demo data semula ATAU setup database

**Problem: Label tak print cantik**
- Solution: Guna Chrome atau Firefox
- Solution: Set paper size A4
- Solution: Enable background graphics dalam print settings

**Problem: QR Code tak keluar**
- Solution: Check internet connection (CDN library)
- Solution: Refresh page
- Solution: Clear browser cache

**Problem: Page blank/error**
- Solution: Check browser console (F12) untuk errors
- Solution: Pastikan semua files ada dalam folder yang betul
- Solution: Try buka dalam Incognito/Private mode

**Problem: PHP errors**
- Solution: Pastikan XAMPP Apache & MySQL running
- Solution: Check config.php credentials
- Solution: Import database-setup.sql

---

### 📱 BROWSER SUPPORT

✅ Google Chrome (Recommended)
✅ Mozilla Firefox
✅ Microsoft Edge
✅ Safari
❌ Internet Explorer (Not supported)

---

### 🔐 KESELAMATAN

**PENTING untuk Production:**

1. **Tukar password admin**
   - Edit dalam database users table
   - Use password hash: `password_hash('newpassword', PASSWORD_DEFAULT)`

2. **Enable HTTPS**
   - Get SSL certificate
   - Force HTTPS dalam config

3. **Database Security**
   - Jangan guna root user
   - Create dedicated DB user
   - Set strong password

4. **File Permissions**
   - config.php: 600 atau 644
   - uploads folder: 755
   - Jangan allow directory listing

---

### 📞 SUPPORT

Jika ada masalah:
1. Check README.md untuk detailed documentation
2. Check browser console untuk errors
3. Verify file structure betul
4. Make sure all dependencies loaded

---

### ✨ TIPS

1. **Testing Mode**: Guna localStorage (no database needed)
2. **Production Mode**: Setup database untuk permanent storage
3. **Backup Data**: Export CSV dari Senarai Pesakit
4. **Print Labels**: Best results dengan Chrome browser
5. **Mobile Access**: Responsive design, boleh guna di phone/tablet

---

**🎉 SELAMAT MENGGUNAKAN SISTEM!**

Sistem ini dibuat dengan mudah dan user-friendly.
Sesuai untuk klinik kecil hingga sederhana.

Have fun! 🚀
