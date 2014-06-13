$(document).ready(function(){
    // Header Functions
    $(".hidden").hide();
    $(".hidden").animate({opacity:0},0);

    $("#slider").click(function() {
	$( ".main" ).animate({ opacity:0}, function(){
            $(".main").hide();
            $(".hidden").show();
            $(".hidden").animate({opacity: 1});
            
	});
	
	
    });



    $("#cancel").click(function() {
	$('.hidden').animate({ opacity:0}, function(){
	    $(".hidden").hide();
            $(".main").show();
            $(".main").animate({opacity: 1});
            
	});
    });

    $("#login").click(function(){
	$(".hidden").submit();
    });

    $(".hidden").on('keyup', function(e) {
    if (e.which == 13) {
        $(".hidden").submit();
    }
});
    // End Header Functions
});
