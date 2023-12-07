<?php

// Add these lines at the beginning of your API file
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Database connection details
$host = "localhost:3306";
$username = "phpmyadmin";
$password = "admin";
$database = "foodwastedb";

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from the request
$requestData = file_get_contents('php://input');
$data = json_decode($requestData, true);

// $data['username'] = 'norman';
// $data['password'] = 'norman';

// Validate data
if (!isset($data['username']) || !isset($data['password'])) {
    $response = array("Status" => "Invalid");
} else {
    // Hash the password for security
    $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

    // Prepare and bind the SQL statement
    $stmt = $conn->prepare("INSERT INTO user (username, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $data['username'], $hashedPassword);

    // Execute the statement
    if ($stmt->execute()) {
        $response = array("Status" => "Success");
    } else {
        $response = array("Status" => "Invalid");
    }

    // Close the statement
    $stmt->close();
}

// Close the connection
$conn->close();

// Send the JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>