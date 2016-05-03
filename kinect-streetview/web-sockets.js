// Receive and interprete Kinect Data
window.onload = function () {
    var status = document.getElementById("status"); // get status element
    var canvas = document.getElementById("canvas"); // get canvas element
    var context = canvas.getContext("2d"); // put the context of the canvas to 2D
	var engaged = false; // interaction started or not
    var counter = 0; // frame-counter
    var transform = 0.5; //tranformation index for children
	
    //If websocket is not supported.
    if (!window.WebSocket) {
        status.innerHTML = "Dein Webbrowser unterstützt keine WebSockets!";
        return;
    }
    //status-line
    status.innerHTML = "Verbinde mit Kinect-Server...";

    // Initialize a new web socket.
    var socket = new WebSocket("ws://localhost:8181/KinectHtml5");

    // Connection established.
    socket.onopen = function () {
        status.innerHTML = "Verbindung erfolgreich. Bitte stelle dich vor die Kamera.";
    };

    // Connection closed.
    socket.onclose = function () {
        status.innerHTML = "Verbindung zum Server getrennt.";
    }
	
        // Receive data FROM the server!
        socket.onmessage = function (evt) {

            console.log(counter);
            status.innerHTML = "Beide Arme über den Kopf um zu starten.";

            var jsonObject = eval('(' + evt.data + ')');

            context.clearRect(0, 0, canvas.width, canvas.height);

            //Skeleton color
            if(engaged) 
                context.fillStyle = "#00FF00";
            else 
                context.fillStyle = "#FF0000";

                // Display the skeleton joints.
                    for (var j = 0; j < jsonObject.skeletons[0].joints.length; j++) {
                        var joint = jsonObject.skeletons[0].joints[j];
                        // Draw!!!
                        context.beginPath();
                        context.arc(joint.x, joint.y, 10, 0, Math.PI * 2, true);
                        context.closePath();
                        context.fill();
                    }

            
            //Get joint-Type
            var JointType = {
                HipCenter: 0, Spine: 1, ShoulderCenter: 2, Head: 3,
                ShoulderLeft: 4, ElbowLeft: 5, WristLeft: 6, HandLeft: 7,
                ShoulderRight: 8, ElbowRight: 9, WristRight: 10, HandRight: 11,
                HipLeft: 12, KneeLeft: 13, AnkleLeft: 14, FootLeft: 15,
                HipRight: 16, KneeRight: 17, AnkleRight: 18, FootRight: 19
            };
	

		
/*----------------------------------------------------------------------------------------------------------------------------------- */
/*----------------------------------------------------------- Gestures -------------------------------------------------------------- */		
/*----------------------------------------------------------------------------------------------------------------------------------- */
		
		//Start Position (Hands in the air)		
		if(jsonObject.skeletons[0].joints[JointType.HandRight].y < 100 && jsonObject.skeletons[0].joints[JointType.HandLeft].y < 100 * transform) { 
            engaged = true; }	
		//Stop Position (Hands to the sides)
		if(jsonObject.skeletons[0].joints[JointType.HandRight].x - jsonObject.skeletons[0].joints[JointType.HandLeft].x > 350 * transform) { 
            engaged = false; }
	
		//after hands in the air, interaction is active
        if(engaged) {
		
			status.innerHTML = "Bereit zur Steuerung.";
			
			//init KeyboardEvent for Street View control
			var e = document.createEvent('KeyboardEvent');
			
            //Move Forward
			//on every 6th frame, because rotation is triggering too fast on every frame
			if(0 != ( counter % 6)) {} 
			else {
				
				//MoveForward when feed up (z-difference between knees more than 0.1)------------------------------------------------------------------------
				var diff_knees_z = jsonObject.skeletons[0].joints[JointType.KneeLeft].z - jsonObject.skeletons[0].joints[JointType.KneeRight].z;
				if (Math.abs(diff_knees_z) > 0.1 * transform) {
					
					e.initKeyEvent('keydown', true, true, window, false, false, false, false, 38, 0); //38 = Up Arrow 
					document.body.dispatchEvent(e); // end previous event
					e.initKeyEvent('keyup', true, true, window, false, false, false, false, 38, 0); //38 = Up Arrow 
					document.body.dispatchEvent(e);	// end previous event				
				}          
							
				//MoveBackwards when right and left hand behind the hip by 0.15 ----------------------------------------
				var diff_Hip_HandRight_y = jsonObject.skeletons[0].joints[JointType.HipCenter].z - jsonObject.skeletons[0].joints[JointType.HandRight].z;		
				var diff_Hip_HandLeft_y = jsonObject.skeletons[0].joints[JointType.HipCenter].z - jsonObject.skeletons[0].joints[JointType.HandLeft].z;
                
				if (diff_Hip_HandRight_y < - 0.15 * transform && diff_Hip_HandLeft_y < - 0.15 * transform) {  			
					e.initKeyEvent('keydown', true, true, window, false, false, false, false, 40, 0); //40 = Down Arrow 
					document.body.dispatchEvent(e);	// end previous event					
					e.initKeyEvent('keyup', true, true, window, false, false, false, false, 40, 0); //40 = Down Arrow 
					document.body.dispatchEvent(e);	// end previous event		
				}  
			}
			
			
			//Rotation
			//on every second frame, because rotation is triggering too fast on every frame
			if(0 != ( counter % 2)) {} 
			else {

				//diff z-axis between shoulders for RotateLeft and RotateRight
				var diff_Shoulder_z = jsonObject.skeletons[0].joints[JointType.ShoulderLeft].z - jsonObject.skeletons[0].joints[JointType.ShoulderRight].z;
				
				//RotateRight-------------------------------------------------------------------------------------------
				if (diff_Shoulder_z < - 0.10 * transform) { 
					
					e.initKeyEvent('keydown', true, true, window, false, false, false, false, 39, 0); //39 = Right Arrow
					document.body.dispatchEvent(e); // end previous event
					e.initKeyEvent('keyup', true, true, window, false, false, false, false, 39, 0); //39 = Right Arrow 
					document.body.dispatchEvent(e); // end previous event
					
				}	
				
				//RotateLeft--------------------------------------------------------------------------------------------	
				if(diff_Shoulder_z > 0.10 * transform) {   

					e.initKeyEvent('keydown', true, true, window, false, false, false, false, 37, 0); //37 = Left Arrow 
					document.body.dispatchEvent(e);	// end previous event
					e.initKeyEvent('keyup', true, true, window, false, false, false, false, 37, 0); //37 = Left Arrow 
					document.body.dispatchEvent(e); // end previous event
			
				}
			}
			
			// Inform the server about the update.
			socket.send("Skeleton updated on: " + (new Date()).toDateString() + ", " + (new Date()).toTimeString());
			
		}
            
		  counter++; // Frame one interpreted, count up
    };
};