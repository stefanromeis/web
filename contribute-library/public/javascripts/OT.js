var User = require('./User.js')
var Operation = require('./sOperation.js')
function OT() {
	function isInsert(op){
		return op !== undefined && op.type === 'insert';
	}
	function isDelete(op){
		return op !== undefined && op.type === 'remove';
	}
	function isRetain(op){
		return op !== undefined && op.type === 'retain';
	}
    this.transform = function transform(operationA, operationB, doc){

  
    	 var operationResultA = new Operation(operationA.user, operationA.revision);
    	 var operationResultB = new Operation(operationB.user, operationB.revision);
//    	 console.log('operationA ',operationA);
//    	 console.log('operationB ',operationB);
    	 var operationListA = operationA.operationList;
    	 var operationListB = operationB.operationList;
//    	 console.log('testtest ',operationListA);
//    	 console.log('testtest ',operationListB);
    	 var i1 = 0;
    	 var i2 = 0;
    	 var op1 = operationListA[i1++];
    	 var op2 = operationListB[i2++];
    	 //console.log('TRANSOM1 ', op1);
    	 //console.log('TRANSOM2 ', op2);
    	 
    	 for (var i = 0; i < operationListA.length; i++) {
			var incOP = operationListA[i];
			
			for (var j = 0; j < operationListB.length; j++) {
				var myOP = operationListB[j];
				//skip retain
				if(!isRetain(incOP) && !isRetain(myOP)){
					if(incOP && myOP ){
						var transformedPairs = trans(incOP, myOP,doc);
						incOP = transformedPairs[0];
						myOP = transformedPairs[1];
					}
				}
			}
			operationResultA.operationList.push(incOP);
			operationResultB.operationList.push(myOP);
		}
    	return [operationResultA, operationResultB];
    }
    function trans(op1, op2,doc){
    	var posA = rangePos(op1.pos.row,op1.pos.column,doc);
    	var posB = rangePos(op2.pos.row,op2.pos.column,doc);
    	console.log('transform: ', op1, posA);
    	console.log('against:   ', op2, posB);
    	if(posA > posB){
    		if(isInsert(op2)){
    			op1.pos.column++;
    	    	console.log('isINSERT - ', op1, ' A > B -> A++');
    		}else if(isDelete(op2)){
    			op1.pos.column--;
    	    	console.log('isDELETE - ', op1, ' A > B -> A--');
    		}
    	}else if(posA < posB){
    		if(isInsert(op1)){
    			op2.pos.column++;
    	    	console.log('isINSERT - ', op2, ' A < B -> B++');
    		}else if(isDelete(op1)){
    			op2.pos.column--;
    	    	console.log('isDELETE - ', op2, ' A < B -> B--');
    		}
    	}else{
    		if(isDelete(op1) && isDelete(op2)){
    			op1 = undefined;
    			op2 = undefined;
    	    	console.log('isDELETE - ', op1, ' isDELETE -> empty OP');
    		}else if(isInsert(op1) && isInsert(op2)){
    			op2.pos.column++;
    	    	console.log('isINSERT - ', op2, ' isINSERT -> B++');
    		}else if(isInsert(op1) && isDelete(op2)){
    			op2.pos.column++;
    	    	console.log('isINSERT - ', op2, ' isDELETE -> B++');
    		}else if(isDelete(op1) && isInsert(op2)){
    			op1.pos.column++;
    	    	console.log('isDELETE - ', op1, ' isINSERT -> A++');
    		}
    	}
    	return [op1, op2];
    }
    function posRange(pos){
  	  var row = 0;
  	  var column = 0;
  	  var counter = -1;
  	  var line = "";
  	  var fin = false;
  	  if(pos !== undefined){
  		  for(var i = 0; i < doc.length; i++ ){
  			  if(fin){
  				  row = i;
  			  }
  			  column = 0;
  			  line = doc[i];
  			  for (var x = 0; x < line.length; x++)
  			  {
  				  counter++;
  				  if(counter === pos){
  					  column = x;
  					  fin = true;
  					  break;
  				  }
  			  }
  		  }
  	  }
  	  return [row, column];
    }
    function rangePos(row, column, doc){
  	  var pos = 0;
  	  var line = "";
  	  if(row !== undefined && column !== undefined){
  		  for(var i = 0; i <= row; i++ ){
  			  line = doc[i];
  			  if(line){
  	  			  if(i === row){
  	  				  pos += column;
  	  			  }else{
  	  				  pos += line.length;
  	  				  
  	  			  }
  			  }

  		  }
  	  }
  	  if(pos <= 0){
  		  pos = -1;
  	  }
  	  return pos;
    }
};
module.exports = OT;
