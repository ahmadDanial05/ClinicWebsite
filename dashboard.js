/**
 * Dashboard Module
 * Displays statistics and recent activities
 */

// Load dashboard statistics
async function loadStatistics() {
    const statsGrid = document.getElementById('statsGrid');
    
    // Get data from localStorage (in production, this would be from API)
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const samples = JSON.parse(localStorage.getItem('samples') || '[]');
    const sampleTypes = JSON.parse(localStorage.getItem('sampleTypes') || '[]');
    
    // Calculate today's samples
    const today = new Date().toISOString().split('T')[0];
    const todaySamples = samples.filter(s => s.tarikh_ambil && s.tarikh_ambil.startsWith(today));
    
    const stats = [
        {
            icon: '👥',
            count: patients.length,
            label: 'Jumlah Pesakit',
            color: 'primary'
        },
        {
            icon: '💉',
            count: samples.length,
            label: 'Jumlah Sampel',
            color: 'success'
        },
        {
            icon: '📊',
            count: todaySamples.length,
            label: 'Sampel Hari Ini',
            color: 'warning'
        },
        {
            icon: '🧪',
            count: sampleTypes.length,
            label: 'Jenis Sampel',
            color: 'info'
        }
    ];
    
    statsGrid.innerHTML = stats.map(stat => `
        <div class="stat-card">
            <div class="stat-icon ${stat.color}">
                ${stat.icon}
            </div>
            <div class="stat-content">
                <h3>${stat.count}</h3>
                <p>${stat.label}</p>
            </div>
        </div>
    `).join('');
}

// Load recent activities
async function loadRecentActivities() {
    const container = document.getElementById('recentActivities');
    
    const samples = JSON.parse(localStorage.getItem('samples') || '[]');
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    
    // Get last 5 samples
    const recentSamples = samples
        .sort((a, b) => new Date(b.tarikh_ambil) - new Date(a.tarikh_ambil))
        .slice(0, 5);
    
    if (recentSamples.length === 0) {
        container.innerHTML = '<div class="no-data">Tiada aktiviti terkini</div>';
        return;
    }
    
    const activities = recentSamples.map(sample => {
        const patient = patients.find(p => p.id == sample.pesakit_id);
        const patientName = patient ? patient.nama : 'Tidak Diketahui';
        
        return `
            <div class="alert alert-info" style="margin-bottom: 0.5rem;">
                <div>
                    <strong>Pengambilan Sampel</strong><br>
                    Pesakit: ${patientName} | 
                    Jenis: ${sample.jenis_sampel} | 
                    Pegawai: ${sample.nama_pegawai} |
                    <small>${formatDateTime(sample.tarikh_ambil)}</small>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = activities;
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

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadStatistics();
    loadRecentActivities();
});
