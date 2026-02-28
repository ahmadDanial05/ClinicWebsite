/**
 * Authentication Module
 * Handles login verification and session management
 */

// Check if user is logged in
function checkAuth() {
    // In production, this would check PHP session
    // For demo, we'll use localStorage
    const user = localStorage.getItem('currentUser');
    
    if (!user && !window.location.href.includes('login.html')) {
        window.location.href = 'login.html';
        return false;
    }
    
    if (user) {
        updateUserInfo();
    }
    
    return true;
}

// Update user info in header
function updateUserInfo() {
    const userInfoEl = document.getElementById('userInfo');
    if (userInfoEl) {
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        userInfoEl.innerHTML = `
            <span><strong>${user.full_name || 'Admin'}</strong> (${user.role || 'Admin'})</span>
            <a href="logout.php" class="btn btn-sm btn-danger" onclick="logout(event)">🚪 Log Keluar</a>
        `;
    }
}

// Logout function
function logout(e) {
    if (e) e.preventDefault();
    
    if (confirm('Adakah anda pasti mahu log keluar?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
}

// Initialize auth check on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAuth);
} else {
    checkAuth();
}
