$(document).ready(function() {
	var email = null;
	var userSequences = null;
	$('#showGrid').checked = false;
	$('#align').checked = false;
	var divs = [];
	var anchorpoints = [];
	var lines = [];
	var selectedAnchorPoint = null;
	var selectedDiv = null;
	//size of a cell in the grid (square)
	var gridCell = 20;
		
	//names for the positions of the anchorpoints of each div
	var positionNames = ['top', 'bottom', 'left', 'right'];
	var selectSuffix = 'Highlighted';

	var canvas = $("#editorCanvas");
	//if you click into the void -> deselect divs
	canvas.click(function() {
		//var divName = $(this).attr(id);
		//a div is already selected
		if (selectedDiv){		
			deselectDiv(selectedDiv);		
		}
	});
	
    $('#login').click(function() {
        login();
    });   
	
	//redraw if checkbox grid is clicked
    $('#showGrid').click(function() {
        drawlines();
    });   

	//if button is clicked an element of class divElement is created
	$("#createButton").click((function() {		
		var id = divs.length;
		creatediv("divElement", id, "50px", "150px");
	}));
	
	var ctx = canvas[0].getContext("2d");
	login();	
	init();
	
	function init(){
		divs = [];
		anchorpoints = [];
		lines = [];
		selectedAnchorPoint = null;
		selectedDiv = null;			
		var id = divs.length;	
		creatediv("startElement", id, "250px", "50px");
		drawlines();
	}

	function creatediv(classname, id, top, left) {
		//id of div is idx of new last element of div array 		
		var divName = 'div_' + id;	
		divs.push(divName);
		$('body').append('<div id="' + divName + '" class="' + classname + '"></div>');
		//make the div draggable
		div = $('#' + divName);
		div.css({ top: top, left: left});
		div.draggable();
		div.draggable("option", "distance", 20);
		div.draggable("option", "opacity", 0.5);
		div.draggable({
			revert : function(is_valid_drop) {
				if (!is_valid_drop) {
					$(this).removeClass("inmotion");
					return false;
				} else {
					$(this).removeClass("inmotion");
				}
			},

			drag : function() {
				execute = 0;
				$(this).addClass("inmotion");
				//update position of anchorpoints and lines
				updateAnchorPos(id);
				drawlines();
			},
			
			grid : [ gridCell, gridCell ] 
		});
		
		//add anchorpoints and initialize their position
		addAnchorpoints(id);
		updateAnchorPos(id);		
		
		div.click(function() {
			//var divName = $(this).attr(id);
			//a div is already selected
			if (selectedDiv){		
				var old_id = selectedDiv[selectedDiv.length - 1];
				//deselect if already selected
				if (selectedDiv === divName){
					deselectDiv(divName);
					console.log('Div with id ' + id + ' was already selected, will be deselected');
				}
				//select it, if another div was selected before
				else {
					hideAnchors(old_id);
					deselectDiv(selectedDiv);
					selectDiv(divName);
				}
			}
			//nothing selected before
			else{
				selectDiv(divName);
			}

		});

		div.mouseenter(function() {				
			$(this).attr('class', classname + 'Highlighted');
		});

		div.mouseleave(function() {
			if (divName !== selectedDiv)
				$(this).attr('class', classname);
		});
		

	}

	function hideAnchors(divId) {
		for (var idx = 0; idx < positionNames.length; idx++ ) {
			var anchorName = 'anchor_' + divId + '_' + positionNames[idx];
			//selected anchors will remain visible
			if (anchorName !== selectedAnchorPoint){
				hideAnchor(anchorName);
			}
		}
	}
	
	function showAnchors(divId) {
		for (var idx = 0; idx < positionNames.length; idx++ ) {			
			var anchorName = 'anchor_' + divId + '_' + positionNames[idx];
			showAnchor(anchorName);			
		}
	}
	
	function hideAnchor(anchorName){
		var anchor = $("#" + anchorName);
		anchor.css('opacity', '0');
	}
	
	function showAnchor(anchorName){
		var anchor = $("#" + anchorName);
		anchor.css('opacity', '1');	
	}
	
	function selectDiv(divName) {
		var id = divName[divName.length - 1];
		var div = $('#' + divName);
		var old_class = div.attr('class');
		if (!old_class.match(selectSuffix + "$"))
			div.attr('class', old_class + selectSuffix);
		selectedDiv = divName;
		showAnchors(id);
	}	
	
	function deselectDiv(divName) {		
		var id = divName[divName.length - 1];
		var div = $('#' + selectedDiv);
		var old_class = div.attr('class');
		//substract suffix ('Highlighted')
		deselectClass = old_class.substr(0, old_class.length - selectSuffix.length);	
		div.attr('class', deselectClass);				
		selectedDiv = null;
		hideAnchors(id);	
	}
	
	function addAnchorpoints(divId) {
		
		for (var idx = 0; idx < positionNames.length; idx++ ) {
			var anchorName = 'anchor_' + divId + '_' + positionNames[idx];
			$('body').append('<div id="' + anchorName + '" class="anchorpoint"></div>');
			var anchor = $("#" + anchorName);
			anchor.data("divId", divId);
			hideAnchor(anchorName);

			anchor.click(function() {							
				//an anchorpoint is already selected
				if (selectedAnchorPoint) {						
					var startAnchor = $("#" + selectedAnchorPoint);				
					startAnchor.attr('class', 'anchorpoint');
					
					//deselect anchorpoint if same is clicked
					if (selectedAnchorPoint === $(this).attr('id')){
						selectedAnchorPoint = null;
					}
					//another anchorpoint is clicked
					else{
						//deselect old anchorpoint
						hideAnchor(startAnchor.attr('id'));	
						//anchor point in another div clicked -> draw line
						if ($(this).data("divId") !== startAnchor.data("divId")) {	
							lines.push([startAnchor.attr('id'), $(this).attr('id')]);						
							$(this).attr('class', 'anchorpoint');
							selectedAnchorPoint = null;	
							drawlines();
						} 
						//anchorpoint in same div (but not same anchorpoint)-> select new one
						else {
							selectedAnchorPoint = $(this).attr('id');	
						}
					}
				}
				//no anchorpoint selected before
				else {
					selectedAnchorPoint = $(this).attr('id');					
					$(this).attr('class', 'anchorHighlighted');
				}
				//lazy way to draw the anchorpoints of the selected div again
				if (selectedDiv)
					selectDiv(selectedDiv);
			});
			
			anchor.mouseenter(function() {
				$(this).attr('class', 'anchorHighlighted');
				showAnchor($(this).attr('id'));
			});

			anchor.mouseleave(function() {
				//don't hide selected anchor
				if ($(this).attr('id') !== selectedAnchorPoint){
					$(this).attr('class', 'anchorpoint');
					hideAnchor($(this).attr('id'));
					
					//keep showing anchors of selected div
					if (selectedDiv){
						var selectedId = selectedDiv[selectedDiv.length - 1];
						showAnchors(selectedId);
					}
				}
			});
		}

	}

	function updateAnchorPos(divId) {
		
		var div = $("#div_" + divId);
		var position = div.position();
		var divTop = position.top;
		var divLeft = position.left;
		var divWidth = div.width();
		var divHeight = div.height();
		
		//top
		var anchorTop = $("#anchor_" + divId + "_top");
		//assuming all anchorpoints have the same size
		var borderWidth = parseInt(anchorTop.css("border-left-width"));
		var offsetHeight = anchorTop.height() / 2 + borderWidth / 2;
		var offsetWidth = anchorTop.width() / 2 + borderWidth / 2;
		anchorTop.css("top", divTop - offsetHeight);
		anchorTop.css("left", divLeft + divWidth / 2 - offsetWidth);

		//bottom
		var anchorTop = $("#anchor_" + divId + "_bottom");
		anchorTop.css("top", divTop + divHeight - offsetHeight );
		anchorTop.css("left", divLeft + divWidth / 2 - offsetWidth);
		
		//left
		var anchorTop = $("#anchor_" + divId + "_left");
		anchorTop.css("top", divTop + divHeight / 2 - offsetHeight );
		anchorTop.css("left", divLeft - offsetWidth);
		
		//right
		var anchorTop = $("#anchor_" + divId + "_right");
		anchorTop.css("top", divTop + divHeight / 2 - offsetHeight );
		anchorTop.css("left", divLeft + divWidth - offsetWidth);
		
	}
	
	function drawlines() {
		var width = parseInt(canvas.css('width'));
		var height = parseInt(canvas.css('height'));
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(0, 0, width, height);
		//draw grid if checked
		if ($('#showGrid').is(':checked')){
			for (var x = gridCell; x < width; x += gridCell){
				ctx.moveTo(x, 0);
				ctx.lineTo(x, height);
				ctx.strokeStyle = "#D4D4CA";
				ctx.lineWidth = 1;
				ctx.lineCap = 'round';
				ctx.stroke();
			}
			for (var y = gridCell; y < height; y += gridCell){
				ctx.moveTo(0, y);
				ctx.lineTo(width, y);
				ctx.strokeStyle = "#D4D4CA";
				ctx.lineWidth = 1;
				ctx.lineCap = 'round';
				ctx.stroke();
			}
		}
			
		//redraw all lines
		for (var i = 0; i < lines.length; i++) {
			ctx.beginPath();
			var startAnchor = $('#' + lines[i][0]);
			var endAnchor = $('#' + lines[i][1]);			
			var startPos = startAnchor.position();
			var endPos = endAnchor.position();			
			var borderWidth = parseInt(startAnchor.css("border-left-width"));
			var offsetHeight = startAnchor.height() / 2 + borderWidth / 2;
			var offsetWidth = startAnchor.width() / 2 + borderWidth / 2;
			ctx.moveTo(startPos.left - offsetWidth, 
					   startPos.top - offsetHeight);
			ctx.lineTo(endPos.left - offsetWidth, 
					   endPos.top - offsetHeight);
			ctx.strokeStyle = "black";
			ctx.lineWidth = 1;
			ctx.lineCap = 'round';
			ctx.stroke();

		}

	}

	// create json String from scene
	function sceneToJSON() {
		
		var json = {
   			'divs': [],
    		'lines': []
		}
		
		function pushDiv(div){
			var divID = div.id.substr("div_".length, div.id.length);
			var jpos = {"id": divID, "top": div.style['top'], "left": div.style['left']}
   			json['divs'].push(jpos)
		}
		
		$('.startElement').each(function(i, div) {
			pushDiv(div);
   		});
   		
 		$('.startElementHighlighted').each(function(i, div) {
   			pushDiv(div);
   		});  		
   		
   		$('.divElement').each(function(i, div) {
   			pushDiv(div);
   		}); 
   		
   		$('.divElementHighlighted').each(function(i, div) {
   			pushDiv(div);
   		}); 
   		
		for (var i = 0; i < lines.length; i++) {
			var anchorStart = lines[i][0];
			var anchorEnd = lines[i][1];
			var jpos = {"anchorStart": anchorStart, 
						"anchorEnd": anchorEnd}
   			json['lines'].push(jpos)
		}
		console.log(json);
		return json;

	}

	function loadScene(jObjects) {
		removeAll();
		var jDivs = jObjects['divs'];
		creatediv("startElement", jDivs[0]['id'], jDivs[0]['top'], jDivs[0]['left'])
		for(var i = 1; i < jDivs.length; i++){			
			creatediv("divElement", jDivs[i]['id'], jDivs[i]['top'], jDivs[i]['left'])
		}
		var jLines = jObjects['lines'];
		for(var i = 0; i < jLines.length; i++){			
			lines.push([jLines[i]['anchorStart'], jLines[i]['anchorEnd']]);
		}
		drawlines();
	}
	
	function removeAll(){
		$('.divElement').remove();		
		$('.divElementHighlighted').remove();
		$('.anchorpoint').remove();
		$('.anchorHighlighted').remove();
		$('.startElement').remove();
		$('.startElementHighlighted').remove();
		divs = [];
		anchorpoints = [];
		lines = [];
	}

	function clearScene() {
		removeAll();
		init();
	}

	$("#newButton").click((function() {
	    var today = new Date();
	    var h = today.getHours();
	    var m = today.getMinutes();
	    var s = today.getSeconds();
		var name = prompt("Name your new sequence","sequence_"+h+":"+m+":"+s);		
		if (name != null){
			clearScene();
			var json = {
	   			'name': name,
	    		'json': JSON.stringify(sceneToJSON()),
	    		'email': email
			}
			var res = createScene(json);
			console.log(res);
			getUserSequences();	
		}
		
	}));
	
	$("#renameButton").click((function() {
		if(getSelectedId() != null){
			var today = new Date();
		    var h = today.getHours();
		    var m = today.getMinutes();
		    var s = today.getSeconds();
			var name = prompt("Name your new sequence","sequence_"+h+":"+m+":"+s);		
			if (name != null){
				var json = {
		   			'name': name
				}
				var res = updateScene(getSelectedId(), json);
				console.log(res);
				getUserSequences();	
			}			
		}
		else
			alert('No scene selected! Select one before renaming!');		
	    
	}));


	$("#saveButton").click((function() {
		var json = {
    		'json': JSON.stringify(sceneToJSON())
		}
		if(getSelectedId() != null){
			var res = updateScene(getSelectedId(), json);
			console.log(res);
		}
		else
			alert('No scene selected! Select one before saving!');		
	}));

	$("#loadButton").click((function() {	
		var sceneID =getSelectedId();
		if(sceneID != null){
			var json = JSON.parse(getScene(sceneID));
			console.log(json);			
			jObjects = JSON.parse(json['json']);
			loadScene(jObjects);	
		}
		else
			alert('No scene selected! Select one before loading!');			
	}));
	
	$("#loadIDButton").click((function() {
		var sceneID = prompt("Insert ID of scene to be loaded.", "0");
		var result = getScene(sceneID);
		if(result != null){
			var json = JSON.parse(result);
			if(json['email'] == email){	
				jObjects = JSON.parse(json['json']);
				loadScene(jObjects);	
			}
			else
				alert('You have no permission to access scene ID ' + sceneID + '!');
		}
	}));

	$("#deleteButton").click((function() {
		if(getSelectedId() != null){
			console.log(getSelectedId());
			var res = deleteScene(getSelectedId());
			console.log(res);
			getUserSequences();
		}
		else
			alert('No scene selected! Select one before saving!');		
	}));

	$("#clearButton").click((function() {
		clearScene();
	}));
	
	function login() {
		email=prompt("Please enter your email adress","xxx@xxx.xxx");
		if (email != null){
			if (verifyEmail(email)){
				document.getElementById('loginLabel').innerHTML = 'logged in as ' + email;
				getUserSequences();
			}
			else{
				document.getElementById('loginLabel').innerHTML = 'not logged in';
				login = null;
			}
		}
	}
	
	
	function verifyEmail() {
		var regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	
		if (!regex.test(email)) {
			alert("The entered email adress " + email + " doesn't match the pattern xxx@xxx.xxx! You are not logged in.");
			return false;
		} else {
			alert("Successfully logged in as " + email);
			return true;
		}
	}
	
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
		     .attr("value", value).text(key));
		});		
	}	
	
	function getSelectedId() {
		var selected = $("#sequenceSelect option:selected").val();
		return selected;
	}
	
});

