<?php
/**
 * Session Check Middleware
 * Include this at the top of protected pages
 */

require_once 'config.php';

// Check if user is logged in
function check_login() {
    if (!isset($_SESSION['user_id']) || empty($_SESSION['user_id'])) {
        // Not logged in - redirect to login
        header('Location: login.html');
        exit;
    }
    
    // Check session timeout (optional - 30 minutes)
    $timeout_duration = 1800; // 30 minutes in seconds
    
    if (isset($_SESSION['last_activity']) && 
        (time() - $_SESSION['last_activity']) > $timeout_duration) {
        // Session expired
        session_unset();
        session_destroy();
        header('Location: login.html?timeout=1');
        exit;
    }
    
    // Update last activity time
    $_SESSION['last_activity'] = time();
}

// Check if user has required role
function check_role($required_roles = []) {
    if (empty($required_roles)) {
        return true;
    }
    
    if (!isset($_SESSION['role'])) {
        return false;
    }
    
    return in_array($_SESSION['role'], $required_roles);
}

// Get current user info
function get_current_user() {
    return [
        'user_id' => $_SESSION['user_id'] ?? null,
        'username' => $_SESSION['username'] ?? null,
        'full_name' => $_SESSION['full_name'] ?? null,
        'email' => $_SESSION['email'] ?? null,
        'role' => $_SESSION['role'] ?? null,
        'login_time' => $_SESSION['login_time'] ?? null
    ];
}

// CSRF token generation
function generate_csrf_token() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

// CSRF token validation
function verify_csrf_token($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}
?>
