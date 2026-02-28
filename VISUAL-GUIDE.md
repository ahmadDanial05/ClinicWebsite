# 📸 PANDUAN VISUAL
## Sistem Pengurusan Klinik Kesihatan

---

## 🎨 TEMA & DESIGN

**Color Scheme:**
- Primary: Blue Gradient (#2563eb → #1e40af)
- Secondary: Green (#10b981)
- Background: Purple Gradient (#667eea → #764ba2)
- Cards: White dengan shadow
- Text: Dark Gray (#111827)

**Design Style:**
- Modern & Clean
- Card-based layout
- Gradient buttons
- Smooth animations
- Professional look

---

## 📱 HALAMAN-HALAMAN SISTEM

### 1. 🔐 LOGIN PAGE (login.html)

**Layout:**
```
┌─────────────────────────────────────┐
│   Purple Gradient Background        │
│                                      │
│   ┌─────────────────────────┐      │
│   │   🏥 Sistem Pengurusan   │      │
│   │        Klinik            │      │
│   │                          │      │
│   │   [Username Input]       │      │
│   │   [Password Input] 🔒    │      │
│   │                          │      │
│   │   [🔐 Log Masuk Button]  │      │
│   │                          │      │
│   │   Demo Login:            │      │
│   │   admin / admin123       │      │
│   └─────────────────────────┘      │
│                                      │
└─────────────────────────────────────┘
```

**Features:**
- Centered login box
- White card dengan shadow
- Password toggle (🔒/🔓)
- Demo credentials visible
- Responsive design

---

### 2. 📊 DASHBOARD (index.html)

**Header:**
```
┌──────────────────────────────────────────────┐
│ 🏥 Sistem Pengurusan Klinik                  │
│ Dashboard Utama                               │
│                    [User Info] [🚪 Log Keluar]│
└──────────────────────────────────────────────┘
```

**Statistics Grid:**
```
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ 👥       │ │ 💉       │ │ 📊       │ │ 🧪       │
│ 5        │ │ 10       │ │ 3        │ │ 4        │
│ Pesakit  │ │ Sampel   │ │ Hari Ini │ │ Jenis    │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
```

**Quick Actions:**
```
┌───────────────┐ ┌───────────────┐
│ 📝            │ │ 👥            │
│ Pendaftaran   │ │ Senarai       │
│ Pesakit       │ │ Pesakit       │
└───────────────┘ └───────────────┘

┌───────────────┐ ┌───────────────┐
│ 💉            │ │ 🧪            │
│ Pengambilan   │ │ Jenis         │
│ Sampel        │ │ Sampel        │
└───────────────┘ └───────────────┘
```

**Demo Data Popup:**
```
┌────────────────────────┐
│ 📊 Data Demo           │
│                        │
│ Sistem kosong.         │
│ Muat data demo?        │
│                        │
│ [✨ Muat Data Demo]    │
└────────────────────────┘
```

---

### 3. 📝 PENDAFTARAN PESAKIT (pendaftaran-pesakit.html)

**Form Layout:**
```
Dashboard / Pendaftaran Pesakit

┌────────────────────────────────────────┐
│ Pendaftaran Pesakit Baru               │
│                                        │
│ [Nama Penuh*]        [No. KP*]        │
│                                        │
│ [Tarikh Lahir]       [Jantina ▼]      │
│                                        │
│ [Alamat*                              ]│
│ [                                     ]│
│                                        │
│ [No. Telefon]                          │
│                                        │
│ [✓ Daftar] [↺ Reset] [← Kembali]      │
└────────────────────────────────────────┘
```

**Features:**
- 2-column grid for inputs
- Auto-format No. KP
- Validation indicators
- Success notification
- Action buttons

---

### 4. 👥 SENARAI PESAKIT (senarai-pesakit.html) ⭐ UPDATED!

**Filter Section:** ⭐ NEW!
```
┌────────────────────────────────────────┐
│ 🔍 Carian & Penapis                    │
│                                        │
│ [Cari Pesakit...]                     │
│ [Tarikh Mula] [Tarikh Akhir] [🔄 Reset]│
│                                        │
│ Menunjukkan 3 daripada 5 pesakit       │
└────────────────────────────────────────┘
```

**Table:**
```
┌──────┬───────┬────────┬────────┬────────┬────────┬──────────┐
│ ID   │ Nama  │ No. KP │ Alamat │ Telefon│ Tarikh │ Tindakan │
├──────┼───────┼────────┼────────┼────────┼────────┼──────────┤
│P00001│Ahmad  │123456..│ Jln... │ 013-.. │ 10 Jan │[👁️][🏷️][🗑️]│
│P00002│Siti   │654321..│ Jln... │ 019-.. │ 12 Jan │[👁️][🏷️][🗑️]│
└──────┴───────┴────────┴────────┴────────┴────────┴──────────┘

[+ Daftar Baru] [📊 Export CSV] [← Kembali]
```

**View Modal:**
```
┌──────────────────────────────┐
│ 📋 Maklumat Pesakit          │
│                              │
│ ID: P00001                   │
│ Nama: Ahmad bin Abdullah     │
│ No. KP: 123456-01-1234      │
│ Jantina: Lelaki              │
│ Alamat: ...                  │
│                              │
│ Rekod Sampel (2)             │
│ ┌──────────────────────┐    │
│ │ Darah Penuh          │    │
│ │ 8 Feb 2026           │    │
│ └──────────────────────┘    │
│                              │
│        [Tutup]               │
└──────────────────────────────┘
```

---

### 5. 🏷️ CETAK LABEL (cetak-label.html) ⭐ NEW!

**Selection Panel:**
```
Dashboard / Senarai Pesakit / Cetak Label

┌────────────────────────────────────────┐
│ Pilih Pesakit untuk Cetak Label       │
│                                        │
│ Pilih Pesakit:                         │
│ [Ahmad bin Abdullah (123456-01-1234) ▼]│
│                                        │
│ Bilangan Label: [1]                    │
│                                        │
│ ☑ Sertakan QR Code                     │
│                                        │
│ [🖨️ Cetak] [📄 Download] [← Kembali]  │
└────────────────────────────────────────┘
```

**Label Preview:**
```
┌────────────────────────────┐
│ ┌────────────────────────┐ │
│ │ 🏥 KLINIK KESIHATAN    │ │
│ │ Label Pengenalan Pesakit│ │
│ ├────────────────────────┤ │
│ │ ID:      P00001        │ │
│ │ Nama:    Ahmad bin...  │ │
│ │ No. KP:  123456-01-1234│ │
│ │ T.Lahir: 23 Jan 1985   │ │
│ │ Jantina: Lelaki        │ │
│ │                        │ │
│ │              ┌──────┐  │ │
│ │              │ QR   │  │ │
│ │              │ CODE │  │ │
│ │              └──────┘  │ │
│ ├────────────────────────┤ │
│ │ Dicetak: 11 Feb 2026   │ │
│ └────────────────────────┘ │
└────────────────────────────┘
```

**Label Features:**
- Border design
- QR Code (80x80px)
- Professional layout
- Print-optimized
- 100mm x 60mm size

---

### 6. 💉 PENGAMBILAN SAMPEL (pengambilan-sampel.html)

**Form:**
```
Dashboard / Pengambilan Sampel

┌────────────────────────────────────────┐
│ Pengambilan Sampel Baru                │
│                                        │
│ Pilih Pesakit:                         │
│ [Ahmad bin Abdullah (123456...) ▼]     │
│                                        │
│ ┌────────────────────────────────────┐│
│ │ Maklumat Pesakit                   ││
│ │ Nama: Ahmad bin Abdullah           ││
│ │ No. KP: 123456-01-1234            ││
│ │ ID: P00001                        ││
│ └────────────────────────────────────┘│
│                                        │
│ [Jenis Sampel ▼]  [Nama Pegawai]     │
│                                        │
│ [Nota / Remarks                       ]│
│ [                                     ]│
│                                        │
│ [✓ Rekod Sampel] [← Kembali]          │
└────────────────────────────────────────┘
```

**Records Table:**
```
┌────────────────────────────────────────┐
│ Rekod Pengambilan Sampel               │
│                                        │
│ ┌──┬────┬──────┬──────┬──────┬──────┐│
│ │ID│Nama│No.KP │Jenis │Tarikh│Action││
│ ├──┼────┼──────┼──────┼──────┼──────┤│
│ │S1│Ahmad│123..│Darah │8 Feb │[👁️][🗑️]││
│ └──┴────┴──────┴──────┴──────┴──────┘│
└────────────────────────────────────────┘
```

---

### 7. 🧪 JENIS SAMPEL (jenis-sampel.html)

**Add Form:**
```
Dashboard / Jenis Sampel

┌────────────────────────────────────────┐
│ Tambah Jenis Sampel Baru               │
│                                        │
│ [Nama Jenis Sampel*] [+ Tambah]       │
└────────────────────────────────────────┘
```

**List Table:**
```
┌────────────────────────────────────────┐
│ Senarai Jenis Sampel                   │
│                                        │
│ ┌───┬────────────┬────────┬─────────┐ │
│ │ ID│ Nama       │ Tarikh │ Tindakan│ │
│ ├───┼────────────┼────────┼─────────┤ │
│ │ 1 │Darah Penuh │15 Jan  │[✏️][🗑️] │ │
│ │ 2 │Serum       │15 Jan  │[✏️][🗑️] │ │
│ └───┴────────────┴────────┴─────────┘ │
└────────────────────────────────────────┘
```

---

## 🎨 COLOR CODING

**Buttons:**
- Primary (Blue): Main actions
- Success (Green): Positive actions
- Danger (Red): Delete/Remove
- Warning (Orange): Edit/Modify
- Secondary (Gray): Cancel/Reset
- Outline: Back/Navigate

**Badges:**
- Primary (Blue): Sample types
- Success (Green): Active status
- Warning (Orange): Pending

**Alerts:**
- Success (Green): Operation successful
- Danger (Red): Error occurred
- Info (Blue): Information

---

## 📐 LAYOUT STRUCTURE

**Breakpoints:**
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: 375px - 767px

**Grid System:**
- Stats: 4 columns (desktop) → 1 column (mobile)
- Actions: 4 columns (desktop) → 1 column (mobile)
- Forms: 2 columns (desktop) → 1 column (mobile)
- Tables: Horizontal scroll (mobile)

---

## 🖼️ VISUAL ELEMENTS

### Icons Used (Emoji)
- 🏥 - Hospital/Clinic
- 👥 - Patients/People
- 💉 - Injection/Sample
- 🧪 - Lab/Test
- 📊 - Statistics
- 📝 - Registration
- 🏷️ - Label/Tag
- 🔍 - Search
- 🔐 - Login/Security
- ✓ - Success/Confirm
- 🗑️ - Delete
- ✏️ - Edit
- 👁️ - View
- 📄 - Document
- 🚪 - Logout
- ← - Back
- ↺ - Reset

### Card Effects
- Hover: translateY(-5px)
- Shadow: Increases on hover
- Transition: smooth 0.3s
- Border-radius: 12px

### Button Effects
- Hover: darker shade
- Hover: translateY(-2px)
- Active: scale(0.98)
- Transition: all 0.3s ease

---

## 📱 RESPONSIVE BEHAVIOR

**Mobile View Changes:**
1. Stats cards stack vertically
2. Action cards stack vertically
3. Form inputs full width
4. Tables scroll horizontally
5. Buttons full width
6. Smaller fonts
7. Reduced padding

**Tablet View:**
- 2-column grids
- Optimized spacing
- Medium-sized buttons

---

## 🎯 USER FLOW

```
1. Login
   ↓
2. Dashboard (view stats)
   ↓
3. Choose Action:
   ├→ Daftar Pesakit Baru
   ├→ Lihat Senarai (Search/Filter) → Cetak Label
   ├→ Ambil Sampel
   └→ Urus Jenis Sampel
   ↓
4. Complete Task
   ↓
5. Back to Dashboard / Logout
```

---

**Sistem direka untuk:**
✅ Kemudahan penggunaan
✅ Pengalaman pengguna yang baik
✅ Rupa professional
✅ Navigasi mudah
✅ Responsif di semua peranti

---

*Panduan Visual v2.0 - February 2026*
