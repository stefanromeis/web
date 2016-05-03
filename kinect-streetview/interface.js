//Scene-Editor Interface

//create new scene
function createScene(json) {
	var result = "default";
	
	result = $.ajax({
		type : 'POST',
		async : false,
		url : 'api/user',
	    data: JSON.stringify(json),
	}).responseText;
    
	return result;
}

//update scene
function updateScene(sceneID, json) {
	var result = $.ajax({
		type : 'PUT',
		async : false,
		url : 'api/user/' + sceneID,
		data: JSON.stringify(json)
	}).responseText;

	return result;
}

//get scene
function getScene(sceneID) {
	var result = $.ajax({
		type : 'GET',
		async : false, 
		url : 'api/user/' + sceneID,
		success: function(data){ 
        	return null;
    	},
    	error: function(data) {
        	alert('ID '+sceneID+' not found');
    	}
	}).responseText;

	return result;
}

//get all scenes
function getAll(emailAddress) {
	var result = $.ajax({
		type : 'GET',
		async : false, 
		url : 'api/user?email=' + emailAddress
	}).responseText;

	return result;
}

//detele scene
function deleteScene(sceneID) {
	var result = $.ajax({
		type : 'DELETE',
		async : false,
		url : 'api/user/' + sceneID
	}).responseText;
	return result;
}
