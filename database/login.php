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
    // Retrieve user data from the database
    $stmt = $conn->prepare("SELECT username, password FROM user WHERE username = ?");
    $stmt->bind_param("s", $data['username']);
    $stmt->execute();
    $stmt->store_result();

    // Check if the user exists
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($username, $hashedPassword);
        $stmt->fetch();

        // Verify the password
        if (password_verify($data['password'], $hashedPassword)) {
            $response = array("Status" => "Success");
        } else {
            $response = array("Status" => "Invalid");
        }
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