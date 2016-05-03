// sequence-editor 
var scenes = [];

// if webiste is completely loaded
$(document).ready(function() {
	var email = null;
	var userSequences = null;
    var json;
	
    $('#login').click(function() { //login button listener
        index.html.reload(true);
    });    	
    
    login();
   
    // saves the actual scene as json.
    // @ return json
	function sceneToJson() {
		
        // define json
		var json = {
   			'coords': [], 
    		'infos': []
		}
            //coordinates of the input fields
            var xy1 = [document.formular.x1.value, document.formular.y1.value];
            var xy2 = [document.formular.x2.value, document.formular.y2.value];
            var xy3 = [document.formular.x3.value, document.formular.y3.value];
            var xy4 = [document.formular.x4.value, document.formular.y4.value];
            
			//put coordinates into json
            var area = { "xy1": xy1, 
                         "xy2": xy2,
                         "xy3": xy3,
                         "xy4": xy4
                       };
        
           	//add area to scene-object
            json['coords'].push(area); 
        
            //save the given infos
            var infos = [];
            for(var i = 0; i < 7; i++) {
                var info = document.getElementById('check'+i).checked;
                infos.push(info);
            }
        
		    json['infos'].push(infos);
        
		console.log(json);
		return json;

	}
    
    //load scene from database
	function loadScene(jObjects) {
        //get the coordinates from the scene-object
		var jCoords = jObjects['coords'];
        
        // fill the input fields
		document.formular.x1.value = jCoords[0]['xy1'][0];		
		document.formular.y1.value = jCoords[0]['xy1'][1];		
		document.formular.x2.value = jCoords[0]['xy2'][0];		
		document.formular.y2.value = jCoords[0]['xy2'][1];
		document.formular.x3.value = jCoords[0]['xy3'][0];
		document.formular.y3.value = jCoords[0]['xy3'][1];
		document.formular.x4.value = jCoords[0]['xy4'][0];
		document.formular.y4.value = jCoords[0]['xy4'][1];
        
        //get the infos from the scene-object
        var jInfos = jObjects['infos'];
        //mark active checkboxes, uncheck if not
        for(var i = 0; i < jInfos[0].length; i++){
            if(jInfos[0][i]){
                document.getElementById('check'+i).checked = true;              
            }
            else {
                document.getElementById('check'+i).checked = false;
            }
        }
        
    }
    
    //clear alls field and checkboxes
    function removeAll() {
       	document.formular.x1.value = "";
		document.formular.y1.value = "";
		document.formular.x2.value = "";	
		document.formular.y2.value = "";
		document.formular.x3.value = "";
		document.formular.y3.value = "";
		document.formular.x4.value = "";
		document.formular.y4.value = "";
        
        for(var i = 0; i < jInfos[0].length; i++){
             document.getElementById('check'+i).checked = false;
        }
    }
	
    //"#newButton" - function
	$("#newButton").click((function() {
	    var today = new Date();
	    var h = today.getHours();
	    var m = today.getMinutes();
	    var s = today.getSeconds();
		var name = prompt("Benenne deine neue Szene","Areal_"+h+":"+m+":"+s);		
		if (name != null){
			var json = {
	   			'name': name,
	    		'json': JSON.stringify(sceneToJson()),
	    		'email': email
			}
			var res = createScene(json);
			console.log(res);
			getUserSequences();
		}
		
	}));
	
    //"#renameButton" - function
	$("#renameButton").click((function() {
		if(getSelectedId() != null){
			var today = new Date();
		    var h = today.getHours();
		    var m = today.getMinutes();
		    var s = today.getSeconds();
			var name = prompt("Benenne die Szene neu:","sequence_"+h+":"+m+":"+s);		
			if (name != null){
				var json = {
		   			'name': name
				}
				var res = updateScene(getSelectedId(), json);
				console.log(res);
				getUserSequences();	
                alert('Szene wurde umbenannt!');		

			}			
		}
		else
			alert('Keine Szene ausgewählt!');		
	    
	}));

    //"#saveButton" - function
	$("#saveButton").click((function() {
		var json = {
    		'json': JSON.stringify(sceneToJson())
		}
		if(getSelectedId() != null){
			var res = updateScene(getSelectedId(), json);
            alert('Szene wurde gespeichert.');
			console.log(res);
		}
		else
			alert('Keine Szene ausgewählt!');		
	}));
    
    //"#loadButton" - function
	$("#loadButton").click((function() {	
		var sceneID =getSelectedId();
		if(sceneID != null){
			var json = JSON.parse(getScene(sceneID));
            jObjects = JSON.parse(json['json']);
			loadScene(jObjects);	
		}
		else
			alert('Keine Szene ausgewählt!');		
	}));
	
    //"#deleteButton" - function
	$("#deleteButton").click((function() {
		if(getSelectedId() != null){
			console.log(getSelectedId());
			var res = deleteScene(getSelectedId());
			console.log(res);
			getUserSequences();
		}
		else
			alert('Keine Szene ausgewählt!');		
	}));

    //"#clearButton" - function
	$("#clearButton").click((function() {
		removeAll();
	}));
	
    //Login - function
	function login() {
		email=prompt("Bitte geben Sie ihre E-Mail Adresse ein","111@xxx.xxx");
		if (email != null){
			if (verifyEmail(email)){
				document.getElementById('loginLabel').innerHTML = 'Eingeloggt als ' + email;
				getUserSequences();
			}
			else{
				document.getElementById('loginLabel').innerHTML = 'nicht eingeloggt';
				login = null;
			}
		}
	}
	
	//checks if email is valid
	function verifyEmail() {
		var regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	
		if (!regex.test(email)) {
			alert("Die eingegebene E-Mail Adresse " + email + " entspricht nicht der Vorgabe: xxx@xxx.xxx! Sie sind nicht eingeloggt.");
			return false;
		} else {
			alert("Eingeloggt als: " + email);
			return true;
		}
	}
	
    //show all-user sequnces
	function getUserSequences(){
        
		var result = getAll(email);
		var jres = JSON.parse(result);
		var newOptions = {};
        
		for (var i = 0; i < jres.length; i++){
			newOptions[jres[i]["id"] + "  -  " + jres[i]["name"]] = jres[i]["id"];
		}
        
		var selection = $("#sequenceSelect");
		selection.empty(); // remove old options
        
		$.each(newOptions, function(key, value) {
		  selection.append($("<option></option>")
            .attr("value", value)
            .text(key));
		});	
        
        sequencesToStreetView();
	}	
	
	function getSelectedId() {
		var selected = $("#sequenceSelect option:selected").val();
		return selected;B
	}
    

    //structure scene for Street View 
    function sequencesToStreetView(){

        var result = getAll(email); // get all scenes from registered user
        var jres = JSON.parse(result);

        for(var i = 0; i < jres.length; i++) {

            json = JSON.parse(getScene(jres[i]["id"]));
            jObjects = JSON.parse(json['json']);
            jCoords = jObjects['coords'];
            jInfos = jObjects['infos'];

            //building the areas
            scenes[i] = {
                name: "a"+i,
                active: false,
                infos: jInfos,
                data: new google.maps.Polygon({paths: [ //build google maps polygon with 4 corners
                    new google.maps.LatLng(jCoords[0]['xy1'][0], jCoords[0]['xy1'][1]),
                    new google.maps.LatLng(jCoords[0]['xy2'][0], jCoords[0]['xy2'][1]),
                    new google.maps.LatLng(jCoords[0]['xy3'][0], jCoords[0]['xy3'][1]),
                    new google.maps.LatLng(jCoords[0]['xy4'][0], jCoords[0]['xy4'][1]),
                    new google.maps.LatLng(jCoords[0]['xy1'][0], jCoords[0]['xy1'][1])
                ]})
            };
            
        }   
    }

    
    
});

