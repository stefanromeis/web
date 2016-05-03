<?php
include("inc/data.inc.php");
$id = $_GET["id"];

$sql= "delete from kontakt where kid='$id'";
mysqli_query($con,$sql) or die ("delete - fehler");

header("Location:admin.php");
?>