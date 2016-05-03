/**
 * Module dependencies.
 */

var express = require('express'), routes = require('./routes'), user = require('./routes/user'), http = require('http'), path = require('path');

var app = express();

//all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
//START
var User = require('./public/javascripts/User.js');
var OT = require('./public/javascripts/OT.js');
var Operation = require('./public/javascripts/sOperation.js')
var USERS = [];
var DOCUMENT = [];
//DOCUMENT.push('Schwiegermutter ist zu Besuch @prio(1) @date(10-15 15:30-16:40)');
//DOCUMENT.push('');
//DOCUMENT.push('Kaffee für die Schwiegermutter:');
//DOCUMENT.push('  Kaffeekränzchen für Schwiegermutter vorbereiten: @date(2015-10-15 14:30-15:00)');
//DOCUMENT.push('    - Einigermaßen saubere Kaffeetasse finden');
//DOCUMENT.push('    - Kaffeebohnen frisch mahlen');
//DOCUMENT.push('');
//DOCUMENT.push('  @due(15-10-15 15:00-15:30) Kaffeezubereitung:');
//DOCUMENT.push('    - Entkalktes, magenfreundliches Wasser in die Kaffeemaschine gießen');
//DOCUMENT.push('    - Filtertüte in die Kaffeemaschine einlegen');
//DOCUMENT.push('      # Notfalls tut\'s auch Toilettenpapier.');
//DOCUMENT.push('    - Kaffee in die Filtertüte hinzugeben');
//DOCUMENT.push('      # Einen gehäuften Teelöffel pro Tasse verwenden und zusätzlich einen "für die Kanne".');
DOCUMENT.push('hallo kaiss');
DOCUMENT.push('123456');

var DOC_Graph = [];
DOC_Graph.push(DOCUMENT);
var io = require('socket.io')(server);
var usernames = {};

