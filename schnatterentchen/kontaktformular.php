<?php
include("inc/head.inc.php");
?>

<title>Tina’s fröhliche Schnatterentchen - Kontaktformular</title>
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
        
        <h1>Kontaktformular </h1>
    
    
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
            <form action="kontakt_check.php" method="post">
                <p><span>* Absender (E-Mail Adresse):</span><br />
                    <input class="contact" type="text" name="mail" value="" placeholder="E-Mail"/><br />
                    <span>* Telefon:</span><br />
                    <input class="contact" type="text" name="telefon" value="" placeholder="Telefon"/><br /><br />
                    <span>* Betreff:</span><br />
                    <input class="contact" type="text" name="betreff" value="" placeholder="Betreff" /><br />
                    <span>* Nachricht:</span><br />
                    <textarea class="contact_text" rows="8" cols="50" name="text"></textarea><br /><br />
                    mit * gekennzeichnete Felder müssen gefüllt sein
                    <input class="btn" type="submit" name="send" value="Nachricht Senden" id="button-blue" /><br />                
                </p>

            </form>

        </div> 
</div>
<img src="images/footer.png">
<?php
include("inc/feed.inc.php");
?>

</div> 
<!-- end wrapper -->
</body>
</html>