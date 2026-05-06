<?php
// 🔥 CHANGE PORT if needed (3307 in your case)
$conn = new mysqli("localhost", "root", "", "ticket_db", 3307);

if ($conn->connect_error) {
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}
?>