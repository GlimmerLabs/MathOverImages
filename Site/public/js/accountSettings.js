$(document).ready(function() {
   $('#editButton').click(function() {
       var firstSection = rows.filter('.item1').show();
       rows.not( firstSection ).hide();

       var secondSection = rows.filter('.item2').show();
       rows.not( secondSection ).hide();

       var thirdSection = rows.filter('.item3').show();
       rows.not( thirdSection ).hide();

});
