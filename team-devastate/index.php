<?php

$header = "<a href='index.php'><img src='bilder/logo.jpg' alt='eMeL - Music' /></a>
					 <div id='head_right'><a href='#'>Login</a></div>";

$navi = "
	<ul>
		<li><a href='#'>Home</a></li>
		<li><a href='#'>About</a></li>
		<li><a href='#'>Music</a></li>
		<li><a href='#'>Video</a></li>
		<li><a href='#'>Setup</a></li>
	</ul>";
	
	
###################### Maincontent #########################

		include("inc/data.inc.php");
		include("inc/constants.inc.php");
		
		$sql = "SELECT * FROM inhalte order by i_datum desc";
		$datensatz = mysql_query($sql);
		#echo mysql_error();
		
		$maincontent = "<h1>News.</h1>";
		
		while($daten = mysql_fetch_object($datensatz))						
						{						
						$maincontent .= "<div id='news'>";					
						$maincontent .= "<p class='kategorie'>".$daten->i_kategorie."</p>";
						$maincontent .= "<p class='ueberschrift'>".$daten->i_ueberschrift."</p>";
						$maincontent .= "<p class='date'>".$daten->i_datum."</p>";
						$maincontent .= "<p class='text'>".utf8_encode($daten->i_text)."</p>";
						$maincontent .= "<p class='autor'>".$daten->i_autor."</p>";						

						$maincontent .=	"</div>";
						}
						
								
$rightcontent = "<h2>Info</h2>
								<p>Diese Seite befindet sich derzeit noch im Aufbau, für nähere Infos besuchen Sie meinen Kanal <a href='http://www.youtube.com'>www.youtube.com</a></p>";
									
									

$footer =  "<ul>
							<li><a href='#'>Impressum</a></li>
							<li><a href='#'>Kontakt</a></li>
							<li><a href='#'>Various</a></li>
					 </ul>";

###########################################
# Ausgabe der HTML-Datei
###########################################
#Einbinden der externen Datei
require("inc/html_ausgabe.inc.php");
# Ausgabe auf dem Bildschirm
echo $html_ausgabe;
?>