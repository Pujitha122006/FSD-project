<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

function sendTicketMail($email, $name, $tickets, $seats) {

    $mail = new PHPMailer(true);

    try {
        // SMTP SETTINGS
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;

        $mail->Username = 'pujithaemmadisetty@gmail.com';
        $mail->Password = 'rljnxtkkcbyosaev'; // App password

        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('pujithaemmadisetty@gmail.com', 'Ticket Booking');

        $mail->addAddress($email, $name);

        $mail->isHTML(true);
        $mail->Subject = '🎟 Ticket Confirmation';

        $mail->Body = "
            <h2>Booking Confirmed 🎉</h2>
            <p><b>Name:</b> $name</p>
            <p><b>Tickets:</b> $tickets</p>
            <p><b>Seats:</b> $seats</p>
            <p><b>Event:</b> Tech Fest 2026</p>
        ";

        if ($mail->send()) {
            return true;
        } else {
            return false;
        }

    } catch (Exception $e) {
        return false;
    }
}
?>