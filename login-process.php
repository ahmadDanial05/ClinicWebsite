<?php
/**
 * Authentication Script
 * Handles user login and session management
 */

require_once 'config.php';

header('Content-Type: application/json');

// Function to sanitize input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Function to log user activity
function log_activity($conn, $user_id, $action_type, $details, $ip_address) {
    try {
        $stmt = $conn->prepare("
            INSERT INTO audit_log (user_id, action_type, action_details, ip_address) 
            VALUES (:user_id, :action_type, :details, :ip_address)
        ");
        
        $stmt->execute([
            ':user_id' => $user_id,
            ':action_type' => $action_type,
            ':details' => $details,
            ':ip_address' => $ip_address
        ]);
    } catch(PDOException $e) {
        // Silent fail for logging
    }
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $response = array();
    
    // Get JSON data
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);
    
    if (!$data) {
        // Fallback to POST data
        $username = isset($_POST['username']) ? sanitize_input($_POST['username']) : '';
        $password = isset($_POST['password']) ? $_POST['password'] : '';
    } else {
        $username = isset($data['username']) ? sanitize_input($data['username']) : '';
        $password = isset($data['password']) ? $data['password'] : '';
    }
    
    // Validate inputs
    if (empty($username) || empty($password)) {
        $response['success'] = false;
        $response['message'] = 'Sila isi nama pengguna dan kata laluan';
        echo json_encode($response);
        exit;
    }
    
    try {
        // Connect to database
        $database = new Database();
        $conn = $database->connect();
        
        // Get user from database
        $stmt = $conn->prepare("
            SELECT user_id, username, password_hash, full_name, email, role, is_active 
            FROM users 
            WHERE username = :username 
            LIMIT 1
        ");
        
        $stmt->execute([':username' => $username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Check if user exists
        if (!$user) {
            $response['success'] = false;
            $response['message'] = 'Nama pengguna atau kata laluan tidak sah';
            echo json_encode($response);
            exit;
        }
        
        // Check if user is active
        if (!$user['is_active']) {
            $response['success'] = false;
            $response['message'] = 'Akaun anda telah dinyahaktifkan. Sila hubungi administrator';
            echo json_encode($response);
            exit;
        }
        
        // Verify password
        if (password_verify($password, $user['password_hash'])) {
            // Password correct - create session
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['full_name'] = $user['full_name'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['role'] = $user['role'];
            $_SESSION['login_time'] = date('Y-m-d H:i:s');
            $_SESSION['ip_address'] = $_SERVER['REMOTE_ADDR'];
            
            // Update last login
            $stmt = $conn->prepare("
                UPDATE users 
                SET last_login = NOW() 
                WHERE user_id = :user_id
            ");
            $stmt->execute([':user_id' => $user['user_id']]);
            
            // Log successful login
            log_activity(
                $conn, 
                $user['user_id'], 
                'LOGIN', 
                'User logged in successfully',
                $_SERVER['REMOTE_ADDR']
            );
            
            $response['success'] = true;
            $response['message'] = 'Log masuk berjaya';
            $response['user'] = [
                'user_id' => $user['user_id'],
                'username' => $user['username'],
                'full_name' => $user['full_name'],
                'role' => $user['role']
            ];
            
        } else {
            // Wrong password
            $response['success'] = false;
            $response['message'] = 'Nama pengguna atau kata laluan tidak sah';
            
            // Log failed login attempt
            log_activity(
                $conn, 
                $user['user_id'], 
                'LOGIN_FAILED', 
                'Failed login attempt',
                $_SERVER['REMOTE_ADDR']
            );
        }
        
    } catch(PDOException $e) {
        $response['success'] = false;
        $response['message'] = 'Ralat sistem. Sila cuba lagi';
        $response['error'] = $e->getMessage(); // Remove in production
    }
    
    echo json_encode($response);
    
} else {
    // Invalid request method
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]);
}
?>
