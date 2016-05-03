
function createScene(json) {
	var result = "default";
	
	result = $.ajax({
		type : 'POST',
		async : false,
		url : 'api/user',
	    data: JSON.stringify(json),
    	//dataType: 'json'
	}).responseText;
	return result;

}

function updateScene(sceneID, json) {
	var result = $.ajax({
		type : 'PUT',
		async : false,
		url : 'api/user/' + sceneID,
		data: JSON.stringify(json)
	}).responseText;

	return result;
}

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

function getAll(emailAddress) {
	var result = $.ajax({
		type : 'GET',
		async : false, 
		url : 'api/user?email=' + emailAddress
	}).responseText;

	return result;
}

function deleteScene(sceneID) {
	var result = $.ajax({
		type : 'DELETE',
		async : false,
		url : 'api/user/' + sceneID
	}).responseText;
	return result;
}
