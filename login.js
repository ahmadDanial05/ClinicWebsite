/**
 * Login Module
 */

// Handle login form submission
document.getElementById('formLogin')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorEl = document.getElementById('loginError');
    
    // Clear previous error
    errorEl.style.display = 'none';
    
    // Demo credentials - In production, this would call login-process.php
    if (username === 'admin' && password === 'admin123') {
        // Set user session
        const user = {
            user_id: 1,
            username: 'admin',
            full_name: 'Administrator',
            email: 'admin@klinik.my',
            role: 'Admin',
            login_time: new Date().toISOString()
        };
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Redirect to dashboard
        window.location.href = 'index.html';
    } else {
        // Show error
        errorEl.textContent = 'Nama pengguna atau kata laluan tidak sah';
        errorEl.style.display = 'block';
    }
});

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.getElementById('togglePassword');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '🔓';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '🔒';
    }
}

// Check if already logged in
if (localStorage.getItem('currentUser')) {
    window.location.href = 'index.html';
}
