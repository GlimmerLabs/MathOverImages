/**
 * signup.js
 *   Validate things during signup.
 */
$(document).ready(function(){ 
    $('#sign up').change(function() {
	var validated = true;
	if (($('#input').length == 0) ||
		($("#password").value !== ("#repassword").value)) {
	    validated = false;
	}

        console.log("Triggering stuff!");
	$('input[type="submit"]').trigger();
    } )

    var checkUsername = (function(username){
	var parameters = { funct: "checkAvailability", userinfo: username};
	$.post('/api', parameters, function(available){
	    if(available === "true")
		$("#usernamevalid").html("<p>Yes! Available!</p>");
	    else
		$("#usernamevalid").html("<p>Not available.</p>");
	});
    });

    var checkEmail = (function(email){
	var parameters = { funct: "checkAvailability", userinfo: email};
	$.post('/api', parameters, function(available){
	    if(available === "true")
		$("#emailvalid").html("<p>Good</p>");
	    else
		$("#emailvalid").html("<p>It seems like you already have an account here. Log in instead?</p>");
	});
    });
    
    
    $("#email").blur(function(){
	checkEmail(this.value)
    });
    $("#username").blur(function(){
	checkUsername(this.value)
    });
    $("#repassword").blur(function(){
	if ($("#password")[0].value === this.value)
	    console.log("good");

    });
});
