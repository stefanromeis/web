<?php
include("inc/head.inc.php");
?>

<title>Ketziner Baustoffhandel - Kontaktformular</title>
</head>
<body>
<div id="wrapper">

<?php
include("inc/navi.inc.php");
?>   	 	


        <div id="content">
        
        <h1>Kontaktformular </h1><br />
            <form action="kontakt_check.php" method="post">
                <p><span>* Absender (E-Mail Adresse):</span></p>
                <p><input class="contact" type="text" name="mail" value="" /></p>
                <p><span>* Telefon:</span></p>
                <p><input class="contact" type="text" name="telefon" value="" /></p>
                <p><span>* Betreff:</span></p>
                <p><input class="contact" type="text" name="betreff" value="" /></p>
                <p><span>* Nachricht:</span></p>
                <p><textarea class="contact_text" rows="8" cols="50" name="text"></textarea></p><br />
                <p><input class="btn" type="submit" name="send" value="Nachricht Senden" /></p><br />
                <p class="small">mit * gekennzeichnete Felder müssen gefüllt sein</p>
            </form>

  <?php
  	if(isset($_GET["hinweis"]))
		{
			echo "<p class='hinweis'>".$_GET["hinweis"]."</p>";	
		}
		if(isset($_GET["hinweis_gut"]))
		{
			echo "<p class='hinweis_gut'>".$_GET["hinweis_gut"]."</p>";	
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