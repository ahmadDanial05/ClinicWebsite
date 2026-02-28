/**
 * Label Printing Module - OPTIMIZED FOR 7.62cm x 5.08cm
 * Compact layout to fit all content
 */

let selectedPatient = null;

// Load patients into select
function loadPatients() {
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const select = document.getElementById('selectPatient');
    
    if (!select) return;
    
    select.innerHTML = '<option value="">-- Pilih Pesakit --</option>';
    
    patients.forEach(patient => {
        const option = document.createElement('option');
        option.value = patient.id;
        option.textContent = `${patient.nama} (${patient.no_kad})`;
        select.appendChild(option);
    });
    
    // Check if patient ID was passed from other page
    const printPatientId = localStorage.getItem('printPatientId');
    if (printPatientId) {
        select.value = printPatientId;
        localStorage.removeItem('printPatientId');
        updateLabelPreview();
    }
}

// Update label preview
function updateLabelPreview() {
    const patientId = document.getElementById('selectPatient').value;
    const quantity = parseInt(document.getElementById('labelQuantity').value) || 1;
    const includeQR = document.getElementById('includeQR').checked;
    const previewContainer = document.getElementById('labelPreview');
    
    if (!patientId) {
        previewContainer.innerHTML = '<div class="no-data">Sila pilih pesakit untuk melihat pratonton label</div>';
        return;
    }
    
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    selectedPatient = patients.find(p => p.id == patientId);
    
    if (!selectedPatient) {
        previewContainer.innerHTML = '<div class="no-data">Pesakit tidak dijumpai</div>';
        return;
    }
    
    // Generate labels
    previewContainer.innerHTML = '';
    
    for (let i = 0; i < quantity; i++) {
        const labelDiv = createCompactLabel(selectedPatient, includeQR, i);
        previewContainer.appendChild(labelDiv);
    }
}

// Create compact label optimized for 7.62cm x 5.08cm
function createCompactLabel(patient, includeQR, index) {
    const labelDiv = document.createElement('div');
    labelDiv.className = 'label-item';
    labelDiv.id = `label-${index}`;
    
    const patientId = `P${String(patient.id).padStart(5, '0')}`;
    const currentDate = formatDateCompact(new Date());
    
    labelDiv.innerHTML = `
        <div class="label-header">
            <div class="logo">🏥</div>
            <h3>KLINIK KESIHATAN</h3>
            <p>Label Pengenalan Pesakit</p>
        </div>
        
        <div class="label-body">
            <div class="label-info">
                <div class="label-info-row">
                    <strong>Nama:</strong>
                    <span>${patient.nama}</span>
                </div>
                <div class="label-info-row">
                    <strong>No. KP:</strong>
                    <span>${patient.no_kad}</span>
                </div>
                ${patient.tarikh_lahir ? `
                <div class="label-info-row">
                    <strong>T.Lahir:</strong>
                    <span>${formatDateCompact(new Date(patient.tarikh_lahir))}</span>
                </div>
                ` : ''}
                ${patient.jantina ? `
                <div class="label-info-row">
                    <strong>Jantina:</strong>
                    <span>${patient.jantina}</span>
                </div>
                ` : ''}
                <div class="label-info-row">
                    <strong>ID:</strong>
                    <span>${patientId}</span>
                </div>
            </div>
            
            ${includeQR ? `
            <div class="qr-code-container">
                <div id="qrcode-${index}"></div>
            </div>
            ` : ''}
        </div>
        
        <div class="label-footer">
            Dicetak: ${currentDate}
        </div>
    `;
    
    // Generate QR code after adding to DOM
    if (includeQR) {
        setTimeout(() => {
            const qrElement = document.getElementById(`qrcode-${index}`);
            if (qrElement && typeof QRCode !== 'undefined') {
                qrElement.innerHTML = '';
                
                const qrData = JSON.stringify({
                    id: patientId,
                    nama: patient.nama,
                    no_kad: patient.no_kad,
                    type: 'patient'
                });
                
                try {
                    new QRCode(qrElement, {
                        text: qrData,
                        width: 55,
                        height: 55,
                        colorDark: "#000000",
                        colorLight: "#ffffff",
                        correctLevel: QRCode.CorrectLevel.L  // L = Low for smaller size
                    });
                } catch (error) {
                    console.error('QR Code error:', error);
                }
            }
        }, 100);
    }
    
    return labelDiv;
}

// Print labels
function printLabels() {
    if (!selectedPatient) {
        alert('Sila pilih pesakit terlebih dahulu');
        return;
    }
    
    updateLabelPreview();
    
    setTimeout(() => {
        window.print();
    }, 500);
}

// Generate PDF
function generatePDF() {
    if (!selectedPatient) {
        alert('Sila pilih pesakit terlebih dahulu');
        return;
    }
    
    const userConfirm = confirm(
        'Untuk export ke PDF:\n\n' +
        '1. Klik "🖨️ Cetak Label"\n' +
        '2. Pilih "Save as PDF" atau "Microsoft Print to PDF"\n' +
        '3. Set paper size: A4 Landscape\n' +
        '4. Klik Print/Save\n\n' +
        'Setiap label akan muncul di tengah kertas A4.\n\n' +
        'Teruskan?'
    );
    
    if (userConfirm) {
        printLabels();
    }
}

// Format date compact (for small label)
function formatDateCompact(date) {
    if (!date) return '-';
    
    try {
        const d = date.getDate();
        const m = date.getMonth() + 1;
        const y = date.getFullYear();
        
        return `${d}/${m}/${y}`;
    } catch (error) {
        return '-';
    }
}

// Format date readable
function formatDate(dateString) {
    if (!dateString) return '-';
    
    try {
        const date = new Date(dateString);
        const months = ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogos', 'Sep', 'Okt', 'Nov', 'Dis'];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        
        return `${day} ${month} ${year}`;
    } catch (error) {
        return dateString;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadPatients();
    
    // Add event listeners
    const selectPatient = document.getElementById('selectPatient');
    const labelQuantity = document.getElementById('labelQuantity');
    const includeQR = document.getElementById('includeQR');
    
    if (selectPatient) {
        selectPatient.addEventListener('change', updateLabelPreview);
    }
    
    if (labelQuantity) {
        labelQuantity.addEventListener('change', updateLabelPreview);
    }
    
    if (includeQR) {
        includeQR.addEventListener('change', updateLabelPreview);
    }
});