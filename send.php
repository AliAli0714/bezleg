<?php
$to = "info@твойдомен.ru"; // замени на свой e-mail

$name  = htmlspecialchars($_POST['name']);
$email = htmlspecialchars($_POST['email']);
$phone = htmlspecialchars($_POST['phone']);

if (!$name || !$email || !$phone) {
    echo "❌ Заполните все поля.";
    exit;
}

$subject = "Новая заявка с сайта";
$message = "Имя: $name\nEmail: $email\nТелефон: $phone";

$headers = "From: no-reply@" . $_SERVER['SERVER_NAME'] . "\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo "✅ Спасибо, $name! Ваша заявка отправлена.";
} else {
    echo "❌ Ошибка при отправке. Попробуйте позже.";
}
?>
