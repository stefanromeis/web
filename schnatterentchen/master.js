//Datum head_right
function datum()
{
	var jetzt = new Date();
	var Start = jetzt.getTime();
	var monat = ["Januar","Februar","März","April","Mai","Juni","Juli","August","Sepember","Oktober","November","Dezember"];
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

document.addEventListener('scroll', function () {
    var bild = document.getElementById('navi'); //Hier definierst du die ID deines Bildes
    var bild2 = document.getElementById('content'); //Hier definierst du die ID deines Bildes
    
    if (window.pageYOffset >= 155.2) {
        bild.style.top = '0px';        
        bild.style.left= '50%';
        bild.style.marginLeft = - screen.width / 2 + 'px';
        bild.style.position = 'fixed';
        bild.style.width =  screen.width + 'px';
        bild.style.backgroundColor = 'rgba(232,179,81,1)';
        bild2.style.paddingTop = '45px';
        
    }
    if (window.pageYOffset < 155.2 && bild.style.top == '0px') {
        bild.style.position = 'relative';
        bild.style.top = '0px';        
        bild.style.left= '0%';
        bild.style.marginLeft= '0px';
        bild.style.width = '100%';
        bild.style.backgroundColor = 'rgba(232,179,81,0.8)';
        bild.style.borderBottom = '2px solid #eee';
                bild2.style.paddingTop = '0px';

    }
});