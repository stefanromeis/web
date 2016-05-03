<?php
include("inc/head.inc.php");
?>

<title>Ketziner Baustoffhandel - Admin</title>
</head>
<body>
<div id="wrapper">

<?php
include("inc/navi.inc.php");
?>   	 	


<div id="content">
<?php
include("inc/data.inc.php");

		echo "<h1>Eingang - Kontaktformular</h1>";
		
		$sql = "select * from kontakt order by datum";
		$query = mysqli_query($con,$sql) or die ("Abfrage - Fehler Kontakt");
		
		while($wert = mysqli_fetch_array($query))
		{
				echo "<div id='admin'>";
				echo "<p><strong>Am: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>".$wert["datum"]."</p>";
				echo "<p><strong>Von:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>".$wert["name"]."</p>";
				echo "<p><strong>Tel:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>".$wert["telefon"]."</p>";
				echo "<p><strong>Betreff: &nbsp;&nbsp;</strong>".$wert["betreff"]."</p>";
				echo "<p>".$wert["text"]."</p>";
				echo "<form action='delete.php?id=$wert[kid]' method='post'>";
				echo "<td><a href='delete.php?id=$wert[kid]'><input class='btn' type='submit' value='Eintrag löschen' /></a></td>";
				echo "</form>";
				echo "</div>";
		}
?>
</div><!-- end content -->
<?php
include("inc/quicklinks.inc.php");
?>    
    </div><!-- end inhalt -->
<?php
include("inc/feed.inc.php");
?>     
</div> 
<!-- end wrapper -->
</body>
</html>