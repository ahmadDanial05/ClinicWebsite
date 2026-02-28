-- ================================================
-- DATABASE SETUP FOR SISTEM PENGURUSAN KLINIK
-- ================================================

-- Create database
CREATE DATABASE IF NOT EXISTS klinik_db;
USE klinik_db;

-- ================================================
-- USERS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    role ENUM('Admin', 'Doctor', 'Nurse', 'Staff') DEFAULT 'Staff',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    INDEX idx_username (username),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default admin user (password: admin123)
INSERT INTO users (username, password_hash, full_name, email, role) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrator', 'admin@klinik.my', 'Admin');

-- ================================================
-- PATIENTS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS patients (
    patient_id INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(150) NOT NULL,
    no_kad_pengenalan VARCHAR(20) UNIQUE NOT NULL,
    tarikh_lahir DATE,
    jantina ENUM('Lelaki', 'Perempuan') DEFAULT NULL,
    alamat TEXT,
    no_telefon VARCHAR(20),
    tarikh_daftar TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_no_kad (no_kad_pengenalan),
    INDEX idx_nama (nama),
    INDEX idx_tarikh_daftar (tarikh_daftar),
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ================================================
-- SAMPLE TYPES TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS sample_types (
    sample_type_id INT PRIMARY KEY AUTO_INCREMENT,
    nama_jenis VARCHAR(100) UNIQUE NOT NULL,
    keterangan TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    INDEX idx_nama_jenis (nama_jenis),
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default sample types
INSERT INTO sample_types (nama_jenis, keterangan) VALUES
('Darah Penuh', 'Whole Blood - Untuk ujian darah lengkap'),
('Serum', 'Serum - Darah tanpa fibrinogen'),
('Plasma', 'Plasma - Bahagian cecair darah'),
('Urin', 'Urine sample');

-- ================================================
-- SAMPLES TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS samples (
    sample_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    sample_type_id INT NOT NULL,
    nama_pegawai VARCHAR(100) NOT NULL,
    tarikh_ambil TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    nota TEXT,
    status ENUM('Pending', 'Processing', 'Completed', 'Rejected') DEFAULT 'Pending',
    created_by INT,
    INDEX idx_patient (patient_id),
    INDEX idx_sample_type (sample_type_id),
    INDEX idx_tarikh_ambil (tarikh_ambil),
    INDEX idx_status (status),
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (sample_type_id) REFERENCES sample_types(sample_type_id) ON DELETE RESTRICT,
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ================================================
-- AUDIT LOG TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS audit_log (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    action_type VARCHAR(50) NOT NULL,
    action_details TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user (user_id),
    INDEX idx_action_type (action_type),
    INDEX idx_created_at (created_at),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ================================================
-- VIEWS FOR REPORTING
-- ================================================

-- View: Sample Statistics
CREATE OR REPLACE VIEW view_sample_statistics AS
SELECT 
    DATE(s.tarikh_ambil) as tarikh,
    st.nama_jenis,
    COUNT(*) as jumlah_sampel
FROM samples s
JOIN sample_types st ON s.sample_type_id = st.sample_type_id
GROUP BY DATE(s.tarikh_ambil), st.nama_jenis
ORDER BY tarikh DESC;

-- View: Patient Summary
CREATE OR REPLACE VIEW view_patient_summary AS
SELECT 
    p.patient_id,
    p.nama,
    p.no_kad_pengenalan,
    p.tarikh_daftar,
    COUNT(s.sample_id) as jumlah_sampel
FROM patients p
LEFT JOIN samples s ON p.patient_id = s.patient_id
WHERE p.is_active = TRUE
GROUP BY p.patient_id
ORDER BY p.tarikh_daftar DESC;

-- ================================================
-- STORED PROCEDURES
-- ================================================

DELIMITER //

-- Procedure: Register new patient
CREATE PROCEDURE sp_register_patient(
    IN p_nama VARCHAR(150),
    IN p_no_kad VARCHAR(20),
    IN p_tarikh_lahir DATE,
    IN p_jantina VARCHAR(10),
    IN p_alamat TEXT,
    IN p_no_telefon VARCHAR(20),
    IN p_created_by INT
)
BEGIN
    INSERT INTO patients (nama, no_kad_pengenalan, tarikh_lahir, jantina, alamat, no_telefon, created_by)
    VALUES (p_nama, p_no_kad, p_tarikh_lahir, p_jantina, p_alamat, p_no_telefon, p_created_by);
    
    SELECT LAST_INSERT_ID() as patient_id;
END //

-- Procedure: Record sample collection
CREATE PROCEDURE sp_record_sample(
    IN p_patient_id INT,
    IN p_sample_type_id INT,
    IN p_nama_pegawai VARCHAR(100),
    IN p_nota TEXT,
    IN p_created_by INT
)
BEGIN
    INSERT INTO samples (patient_id, sample_type_id, nama_pegawai, nota, created_by)
    VALUES (p_patient_id, p_sample_type_id, p_nama_pegawai, p_nota, p_created_by);
    
    SELECT LAST_INSERT_ID() as sample_id;
END //

DELIMITER ;

-- ================================================
-- GRANT PERMISSIONS (Adjust as needed)
-- ================================================
-- GRANT ALL PRIVILEGES ON klinik_db.* TO 'klinik_user'@'localhost' IDENTIFIED BY 'your_password';
-- FLUSH PRIVILEGES;

-- ================================================
-- END OF SETUP
-- ================================================
