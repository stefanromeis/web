<?php
include("inc/head.inc.php");
?>

<title>Tina’s fröhliche Schnatterentchen - Login</title>
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
        
    <h1 style="background-color: rgba(0,0,200,0.3);">Login</h1>
    
<?php      
if(isset($_GET["fehler"]))
		{
			echo "<p class='hinweis'>".$_GET["fehler"]."</p>";	
		}
?>
    
       <form action='admin_check.php' method='post'>
            <p>
               <input class='contact2' type='text' name='user' value='' placeholder="User" /></br>
               <input class='contact2' type='password' name='pwd' value='Password' placeholder="Passwort" /></br>
            <input type='submit' value='Anmelden' id="button-login" />
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