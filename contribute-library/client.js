(function(io) {
  'use strict';


  var Range = ace.require('ace/range').Range;
  var Selection = ace.require('ace/selection').Selection;

  var editor1 = ace.edit('editor1');
  editor1.setTheme('ace/theme/monokai');
  editor1.$blockScrolling = Infinity;

  var session1 = editor1.getSession();
  var selection1 = new Selection(session1);
  session1.setMode('ace/mode/javascript');
  
  function randomstring(L){
	    var s= '';
	    var randomchar=function(){
	    	var n= Math.floor(Math.random()*62);
	    	if(n<10) return n; //1-10
	    	if(n<36) return String.fromCharCode(n+55); //A-Z
	    	return String.fromCharCode(n+61); //a-z
	    }
	    while(s.length< L) s+= randomchar();
	    return s;
	};
  var userName = randomstring(5);
  
  //var userName = prompt('Please enter your name');
  var broadcast = true
  var revisionClient = 0;
  var clientBuffer = []; // Buffer for Operations while async
  var clientState = "syncronized"; //syncronized, awaiting, awaitingwithBuffer
  var skipFirstInsert = true;
  
  var socket = io.connect('', {query: 'userName='+userName + '&revisionNo='+revisionClient}); // Create and send User @ connecting
  //OT Specific


  if (userName !== null) {
    socket.emit('isOnline', {
      userName: userName
    });
  }
  //Editor Edit-Event. Build Operation + add Operations for each Event(Insert/Delete/Retain)
  function clientLogic(e){
	    if (broadcast) {
            var action;
            if(e.action === undefined){
            	action = e.type; //ChangeCursorEvent ACE
            }else{
            	action = e.action; //Change Event ACE
            }
	        if(clientState === "syncronized"){
	            if(!skipFirstInsert){//this Insert is probably fired by Recieving Servers initial Document State 
	            	//var cursorPos = calculateACEEditorCursorPosition(e.start, e.end);
	            	_operation = new Operation(userName, revisionClient, e.action, e.start, e.end, e.lines);

	            	switch (action) {
	                case 'insert':
	                	_operation.add_Insert(e.start, e.lines[0]);
	                	break;
	                case 'remove':
	                	_operation.add_Delete(e.start, e.end);
	                	break;
	                case 'changeCursor':
	                	_operation.add_Retain(e.start);
	                	break;
	                }
	            	socket.emit('allyOperation', {
	                    operation: _operation
	                  });
	                  clientState = "awaiting";
	                  //delete _operation = new Operation(userName, revisionClient, e.action, e.start, e.end, e.lines);
	                  //for saving all subOperations in the Operation Object
	                  _operation = new Operation(userName, revisionClient, e.action, e.start, e.end, e.lines);
	            }
	        }else{
	            switch (action) {
	            case 'insert':
	            	_operation.add_Insert(e.start, e.lines[0]);
	            	break;
	            case 'remove':
	            	_operation.add_Delete(e.start, e.end);
	            	break;
	            case 'changeCursor':
	            	_operation.add_Retain(e.start);
	            	break;
	            }
	            clientState = "awaitingwithBuffer";
	      }
	    }
  }
  var _operation;
  session1.selection.on('changeCursor', function(e) {
	  clientLogic(e);
  });
  session1.on('change', function(e) {
	  clientLogic(e);
  });

  
  // console.log('selection1: ', selection1);
  // TODO: selection
  //To focus the ace editor
  editor1.focus();
  //Get the number of lines
  var count = session1.getLength();
  //Go to end of the last line
  editor1.gotoLine(count / 2, session1.getLine(count - 1).length);

  var marker = {};
  marker.cursors = [];

  session1.selection.on('changeCursor', function(e) {
    var cur = session1.selection.getCursor();

    if (broadcast) {
      socket.emit('changeCursor', {
        cursor: cur,
        userName: userName
      });
    }

    console.log(e.type, cur);
  });

function applyClientOperation(operations){
  //s
  console.log('socketio > insert', operations);
  for (var i = 0; i < operations.operationList.length; i++) {
    switch (operations.operationList[i].type) {
      case 'insert':
        session1.getDocument().insert(operations.operationList[i].pos, operations.operationList[i].char);
        break;
      case 'remove':
    	var start = operations.operationList[i].start;
    	var end = operations.operationList[i].end;
    	var r = new Range(start.row, start.column, end.row, end.column);
        session1.getDocument().remove(r);
        //applyDelta(evt.operation, true);

        break;
      case 'retain':
        break;
    }
  }

}

//SERVER Callbacks Case1: apply Operation form other Clients
//Case2: its my own Callback so check and send Buffer
// muss ich hier auch transformieren?
  socket.on('allyOperation', function(evt) {
    if (evt.operation.user !== userName) {
      broadcast = false;
      console.log('socketio > insert', evt);
      applyClientOperation(evt.operation);
      // session1.getDocument().applyDelta(evt.event, true);
      broadcast = true;
    }else{
      //its my callback
      if(clientState === "awaitingwithBuffer"){
        socket.emit('allyOperation', {
          operation: _operation
        });
        //applytransform????
        clientState = "awaiting";
       // _operation = [];
      }else{
    	 clientState = "syncronized";
      }
      
    }
  });

  socket.on('remove', function(evt) {
    if (evt.operation.user !== userName) {
      broadcast = false;
      console.log('socketio > remove', evt.operation);
      session1.getDocument().applyDelta(evt.operation, true);
      broadcast = true;
    }
  });
  socket.on('ping', function(data){
      socket.emit('pong', {beat: 1, user:userName});
    });
  socket.on('connect', function (data) {
    console.log('connect callback', data);
    socket.emit('adduser', prompt("What's your name?"));
  });
  socket.on('init', function (data) {
    console.log('init DOC STATE', data);
    editor1.setValue(data);
    skipFirstInsert = false;
  });
  socket.on('isOnline', function(msg) {
    if (msg.userName !== userName) {
      marker.cursors.push({
        position : {
          row: 0,
          column: 10
        },
        userName: msg.userName
      });

      console.log('socketio > isOnline', msg);

      marker.update = function(html, markerLayer, session, config) {
        var start = config.firstRow,
          end = config.lastRow;
        var cursors = this.cursors;
        for (var i = 0; i < cursors.length; i++) {
          var pos = this.cursors[i];
          if (pos.row < start) {
            continue;
          } else if (pos.row > end) {
            break;
          } else {
            // compute cursor position on screen
            // this code is based on ace/layer/marker.js
            var screenPos = session.documentToScreenPosition(pos);

            var height = config.lineHeight;
            var width = config.characterWidth;
            var top = markerLayer.$getTop(screenPos.row, config);
            var left = markerLayer.$padding + screenPos.column * width;
            // can add any html here
            html.push(
              '<div class="MyCursorClass" style=',
              'height:', height, 'px;',
              'top:', top, 'px;',
              'left:', left, 'px; width:', width, '"px"><div class="user">' + msg.userName + '</div></div>'
            );
          }
        }
      };

      marker.redraw = function() {
        this.session._signal('changeFrontMarker');
      };

      marker.addCursor = function() {
        marker.redraw();
      };

      marker.session = editor1.session;
      marker.session.addDynamicMarker(marker, true);
    }
  });

  socket.on('changeCursor', function(msg) {
    //if (msg.userName !== userName) {
    //  console.log('socketio > changeCursor', msg);
    //
    //  console.log('msg.userName: ', msg.userName);
    //  console.log('marker.cursors: ', marker.cursors);
    //
    //  var userCursor = find(marker.cursors, function(cursor) {
    //    console.log('cursor.userName: ', cursor.userName);
    //    return cursor.userName === msg.userName;
    //  });
    //  console.log('userCursor', userCursor);
    //
    //  userCursor.row = msg.cursor.row;
    //  userCursor.column = msg.cursor.column;
    //  marker.redraw();
    //}
  });

})(io);
