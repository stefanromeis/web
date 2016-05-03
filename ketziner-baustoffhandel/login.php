<?php
include("inc/head.inc.php");
?>

<title>Ketziner Baustoffhandel - Login</title>
</head>
<body>
<div id="wrapper">

<?php
include("inc/navi.inc.php");
?>   	 	


<div id="content">
		<h1>Login</h1>
       <form action='admin_check.php' method='post'>
       <p><span>Benutzername:&nbsp;&nbsp;</span></p>
       <p><input class='contact2' type='text' name='user' value='' /></p>
       <p><span>Passwort:</span></p>
       <p><input class='contact2' type='password' name='pwd' value='' /></p>
        <p> <input class='btn2' type='submit' value='Anmelden' /></form></p>
        
<?php      
if(isset($_GET["fehler"]))
		{
			echo "<p class='fehler'>".$_GET["fehler"]."</p>";	
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