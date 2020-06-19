$(window).on('load', function() {
  // initialize accordion
  $( "#gui-accordion" ).accordion({ 
  	header: "h3",
  	collapsible: true,
  	active: false,
    animate: false,
    keyboard: false
   });
  $( "#gui-accordion" ).accordion( "enable" );
}); // document onload