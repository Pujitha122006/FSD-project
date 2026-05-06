<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require "db.php";
require "send_mail.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["error" => "Invalid JSON"]);
    exit;
}

$name    = trim($data['name'] ?? '');
$email   = trim($data['email'] ?? '');
$tickets = intval($data['tickets'] ?? 0);
$seatsArr = $data['seats'] ?? [];

if ($name == '' || $email == '' || $tickets <= 0 || empty($seatsArr)) {
    echo json_encode(["error" => "Missing fields"]);
    exit;
}

$seats = implode(",", $seatsArr);

$stmt = $conn->prepare("INSERT INTO bookings (name,email,tickets,seats) VALUES (?,?,?,?)");
$stmt->bind_param("ssis", $name, $email, $tickets, $seats);

if ($stmt->execute()) {

    $mailStatus = sendTicketMail($email, $name, $tickets, $seats);

    echo json_encode([
        "success" => true,
        "emailSent" => $mailStatus
    ]);

} else {
    echo json_encode(["error" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>