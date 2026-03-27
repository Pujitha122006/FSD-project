<?php
include 'db.php';

$title = $_POST['title'];
$description = $_POST['description'];

$sql = "INSERT INTO events (title, description) VALUES ('$title', '$description')";

if ($conn->query($sql) === TRUE) {
    echo "Event Added Successfully!";
} else {
    echo "Error: " . $conn->error;
}
?>