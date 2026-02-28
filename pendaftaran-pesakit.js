/**
 * Patient Registration Module
 */

// Form submission
document.getElementById('formPendaftaran')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        id: Date.now(),
        nama: document.getElementById('nama').value,
        no_kad: document.getElementById('noKad').value,
        tarikh_lahir: document.getElementById('tarikhLahir').value,
        jantina: document.getElementById('jantina').value,
        alamat: document.getElementById('alamat').value,
        no_telefon: document.getElementById('noTelefon').value,
        tarikh_daftar: new Date().toISOString()
    };
    
    // Validate IC format
    const icPattern = /^\d{6}-\d{2}-\d{4}$/;
    if (!icPattern.test(formData.no_kad)) {
        showAlert('Format No. Kad Pengenalan tidak sah. Gunakan format: XXXXXX-XX-XXXX', 'danger');
        return;
    }
    
    // Check duplicate IC
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const duplicate = patients.find(p => p.no_kad === formData.no_kad);
    
    if (duplicate) {
        showAlert('No. Kad Pengenalan ini telah didaftarkan!', 'danger');
        return;
    }
    
    // Save to localStorage
    patients.push(formData);
    localStorage.setItem('patients', JSON.stringify(patients));
    
    showAlert('✓ Pesakit berjaya didaftarkan!', 'success');
    
    // Reset form
    setTimeout(() => {
        this.reset();
        window.location.href = 'senarai-pesakit.html';
    }, 1500);
});

// Show alert
function showAlert(message, type = 'info') {
    const container = document.getElementById('alertContainer');
    if (!container) return;
    
    container.innerHTML = `
        <div class="alert alert-${type}">
            ${message}
        </div>
    `;
    
    setTimeout(() => {
        container.innerHTML = '';
    }, 5000);
}

// Reset form
function resetForm() {
    if (confirm('Adakah anda pasti mahu reset borang ini?')) {
        document.getElementById('formPendaftaran').reset();
    }
}

// Auto-format IC number
document.getElementById('noKad')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 6) {
        value = value.slice(0, 6) + '-' + value.slice(6);
    }
    if (value.length > 9) {
        value = value.slice(0, 9) + '-' + value.slice(9);
    }
    if (value.length > 14) {
        value = value.slice(0, 14);
    }
    
    e.target.value = value;
});
