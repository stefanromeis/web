<?php
$nn = $_POST["mail"];
$telefon = $_POST["telefon"];
$betreff = $_POST["betreff"];
$text = $_POST["text"];
$send = $_POST["send"];

$mustermail = "/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/";


	if( !preg_match($mustermail,$_POST["mail"]) and ($mail==""))
	{
	header("Location:kontaktformular.php?hinweis=Bitte eine gültige E-Mail - Adresse eingeben...");
	}
	elseif($telefon=="")
	{
	header("Location:kontaktformular.php?hinweis=Bitte Telefonnummer eingeben, danke...");
	}
	elseif($betreff=="")
	{
	header("Location:kontaktformular.php?hinweis=Bitte Betreff eingeben, danke...");
	}
	elseif($text=="")
	{
	header("Location:kontaktformular.php?hinweis=Bitte Nachricht eingeben, danke...");
	}
else 
{
	header("Location:kontaktformular.php?hinweis_gut=Danke, Ihre Nachricht wurde erfolgreich versendet.");
}

     if (strlen($text))
     { 
        $xtra   .= "From: $meinAccount\r\n"; 
        $xtra   .= "Content-Type: text\r\nContent-Transfer-Encoding: 8bit\r\n"; 
        $xtra   .= "X-Mailer: PHP ". phpversion(); 
		
		$message .= "Datum = " . date("d.m.y, H:i") . "\r\n\r\n";    
        $message .= "eMail = " . $nn . "\r\n\r\n";
		$message .= "Telefon = " . $telefon . "\r\n\r\n";
        $message .= "Betreff = " . $betreff . "\r\n\r\n"; 
        $message .= "Nachricht\r\n" . stripSlashes($text) . "\r\n\r\n"; 
        

        mail ("s.romeis@gmail.com", "Aus Kontaktformular", $message, $xtra); 
    }  

?> 