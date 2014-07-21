$(window).on('load', function() {
  // initialize accordion
  $( "#gui-accordion" ).accordion({ 
  	header: "h3",
  	collapsible: true,
    animate: false,
    keyboard: false
   });
  $( "#gui-accordion" ).accordion( "enable" );
}); // document onload