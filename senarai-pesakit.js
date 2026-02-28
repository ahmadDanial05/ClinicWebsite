/**
 * Patient List Module
 * With Search and Date Filter functionality
 */

let allPatients = [];
let filteredPatients = [];

// Load all patients
function loadPatients() {
    allPatients = JSON.parse(localStorage.getItem('patients') || '[]');
    filteredPatients = [...allPatients];
    displayPatients();
}

// Display patients in table
function displayPatients() {
    const tbody = document.getElementById('tbodyPesakit');
    
    if (filteredPatients.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="no-data">Tiada data pesakit</td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = filteredPatients.map(patient => `
        <tr>
            <td><strong>P${String(patient.id).padStart(5, '0')}</strong></td>
            <td>${patient.nama}</td>
            <td>${patient.no_kad}</td>
            <td>${patient.alamat || '-'}</td>
            <td>${patient.no_telefon || '-'}</td>
            <td>${formatDate(patient.tarikh_daftar)}</td>
            <td>
                <button onclick="viewPatient(${patient.id})" class="btn btn-sm btn-primary" title="Lihat">
                    👁️ Lihat
                </button>
                <button onclick="printLabel(${patient.id})" class="btn btn-sm btn-success" title="Cetak Label">
                    🏷️ Label
                </button>
                <button onclick="deletePatient(${patient.id})" class="btn btn-sm btn-danger" title="Padam">
                    🗑️ Padam
                </button>
            </td>
        </tr>
    `).join('');
}

// Search patient function
function searchPatient() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const startDate = document.getElementById('filterStartDate')?.value;
    const endDate = document.getElementById('filterEndDate')?.value;
    
    filteredPatients = allPatients.filter(patient => {
        // Search filter
        const matchSearch = searchTerm === '' || 
            patient.nama.toLowerCase().includes(searchTerm) ||
            patient.no_kad.includes(searchTerm) ||
            patient.alamat?.toLowerCase().includes(searchTerm) ||
            patient.no_telefon?.includes(searchTerm);
        
        // Date filter
        let matchDate = true;
        if (startDate || endDate) {
            const patientDate = new Date(patient.tarikh_daftar);
            
            if (startDate) {
                const start = new Date(startDate);
                start.setHours(0, 0, 0, 0);
                matchDate = matchDate && patientDate >= start;
            }
            
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                matchDate = matchDate && patientDate <= end;
            }
        }
        
        return matchSearch && matchDate;
    });
    
    displayPatients();
    updateResultCount();
}

// Update result count
function updateResultCount() {
    const countEl = document.getElementById('resultCount');
    if (countEl) {
        countEl.textContent = `Menunjukkan ${filteredPatients.length} daripada ${allPatients.length} pesakit`;
    }
}

// Reset filters
function resetFilters() {
    document.getElementById('searchInput').value = '';
    if (document.getElementById('filterStartDate')) {
        document.getElementById('filterStartDate').value = '';
    }
    if (document.getElementById('filterEndDate')) {
        document.getElementById('filterEndDate').value = '';
    }
    
    filteredPatients = [...allPatients];
    displayPatients();
    updateResultCount();
}

