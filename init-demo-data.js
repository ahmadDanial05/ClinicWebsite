/**
 * Initialize Demo Data
 * Run this once to populate localStorage with sample data
 */

function initializeDemoData() {
    // Check if data already exists
    if (localStorage.getItem('demoDataInitialized') === 'true') {
        console.log('Demo data already initialized');
        return;
    }
    
    // Sample Types
    const sampleTypes = [
        { id: 1, nama: 'Darah Penuh', created_at: '2026-01-15T08:00:00' },
        { id: 2, nama: 'Serum', created_at: '2026-01-15T08:00:00' },
        { id: 3, nama: 'Plasma', created_at: '2026-01-15T08:00:00' },
        { id: 4, nama: 'Urin', created_at: '2026-01-15T08:00:00' }
    ];
    
    // Sample Patients
    const patients = [
        {
            id: 1001,
            nama: 'Ahmad bin Abdullah',
            no_kad: '850123-01-1234',
            tarikh_lahir: '1985-01-23',
            jantina: 'Lelaki',
            alamat: 'No. 123, Jalan Merdeka, Taman Bahagia, 28000 Temerloh, Pahang',
            no_telefon: '013-2345678',
            tarikh_daftar: '2026-01-10T09:30:00'
        },
        {
            id: 1002,
            nama: 'Siti Nurhaliza binti Hassan',
            no_kad: '920315-02-5678',
            tarikh_lahir: '1992-03-15',
            jantina: 'Perempuan',
            alamat: 'No. 45, Jalan Damai, Taman Sejahtera, 28000 Temerloh, Pahang',
            no_telefon: '019-8765432',
            tarikh_daftar: '2026-01-12T10:15:00'
        },
        {
            id: 1003,
            nama: 'Rajesh Kumar a/l Subramaniam',
            no_kad: '780908-03-9012',
            tarikh_lahir: '1978-09-08',
            jantina: 'Lelaki',
            alamat: 'No. 78, Jalan Perdana, Taman Indah, 28000 Temerloh, Pahang',
            no_telefon: '012-3456789',
            tarikh_daftar: '2026-01-15T14:20:00'
        },
        {
            id: 1004,
            nama: 'Nurul Ain binti Mohammad',
            no_kad: '950622-02-3456',
            tarikh_lahir: '1995-06-22',
            jantina: 'Perempuan',
            alamat: 'No. 234, Jalan Harmoni, Bandar Baru, 28000 Temerloh, Pahang',
            no_telefon: '011-9876543',
            tarikh_daftar: '2026-02-01T08:45:00'
        },
        {
            id: 1005,
            nama: 'Tan Ah Kow',
            no_kad: '880415-05-7890',
            tarikh_lahir: '1988-04-15',
            jantina: 'Lelaki',
            alamat: 'No. 56, Jalan Cemerlang, Taman Mesra, 28000 Temerloh, Pahang',
            no_telefon: '016-7654321',
            tarikh_daftar: '2026-02-05T11:00:00'
        }
    ];
    
    // Sample Collections
    const samples = [
        {
            id: Date.now() + 1,
            pesakit_id: 1001,
            jenis_sampel: 'Darah Penuh',
            nama_pegawai: 'Nurse Aminah',
            nota: 'Puasa 8 jam',
            tarikh_ambil: '2026-02-08T08:30:00'
        },
        {
            id: Date.now() + 2,
            pesakit_id: 1001,
            jenis_sampel: 'Serum',
            nama_pegawai: 'Nurse Fatimah',
            nota: 'Untuk ujian fungsi hati',
            tarikh_ambil: '2026-02-09T09:15:00'
        },
        {
            id: Date.now() + 3,
            pesakit_id: 1002,
            jenis_sampel: 'Darah Penuh',
            nama_pegawai: 'Nurse Aminah',
            nota: '',
            tarikh_ambil: '2026-02-08T10:00:00'
        },
        {
            id: Date.now() + 4,
            pesakit_id: 1003,
            jenis_sampel: 'Urin',
            nama_pegawai: 'Nurse Salmah',
            nota: 'Ujian rutin',
            tarikh_ambil: '2026-02-10T14:30:00'
        },
        {
            id: Date.now() + 5,
            pesakit_id: 1004,
            jenis_sampel: 'Plasma',
            nama_pegawai: 'Nurse Fatimah',
            nota: 'Untuk ujian kolesterol',
            tarikh_ambil: '2026-02-11T08:00:00'
        }
    ];
    
    // Save to localStorage
    localStorage.setItem('sampleTypes', JSON.stringify(sampleTypes));
    localStorage.setItem('patients', JSON.stringify(patients));
    localStorage.setItem('samples', JSON.stringify(samples));
    localStorage.setItem('demoDataInitialized', 'true');
    
    console.log('✅ Demo data initialized successfully!');
    console.log('📊 Statistics:');
    console.log(`   - ${sampleTypes.length} sample types`);
    console.log(`   - ${patients.length} patients`);
    console.log(`   - ${samples.length} sample records`);
    
    alert('✅ Data demo berjaya dimuat!\n\nSila refresh halaman untuk melihat data.');
}

// Auto-initialize if called from HTML
if (typeof window !== 'undefined') {
    window.initializeDemoData = initializeDemoData;
}
