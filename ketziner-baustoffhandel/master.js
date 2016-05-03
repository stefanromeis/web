//Datum head_right
function datum()
{
	var jetzt = new Date();
	var Start = jetzt.getTime();
	var monat = ["Januar","Februar","März","April","Mai","Juni","Juli","August","Sepember","Oktober",							"November","Dezember"];
	var tag = ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];

		document.write( tag[jetzt.getDay()]+
					", " +jetzt.getDate()+
					". "+
					monat[jetzt.getMonth()]+
					" "+
					jetzt.getFullYear()
				  );
}

//jQueryAccordion
$(document).ready(function(){
		$("#content .show").hide();
		$("#content h4").toggle(
	
	function(){
		$(this).next(".show").fadeIn();
		$(this).addClass("schliessen");
	},
	
	function(){
		$(this).next(".show").fadeOut();
		$(this).removeClass("schliessen");		
	});
	
//jQueryLightBoxGallery
	$("#lightBoxGallery a").lightBox({
		//Hintergrundfarbe, die die Seite bedeckt
		overlayBgColor: "#000",
		//Deckkraft einstellen
		//bei 1 - Deckkraft=100% bei 0 - 0%
		overlayOpacity: .8,
		//Bild (Standardwert ist Image)
		txtImage: "Bild",
		//Bild (Standardwert ist Of)
		txtOf: "von",
		//der Pfad zum Bild des Schließen-Buttons		
		/*
		alle gifs können ersetzt werden. Nur: weiter, zurück, schliess- buttons müssen
		63x62 gross sein
		loadingBild sollte 33x32 sein
		*/	
		});//ende lightBox
		
}); //end function