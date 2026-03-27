<?php
include 'db.php';

$result = $conn->query("SELECT * FROM events ORDER BY id DESC");

$events = array();

while($row = $result->fetch_assoc()) {
    $events[] = $row;
}

echo json_encode($events);
?>