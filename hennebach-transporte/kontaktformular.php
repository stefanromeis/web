<!DOCTYPE html>
<html>
	<head>
		<title>Hennebach Transporte</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" charset="utf-8">
		
		<link rel="stylesheet" type="text/css" href="style.css">
		<script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
        <script type="text/javascript">
            $(document).ready(function() {
                $('.menubutton').click(function() {
                    $('nav').slideToggle('slow');
                });
                var back_to_top_button = ['<a href="#top" class="back-to-top">Nach oben &#9650;</a>'].join("");
                $(".foot").append(back_to_top_button)

                // Der Button wird ausgeblendet
                $(".back-to-top").hide();

                // Funktion für das Scroll-Verhalten
                $(function () {
                    $(window).scroll(function () {
                        if ($(this).scrollTop() > 100) { // Wenn 100 Pixel gescrolled wurde
                            $('.back-to-top').fadeIn();
                        } else {
                            $('.back-to-top').fadeOut();
                        }
                    });

                    $('.back-to-top').click(function () { // Klick auf den Button
                        $('body,html').animate({
                            scrollTop: 0
                        }, 800);
                        return false;
                    });   
                });
            });
        </script>
	</head>
	<body>
		<section id="menubar">
			<ul>
				<li><a class="menubutton" href="#menu"><img src="images/menu.svg" /></a></li>
				<li class="logo"><a href="index.html"><img src="images/logo.jpg" /></a></li>
			</ul>
		</section>
        <nav class="nav">
			<ul>
                <li><a href="index.html" class="logo"><img src="images/logo.jpg" /></a></li>
				<li><a href="index.html">Home</a></li>
				<li><a href="leistungen.html">Leistungen</a></li>
				<li><a href="referenzen.html">Referenzen</a></li>
				<li><a href="kontakt.html" class="active">Kontakt</a></li>
				<li><a href="impressum.html">Impressum</a></li>
			</ul>
		</nav>
		<div id="header">
            <h1>Kontaktformular</h1>
		</div>
		<section id="center">
			<article>
				    
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
                <p class="formleft">
                    <input class="contact" type="text" name="mail" value="" placeholder="E-Mail Adresse eingeben..."/><br />
                    <input class="contact" type="text" name="telefon" value="" placeholder="Telefonnummer eingeben..."/><br />
                    <input class="contact" type="text" name="betreff" value="" placeholder="Betreff eingeben..." /><br />
                    <textarea class="contact_text" rows="8" cols="50" name="text" placeholder="Nachicht eingeben..."></textarea><br /><br />
                    <input class="btn" type="submit" name="send" value="Nachricht Senden" id="button-blue" /><br />                
                </p>

            </form>
			<article>

                
		</section>
		<footer>
			<ul class="foot">
				<li>&copy; Hennebach Transporte</li>
				<li><a href=kontakt.html>Kontakt<a/></li>
                <li><a href="impressum.html">Impressum</a></li>
			</ul>
		</footer>
	</body>
</html>