io.on('connection',	function(socket) {
	console.log(socket.id);
	socket.on('pong', function(data) {
		// console.log("Pong received from ", data);
	});
	function sendHeartbeat() {
		setTimeout(sendHeartbeat, 8000);
		io.sockets.emit('ping', {
			beat : 1
		});
	}
	// setTimeout(sendHeartbeat, 8000);

	// console.log('a user connected',
	// socket.handshake.query.user);
	var uName = socket.handshake.query.userName;
	var uRev = socket.handshake.query.revisionNo;
	var newUser = new User(uName, uRev, "online");

	socket.emit('init', {
		'0' : DocumentString(),
		'1' : DOC_Graph.length
	}); // Revnummer
	socket.on('disconnect', function(client) {
		console.log('user disconnected', socket.username);
		if (socket.username) {
			delete usernames[socket.username.name];
			console.log('username delete', socket.username);
			console.log('all user: ', usernames);
		}
	});
	socket.on('adduser', function(username) {
		var newUser = new User(username, 0, "online");
		socket.username = newUser; // set User Object in Key
		// Username in Socket
		// Session
		usernames[username] = newUser;
		console.log('username added', username);
	});
	function DocumentString() {
		var tmp = '';
		for (var i = 0; i < DOCUMENT.length; i++) {
			if (DOCUMENT[i] === undefined) {

			} else {
				tmp += DOCUMENT[i].toString();
				tmp += '\n';
			}
		}
		//remove the last newLine
		return tmp.replace(/([\s\S]*)\n/, "$1");
	}
	function addOperationtoDOCUMENT(operation) {
		var row = operation.pos.row;
		var col = operation.pos.column;
		var val = operation.char;

		if (val == '') {//new line
			DOCUMENT.splice(row + 1, 0, replaceRange(DOCUMENT[row], 0, col, ""));
			DOCUMENT[row] = replaceRange(DOCUMENT[row], col,DOCUMENT[row].length, "");
		} else {
			if (DOCUMENT.length - 1 >= row) {
				DOCUMENT[row] = [
				                 DOCUMENT[row].toString().slice(0, col),
				                 val,
				                 DOCUMENT[row].toString().slice(col) ]
				.join('');
			} else {
				console.log('insert1: ' ,DOCUMENT);
				DOCUMENT.push(val);
				console.log('insert2: ' ,DOCUMENT);
			}
		}
	}
	// function removeOpperationtoDOKUMENT(operation){
	// console.log('operation ',operation);
	// var start = operation.start;
	// var end = operation.end;
	// for(var i = start.row; i <= end.row; i++ ){
	// if(i === end.row){
	// //delete range in same line
	// DOCUMENT[start.row] = replaceRange(DOCUMENT[i],
	// start.column, end.column, '');
	// break;
	// } else {
	// if(i === start.row) {
	// DOCUMENT[i] = replaceRange(DOCUMENT[i], start.column,
	// DOCUMENT[i].length, '') +
	// replaceRange(DOCUMENT[end.row], 0, end.column, '');
	// }
	// else {
	// DOCUMENT[i] = DOCUMENT[end.row + i];
	// DOCUMENT[i+1] = "";
	// }
	// }
	// }
	// }
	/**
	 * Removes Chars from DOCUMENT Array.
	 * Delete can occur in following Ways:
	 * 1. Delete Range in one Line
	 * 2. Delete Range multiple Lines
	 * 	a. From Startline first Char till Endline last Char (whole Lines)
	 *  b. From Startline random Char till Endline random Char
	 * @param {Operation} operation 
	 * @return modified DOC
	 */
	function removeOpperationtoDOKUMENT(operation){
		var t = DOCUMENT.slice(0);
	    console.log('operation ',operation);
	    var start = operation.pos;
	    var end = operation.end;
	    //if delete one char, the input(s,e) is same position
	    //to delete we need a range, so increment endpos by 1
	    if(start.column === end.column){
	    	//end.column++;
	    }
	     var delC = 0;

	       if(start.row === end.row){
	  	     //Deletion in same line -> a) from start to end
	  	     //b) mid to end c) start to mid d) mid to mid
	    	   
	    	   t[start.row] = replaceRange(t[start.row], start.column, end.column, '');
	       }else{
	  	     //iterate over all lines we get from Deletion Range
	  	     //start @ startLine to endline
	  	     for(var i = start.row; i <= end.row; i++ ){
	    	   //Deletion in multiple lines
	    	   //First Row -> combine first and last
		       if(i === start.row) {
		    	   	t[start.row] = replaceRange(t[i], start.column, t[i].length, '');
		       }else if(i === end.row){
		    	   t[start.row] += t[start.row+1].slice(end.column, t[start.row+1].length);
		    	   t.splice(start.row+1,1);
		       }else {
		    	   t.splice(start.row+1,1);
			   }
	  	     }
	       }
	     //Delete lines from start+1 till end row
	       DOCUMENT = t; 
	     }

	function replaceRange(s, start, end, substitute) {
		
		if (s === undefined) {

		} else {
			return s.substring(0, start) + substitute + s.substring(end);
		}
	}
	function replaceRange2(s, start, end) {
		
		if (s === undefined) {

		} else {
			var t = s.slice(0);//real/deep copy in JS?
			return t.slice(0, start) + t.slice(end);
		}
	}
	function posToRangeServer(pos) {

	}
	function rangeToPosServer(start, end) {

	}

	function applyServerOperation(operations) {

		//console.log('applyServerOperation got : ', operations);
		DOC_Graph.push(operations);
		// console.log('socketio > ',
		// operations.operation.operationList);
		for (var i = 0; i < operations.operationList.length; i++) {
			if(operations.operationList[i] !== undefined){
				switch (operations.operationList[i].type) {
				case 'insert':
					
					console.log('Applying INSERT on Document ',
							operations.operationList[i]);
					//console.log('Applying Insert on Document ',operations.operationList[i]);
					addOperationtoDOCUMENT(operations.operationList[i]);

					break;
				case 'remove':
					console.log('Applying Remove on Document ',
							operations.operationList[i]);
//					console.log('BEVORE REMOVE', DOCUMENT);
					removeOpperationtoDOKUMENT(operations.operationList[i]);
//					console.log('AFTER REMOVE ', DOCUMENT);
					break;
				case 'retain':
					// console.log('retain data: ', operations);
					break;
				}
			}

		}
	}
	function isRetain(op){
		return op !== undefined && op.type === 'retain';
	}
	var ot = new OT();
	socket.on('allyOperation',function(operation) {
		// check revision for correct state

		console.log('got this Client Operation: ',operation.operation.operationList);
		var myClientRev = operation.operation.revision;
		console.log('have SERVER Rev: ',DOC_Graph.length);
		console.log('got Client Rev: ',	myClientRev);
		if (myClientRev === undefined
				|| myClientRev < 0
				|| DOC_Graph.length < myClientRev) {
			// throw something wrong revision
		} else {
			// parse Client Operation and build
			// Server Operation from it
			var c_operation = new Operation(
					operation.operation.user,
					operation.operation.revision);
			for (var int = 0; int < operation.operation.operationList.length; int++) {
					c_operation.operationList
					.push(operation.operation.operationList[int]);
			
			}
			var concurrentOPs = DOC_Graph
			.slice(myClientRev);
			//console.log('Transforming against: ',concurrentOPs);
			var transfromedPair;
			var mytransofmredOP;
			for (var i = 0; i < concurrentOPs.length; i++) {
				// tranform and save result
				//console.log('Transforming OPList: ', concurrentOPs[i].operationList);
				c_operation = ot.transform(c_operation,	concurrentOPs[i], DOCUMENT)[0];
				remoteTransformedOP = c_operation;
				//transfromedPair = ot.transform(c_operation,	concurrentOPs[i]);
			}
			// console.log('aftertrans ',
			// c_operation);
				applyServerOperation(c_operation);
				// tranform(operation)
				setTimeout(function() {
					timedEmit(c_operation)
				},2000);



		}

		// console.log('GRAPGH:', DOC_Graph);
		// console.log('GRAPGH
		// SIZE---------------------------------------------:',
		// DOC_Graph.length);
	});
	function timedEmit(op) {
		op.revision = DOC_Graph.length;
		console.log('emitting: ', op);
		io.emit('allyOperation', op);
	}
	socket.on('isOnline', function(msg) {
		console.log('isOnline', msg);
		io.emit('isOnline', msg);
	});

});