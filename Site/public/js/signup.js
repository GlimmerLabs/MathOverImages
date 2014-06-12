$(document).ready(function(){ 
var checkUser= (function(string){
    console.log(string);
});  
    $("#email").blur(function(){
	checkUser(this.value)
    });
    $("#username").blur(function(){
	checkUser(this.value)
    });
});
