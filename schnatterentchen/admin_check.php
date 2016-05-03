<?php
session_start();
include("inc/data.inc.php");
$user = $_POST["user"];
$pwd = $_POST["pwd"];

if($user=="")
{
	header("Location:login.php?fehler=Bitte Namen eingeben...");
}
	elseif($pwd=="")
	{
	header("Location:login.php?fehler=Bitte Passwort eingeben...");
	}
else {
	$sql = "select * from admin where name='$user' and passwort='$pwd'";
	$query = mysqli_query($con,$sql) or die ("Abfrage - Fehler Admincheck");
	
if(mysqli_num_rows($query)==1) //ist das true
{	
	$daten = mysqli_fetch_array($query);
	
	$_SESSION["name"]=$daten["name"];
	$bn_session = $_SESSION["name"];	
	$_SESSION["passwort"]=$daten["passwort"];
	$nn_session = $_SESSION["passwort"];	

	header("Location:admin.php?fehler_gut");
}
else
{
	header("Location:login.php?fehler=Benutzername oder Passwort falsch.");
}
}

?>