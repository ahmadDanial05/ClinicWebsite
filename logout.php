<?php
/**
 * Logout Script
 * Destroys user session and redirects to login
 */

require_once 'config.php';

// Check if user is logged in
if (isset($_SESSION['user_id'])) {
    // Log logout activity
    try {
        $database = new Database();
        $conn = $database->connect();
        
        $stmt = $conn->prepare("
            INSERT INTO audit_log (user_id, action_type, action_details, ip_address) 
            VALUES (:user_id, :action_type, :details, :ip_address)
        ");
        
        $stmt->execute([
            ':user_id' => $_SESSION['user_id'],
            ':action_type' => 'LOGOUT',
            ':details' => 'User logged out',
            ':ip_address' => $_SERVER['REMOTE_ADDR']
        ]);
    } catch(PDOException $e) {
        // Silent fail
    }
}

// Destroy all session data
session_unset();
session_destroy();

// Delete session cookie
if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '', time() - 3600, '/');
}

// Redirect to login page
header('Location: login.html');
exit;
?>
