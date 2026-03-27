<?php
// Check required fields.
if (
   empty($_POST['name']) ||
   empty($_POST['email']) ||
   empty($_POST['message']) ||
   !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)
) {
   http_response_code(400);
   echo "No arguments Provided!";
   return false;
}
   
$name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$phone = isset($_POST['phone']) ? strip_tags(htmlspecialchars($_POST['phone'])) : 'Not provided';
$message = strip_tags(htmlspecialchars($_POST['message']));
   
// Create the email and send the message
$to = 'mmpatil@health.ucdavis.edu';
$email_subject = "Website Contact Form:  $name";
$email_body = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\nName: $name\n\nEmail: $email_address\n\nPhone: $phone\n\nMessage:\n$message";
$headers = "From: noreply@localhost\n";
$headers .= "Reply-To: $email_address";   

if (mail($to, $email_subject, $email_body, $headers)) {
   echo "OK";
   return true;
}

http_response_code(500);
echo "Mail server failed";
return false;
?>