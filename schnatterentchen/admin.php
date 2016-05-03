<?php
include("inc/head.inc.php");
?>

<title>Tina’s fröhliche Schnatterentchen - Admin</title>
</head>
<body>
<div id="wrapper">
 	
<div id="head">
    <a href="index.php"><img src="images/logo.png"></a>
</div>     

<div id="wrapper_c">    
 
<?php
include("inc/navi.inc.php");
?>  
    
<div id="content">
    <h1>Eingang - Kontaktformular</h1>
<?php
include("inc/data.inc.php");

		
		$sql = "select * from kontakt order by datum";
		$query = mysqli_query($con,$sql) or die ("Abfrage - Fehler Kontakt");
		
		while($wert = mysqli_fetch_array($query))
		{
				echo "<p><strong>Am: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>".$wert["datum"]."</br>";
				echo "<strong>Von:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>".$wert["name"]."</br>";
				echo "<strong>Tel:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>".$wert["telefon"]."</br>";
				echo "<strong>Betreff: &nbsp;&nbsp;&nbsp;&nbsp;</strong>".$wert["betreff"]."</br></br>";
				echo "".$wert["text"]."</p>";
				echo "<form action='delete.php?id=$wert[id]' method='post'>";
				echo "<a href='delete.php?id=$wert[id]'><input class='btn' type='submit' value='Eintrag löschen' id='button-delete'/></a>";
				echo "</form>";
		}
?>
        </div><!-- end content -->

<img src="images/footer.png">
<?php
include("inc/feed.inc.php");
?>

</div> 
<!-- end wrapper -->
</body>
</html>