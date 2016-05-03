//function Operation(user, revision, operation, start, end, value) {
//    this.user = user;
//    this.revision = revision;
//    this.operation = operation;
//    this.start = start;
//    this.end = end;
//    this.value = value;
//
//    function lucky() {
//
//    }
//
//}
function Operation(user, revision) {
    this.user = user;
    this.revision = revision;
    this.operationList = [];

    this.add_Insert = function addInsert(pos, char) {
    	this.operationList.push(new Insert(pos, char));
    }
    //ACE spezifisch
    this.add_Delete= function addDelete(pos, end) {
    	this.operationList.push(new Delete(pos, end));
    }
    this.add_Retain = function addRetain(n) {
    	this.operationList.push(new Retain(n));
    }
    function Insert(pos, char){
    	this.type = "insert";
    	this.pos = pos;
    	this.char = char;
    }
    function Delete(pos, end){
    	this.type = "remove";
    	this.pos = pos;
    	this.end = end;
    }
    function Retain(n){
    	this.type = "retain";
    	this.n = n;
    }
}