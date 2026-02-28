/**
 * Sample Types Management Module
 */

// Load sample types
function loadSampleTypes() {
    const sampleTypes = JSON.parse(localStorage.getItem('sampleTypes') || '[]');
    const container = document.getElementById('senaraiJenisSampel');
    
    if (sampleTypes.length === 0) {
        container.innerHTML = '<div class="no-data">Tiada jenis sampel. Sila tambah jenis sampel baru.</div>';
        return;
    }
    
    container.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nama Jenis Sampel</th>
                    <th>Tarikh Ditambah</th>
                    <th>Tindakan</th>
                </tr>
            </thead>
            <tbody>
                ${sampleTypes.map(type => `
                    <tr>
                        <td><strong>${type.id}</strong></td>
                        <td>${type.nama}</td>
                        <td>${formatDate(type.created_at)}</td>
                        <td>
                            <button onclick="editSampleType(${type.id})" class="btn btn-sm btn-warning">
                                ✏️ Edit
                            </button>
                            <button onclick="deleteSampleType(${type.id})" class="btn btn-sm btn-danger">
                                🗑️ Padam
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Add sample type
document.getElementById('formJenisSampel')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nama = document.getElementById('namaSampel').value.trim();
    
    if (!nama) {
        alert('Sila masukkan nama jenis sampel');
        return;
    }
    
    const sampleTypes = JSON.parse(localStorage.getItem('sampleTypes') || '[]');
    
    // Check duplicate
    const duplicate = sampleTypes.find(t => t.nama.toLowerCase() === nama.toLowerCase());
    if (duplicate) {
        alert('Jenis sampel ini telah wujud!');
        return;
    }
    
    const newType = {
        id: Date.now(),
        nama: nama,
        created_at: new Date().toISOString()
    };
    
    sampleTypes.push(newType);
    localStorage.setItem('sampleTypes', JSON.stringify(sampleTypes));
    
    alert('✓ Jenis sampel berjaya ditambah!');
    this.reset();
    loadSampleTypes();
});

// Edit sample type
function editSampleType(id) {
    const sampleTypes = JSON.parse(localStorage.getItem('sampleTypes') || '[]');
    const type = sampleTypes.find(t => t.id === id);
    
    if (!type) return;
    
    const newName = prompt('Masukkan nama baru untuk jenis sampel:', type.nama);
    
    if (newName && newName.trim()) {
        // Check duplicate
        const duplicate = sampleTypes.find(t => 
            t.id !== id && t.nama.toLowerCase() === newName.trim().toLowerCase()
        );
        
        if (duplicate) {
            alert('Nama jenis sampel ini telah wujud!');
            return;
        }
        
        type.nama = newName.trim();
        localStorage.setItem('sampleTypes', JSON.stringify(sampleTypes));
        
        alert('✓ Jenis sampel berjaya dikemaskini!');
        loadSampleTypes();
    }
}

// Delete sample type
function deleteSampleType(id) {
    const sampleTypes = JSON.parse(localStorage.getItem('sampleTypes') || '[]');
    const type = sampleTypes.find(t => t.id === id);
    
    if (!type) return;
    
    // Check if sample type is used in any samples
    const samples = JSON.parse(localStorage.getItem('samples') || '[]');
    const isUsed = samples.some(s => s.jenis_sampel === type.nama);
    
    if (isUsed) {
        alert('Jenis sampel ini tidak boleh dipadam kerana masih digunakan dalam rekod sampel!');
        return;
    }
    
    if (confirm(`Adakah anda pasti mahu memadam jenis sampel "${type.nama}"?`)) {
        const updated = sampleTypes.filter(t => t.id !== id);
        localStorage.setItem('sampleTypes', JSON.stringify(updated));
        
        alert('✓ Jenis sampel berjaya dipadam!');
        loadSampleTypes();
    }
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

// Initialize default sample types if empty
function initializeDefaultSampleTypes() {
    const sampleTypes = JSON.parse(localStorage.getItem('sampleTypes') || '[]');
    
    if (sampleTypes.length === 0) {
        const defaults = [
            { id: Date.now() + 1, nama: 'Darah Penuh', created_at: new Date().toISOString() },
            { id: Date.now() + 2, nama: 'Serum', created_at: new Date().toISOString() },
            { id: Date.now() + 3, nama: 'Plasma', created_at: new Date().toISOString() },
            { id: Date.now() + 4, nama: 'Urin', created_at: new Date().toISOString() }
        ];
        
        localStorage.setItem('sampleTypes', JSON.stringify(defaults));
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeDefaultSampleTypes();
    loadSampleTypes();
});
