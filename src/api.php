<?php

// Add these lines at the beginning of your API file
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'db.php'; // Include your database connection class
require_once 'Authentication.php'; // Include the Authentication class

$db = (new DbConnect())->connect(); // Create a new database connection

// Create an instance of the Authentication class
$auth = new Authentication($db);

// Handle login request
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $result = $auth->login($username, $password);

    if ($result) {
        http_response_code(200);
        echo json_encode(["message" => "Login successful"]);
    } else {
        http_response_code(401);
        echo json_encode(["message" => "Login failed"]);
    }
}

// Handle signup request
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['signup'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $result = $auth->signup($username, $password);

    if ($result) {
        http_response_code(201);
        echo json_encode(["message" => "Signup successful"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Signup failed"]);
    }
}

// Handle dashboard data request
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['dashboard-data'])) {
    // Implement logic to fetch dashboard data from the database
    $dashboardData = []; // Replace with your actual implementation

    http_response_code(200);
    echo json_encode($dashboardData);
}
?>
