/**
 * Sample Collection Module
 */

// Load patients into select dropdown
function loadPatientSelect() {
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const select = document.getElementById('selectPesakit');
    
    if (!select) return;
    
    select.innerHTML = '<option value="">-- Pilih Pesakit --</option>';
    
    patients.forEach(patient => {
        const option = document.createElement('option');
        option.value = patient.id;
        option.textContent = `${patient.nama} (${patient.no_kad})`;
        select.appendChild(option);
    });
}

// Load sample types into select
function loadSampleTypeSelect() {
    const sampleTypes = JSON.parse(localStorage.getItem('sampleTypes') || '[]');
    const select = document.getElementById('jenisSampelSelect');
    
    if (!select) return;
    
    select.innerHTML = '<option value="">-- Pilih Jenis Sampel --</option>';
    
    sampleTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type.nama;
        option.textContent = type.nama;
        select.appendChild(option);
    });
}

// Show patient info when selected
document.getElementById('selectPesakit')?.addEventListener('change', function() {
    const patientId = this.value;
    const infoBox = document.getElementById('maklumatPesakit');
    
    if (!patientId) {
        infoBox.style.display = 'none';
        return;
    }
    
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const patient = patients.find(p => p.id == patientId);
    
    if (patient) {
        document.getElementById('infoPesakitNama').textContent = patient.nama;
        document.getElementById('infoPesakitKP').textContent = patient.no_kad;
        document.getElementById('infoPesakitID').textContent = `P${String(patient.id).padStart(5, '0')}`;
        infoBox.style.display = 'block';
    }
});

// Submit sample collection form
document.getElementById('formSampel')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        id: Date.now(),
        pesakit_id: document.getElementById('selectPesakit').value,
        jenis_sampel: document.getElementById('jenisSampelSelect').value,
        nama_pegawai: document.getElementById('namaPegawai').value,
        nota: document.getElementById('notaSampel').value,
        tarikh_ambil: new Date().toISOString()
    };
    
    if (!formData.pesakit_id) {
        alert('Sila pilih pesakit');
        return;
    }
    
    if (!formData.jenis_sampel) {
        alert('Sila pilih jenis sampel');
        return;
    }
    
    // Save sample
    const samples = JSON.parse(localStorage.getItem('samples') || '[]');
    samples.push(formData);
    localStorage.setItem('samples', JSON.stringify(samples));
    
    alert('✓ Rekod pengambilan sampel berjaya disimpan!');
    
    this.reset();
    document.getElementById('maklumatPesakit').style.display = 'none';
    
    loadSampleRecords();
});

// Load sample records
function loadSampleRecords() {
    const samples = JSON.parse(localStorage.getItem('samples') || '[]');
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const container = document.getElementById('senaraiSampel');
    
    if (!container) return;
    
    if (samples.length === 0) {
        container.innerHTML = '<div class="no-data">Tiada rekod pengambilan sampel</div>';
        return;
    }
    
    // Sort by latest first
    const sortedSamples = samples.sort((a, b) => 
        new Date(b.tarikh_ambil) - new Date(a.tarikh_ambil)
    );
    
    container.innerHTML = `
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID Sampel</th>
                        <th>Pesakit</th>
                        <th>No. KP</th>
                        <th>Jenis Sampel</th>
                        <th>Pegawai</th>
                        <th>Tarikh & Masa</th>
                        <th>Tindakan</th>
                    </tr>
                </thead>
                <tbody>
                    ${sortedSamples.map(sample => {
                        const patient = patients.find(p => p.id == sample.pesakit_id);
                        return `
                            <tr>
                                <td><strong>S${String(sample.id).slice(-5)}</strong></td>
                                <td>${patient ? patient.nama : 'Tidak Diketahui'}</td>
                                <td>${patient ? patient.no_kad : '-'}</td>
                                <td><span class="badge badge-primary">${sample.jenis_sampel}</span></td>
                                <td>${sample.nama_pegawai}</td>
                                <td>${formatDateTime(sample.tarikh_ambil)}</td>
                                <td>
                                    <button onclick="viewSample(${sample.id})" class="btn btn-sm btn-primary">
                                        👁️ Lihat
                                    </button>
                                    <button onclick="deleteSample(${sample.id})" class="btn btn-sm btn-danger">
                                        🗑️ Padam
                                    </button>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// View sample details
function viewSample(id) {
    const samples = JSON.parse(localStorage.getItem('samples') || '[]');
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const sample = samples.find(s => s.id === id);
    
    if (!sample) return;
    
    const patient = patients.find(p => p.id == sample.pesakit_id);
    
    const modalContent = `
        <div style="background: white; padding: 2rem; border-radius: 12px; max-width: 600px; margin: 2rem auto;">
            <h2 style="color: var(--primary-color); margin-bottom: 1.5rem;">💉 Maklumat Sampel</h2>
            
            <div style="background: var(--light-color); padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem;">
                <div style="margin-bottom: 0.75rem;">
                    <strong>ID Sampel:</strong> S${String(sample.id).slice(-5)}
                </div>
                <div style="margin-bottom: 0.75rem;">
                    <strong>Pesakit:</strong> ${patient ? patient.nama : 'Tidak Diketahui'}
                </div>
                <div style="margin-bottom: 0.75rem;">
                    <strong>No. Kad Pengenalan:</strong> ${patient ? patient.no_kad : '-'}
                </div>
                <div style="margin-bottom: 0.75rem;">
                    <strong>Jenis Sampel:</strong> <span class="badge badge-primary">${sample.jenis_sampel}</span>
                </div>
                <div style="margin-bottom: 0.75rem;">
                    <strong>Nama Pegawai:</strong> ${sample.nama_pegawai}
                </div>
                <div style="margin-bottom: 0.75rem;">
                    <strong>Tarikh & Masa Pengambilan:</strong> ${formatDateTime(sample.tarikh_ambil)}
                </div>
                ${sample.nota ? `
                    <div style="margin-bottom: 0.75rem;">
                        <strong>Nota:</strong><br>
                        <div style="background: white; padding: 0.75rem; border-radius: 6px; margin-top: 0.5rem;">
                            ${sample.nota}
                        </div>
                    </div>
                ` : ''}
            </div>
            
            <div style="margin-top: 1.5rem; text-align: center;">
                <button onclick="closeModal()" class="btn btn-primary">Tutup</button>
            </div>
        </div>
    `;
    
    showModal(modalContent);
}

// Delete sample
function deleteSample(id) {
    if (confirm('Adakah anda pasti mahu memadam rekod sampel ini?')) {
        let samples = JSON.parse(localStorage.getItem('samples') || '[]');
        samples = samples.filter(s => s.id !== id);
        localStorage.setItem('samples', JSON.stringify(samples));
        
        alert('✓ Rekod sampel berjaya dipadam');
        loadSampleRecords();
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

// Format date time
function formatDateTime(datetime) {
    if (!datetime) return '-';
    const date = new Date(datetime);
    return date.toLocaleString('ms-MY', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadPatientSelect();
    loadSampleTypeSelect();
    loadSampleRecords();
});
