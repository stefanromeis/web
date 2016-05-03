<?php
# Pfade
define("__PFAD_BILDER",		"bilder/");
define("__PFAD_MUSIC",	"mp3/");
define("__PFAD_VIDEO",	"video/");

function formulardaten($wert)
{
		#htmlentities macht html-befehle unschädlich
		#trim entfernt überflüssige Leerzeichen am Anfang und Ende
		return htmlentities(utf8_decode(trim($wert)));
}
?>