// View patient details
function viewPatient(id) {
    const patient = allPatients.find(p => p.id === id);
    if (!patient) return;
    
    const samples = JSON.parse(localStorage.getItem('samples') || '[]');
    const patientSamples = samples.filter(s => s.pesakit_id == id);
    
    const modalContent = `
        <div style="background: white; padding: 2rem; border-radius: 12px; max-width: 600px; margin: 2rem auto;">
            <h2 style="color: var(--primary-color); margin-bottom: 1.5rem;">📋 Maklumat Pesakit</h2>
            
            <div style="background: var(--light-color); padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem;">
                <div style="margin-bottom: 0.75rem;">
                    <strong>ID Pesakit:</strong> P${String(patient.id).padStart(5, '0')}
                </div>
                <div style="margin-bottom: 0.75rem;">
                    <strong>Nama:</strong> ${patient.nama}
                </div>
                <div style="margin-bottom: 0.75rem;">
                    <strong>No. Kad Pengenalan:</strong> ${patient.no_kad}
                </div>
                <div style="margin-bottom: 0.75rem;">
                    <strong>Tarikh Lahir:</strong> ${formatDate(patient.tarikh_lahir) || '-'}
                </div>
                <div style="margin-bottom: 0.75rem;">
                    <strong>Jantina:</strong> ${patient.jantina || '-'}
                </div>
                <div style="margin-bottom: 0.75rem;">
                    <strong>Alamat:</strong> ${patient.alamat}
                </div>
                <div style="margin-bottom: 0.75rem;">
                    <strong>No. Telefon:</strong> ${patient.no_telefon || '-'}
                </div>
                <div style="margin-bottom: 0.75rem;">
                    <strong>Tarikh Daftar:</strong> ${formatDate(patient.tarikh_daftar)}
                </div>
            </div>
            
            <h3 style="margin-top: 1.5rem; margin-bottom: 1rem;">Rekod Sampel (${patientSamples.length})</h3>
            ${patientSamples.length > 0 ? `
                <div style="max-height: 200px; overflow-y: auto;">
                    ${patientSamples.map(s => `
                        <div style="background: #e0f2fe; padding: 0.75rem; border-radius: 6px; margin-bottom: 0.5rem;">
                            <strong>${s.jenis_sampel}</strong> - ${formatDate(s.tarikh_ambil)}<br>
                            <small>Pegawai: ${s.nama_pegawai}</small>
                        </div>
                    `).join('')}
                </div>
            ` : '<p style="color: var(--text-secondary);">Tiada rekod sampel</p>'}
            
            <div style="margin-top: 1.5rem; text-align: center;">
                <button onclick="closeModal()" class="btn btn-primary">Tutup</button>
            </div>
        </div>
    `;
    
    showModal(modalContent);
}

// Print label for patient
function printLabel(id) {
    localStorage.setItem('printPatientId', id);
    window.open('cetak-label.html', '_blank');
}

// Delete patient
function deletePatient(id) {
    const patient = allPatients.find(p => p.id === id);
    if (!patient) return;
    
    if (confirm(`Adakah anda pasti mahu memadam pesakit "${patient.nama}"?\n\nAmaran: Semua rekod sampel pesakit ini juga akan dipadam!`)) {
        // Delete patient
        allPatients = allPatients.filter(p => p.id !== id);
        localStorage.setItem('patients', JSON.stringify(allPatients));
        
        // Delete related samples
        let samples = JSON.parse(localStorage.getItem('samples') || '[]');
        samples = samples.filter(s => s.pesakit_id != id);
        localStorage.setItem('samples', JSON.stringify(samples));
        
        loadPatients();
        alert('✓ Pesakit berjaya dipadam');
    }
}

// Show modal
function showModal(content) {
    const modal = document.createElement('div');
    modal.id = 'customModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 9999;
        overflow-y: auto;
        padding: 2rem 1rem;
    `;
    modal.innerHTML = content;
    modal.onclick = function(e) {
        if (e.target === modal) closeModal();
    };
    document.body.appendChild(modal);
}

// Close modal
function closeModal() {
    const modal = document.getElementById('customModal');
    if (modal) modal.remove();
}

// Format date
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('ms-MY', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Export to CSV
function exportToCSV() {
    const headers = ['ID', 'Nama', 'No. KP', 'Tarikh Lahir', 'Jantina', 'Alamat', 'No. Telefon', 'Tarikh Daftar'];
    const csvContent = [
        headers.join(','),
        ...filteredPatients.map(p => [
            `P${String(p.id).padStart(5, '0')}`,
            `"${p.nama}"`,
            p.no_kad,
            p.tarikh_lahir || '',
            p.jantina || '',
            `"${p.alamat || ''}"`,
            p.no_telefon || '',
            formatDate(p.tarikh_daftar)
        ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `senarai-pesakit-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadPatients();
    
    // Setup event listeners for filters
    const startDate = document.getElementById('filterStartDate');
    const endDate = document.getElementById('filterEndDate');
    
    if (startDate) startDate.addEventListener('change', searchPatient);
    if (endDate) endDate.addEventListener('change', searchPatient);
});
