<?php
if(empty($_POST['name'])	||
   empty($_POST['email'])	||
   empty($_POST['message']) ||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "No arguments Provided!";
	header("Location: ../index.html#contact");
    die();
   }

$name = $_POST['name'];
$email_address = $_POST['email'];
$message = $_POST['message'];
	
$to = 'info@gertjanandries.com';
$email_subject = "Website Contact Form:  $name";
$email_body = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\nName: $name\n\nEmail: $email_address\n\nPhone: $phone\n\nMessage:\n$message";
$headers = "From: noreply@gertjanandries.com\n";
$headers .= "Reply-To: $email_address";	
mail($to,$email_subject,$email_body,$headers);
header("Location: ../index.html#about");
die();
?>