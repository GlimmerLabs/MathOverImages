function hideImages() {
  $('.image00').hide();
  $('.image01').hide();
  $('.image02').hide();
  $('.image03').hide();
  $('.image04').hide();
  $('.image05').hide();
  $('.image06').hide();
  $('.image07').hide();
  $('.image08').hide();
  $('.image09').hide();
  $('.image10').hide();
  $('.image11').hide();
  $('.image12').hide();
  $('.image13').hide();
  $('.image14').hide();
  $('.image15').hide();
  $('.image16').hide();
  $('.image17').hide();
  $('.image18').hide();
  $('.image19').hide();
  $('.image20').hide();
  $('.image21').hide();
  $('.image22').hide();
}

function switchImage(i) {
  hideImages();
  switch (i) {
    case 0:
      $('.image00').show();
      $('#clickPrevious').hide();
      break;
    case 1:
      $('.image01').show();
      $('#clickPrevious').show();
      $('#clickNext').show();
      break;
    case 2:
      $('.image02').show();
      $('#clickPrevious').show();
      $('#clickNext').show();
      break;
    case 3:
      $('.image03').show();
      $('#clickPrevious').show();
      $('#clickNext').show();
      break;
    case 4:
      $('.image04').show();
      $('#clickPrevious').show();
      $('#clickNext').show();
      break;
    case 5:
      $('.image05').show();
      $('#clickPrevious').show();
      $('#clickNext').show();
      break;
    case 6:
      $('.image06').show();
      $('#clickPrevious').show();
      $('#clickNext').show();
      break;
    case 7:
      $('.image07').show();
      $('#clickPrevious').show();
      $('#clickNext').show();
      break;
    case 8:
      $('.image08').show();
      $('#clickPrevious').show();
      $('#clickNext').show();
      break;
    case 9:
      $('.image09').show();
      $('#clickPrevious').show();
      $('#clickNext').show();
      break;
    case 10:
      $('.image10').show();
      $('#clickPrevious').show();
      $('#clickNext').show();
      break;
    case 11:
      $('.image11').show();
      $('#clickPrevious').show();
      $('#clickNext').show();
      break;
    case 12:
      $('.image12').show();
      $('#clickPrevious').show();
      $('#clickNext').show();
      break;
    case 13:
      $('.image13').show();
      $('#clickPrevious').show();
      $('#clickNext').show();
      break;
    case 14:
      $('.image14').show();
      $('#clickPrevious').show();
      $('#clickNext').show();
      break;
    case 15:
      $('.image15').show();
      $('#clickPrevious').show();
      $('#clickNext').show();
      break;
    case 16:
      $('.image16').show();
      $('#clickPrevious').show();
      $('#clickNext').show();
      break;
    case 17:
      $('.image17').show();
      $('#clickPrevious').show();
      $('#clickNext').show();
      break;
    case 18:
      $('.image18').show();
      $('#clickPrevious').show();
      $('#clickNext').show();
      break;
    case 19:
      $('.image19').show();
      $('#clickPrevious').show();
      $('#clickNext').show();
      break;
    case 20:
      $('.image20').show();
      $('#clickPrevious').show();
      $('#clickNext').show();
      break;
    case 21:
      $('.image21').show();
      $('#clickPrevious').show();
      $('#clickNext').show();
      break;
    default:
      $('.image22').show();
      $('#clickNext').hide();
      break;

}
};

$(document).ready(function() {
  var i = 0;
  switchImage(i);

  $('#clickNext').click(function(evt) {
  if (i < 22) {
    i++;
    switchImage(i);
  }
  });

  $('#clickPrevious').click(function(evt) {
  if (i > 0) {
  i--;
  switchImage(i);
  }
  });

});
