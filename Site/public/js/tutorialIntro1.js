
function hideImage() {
  $('#blank').show();
  $('#x').hide();
  $('#y').hide();
}

$(document).ready(function() {
  hideImage();
  $('#clickX').click(function(evt) {
    hideImage();
    $('#x').show();
    $('#blank').hide();
  });
  $('#clickY').click(function(evt) {
    hideImage();
    $('#y').show();
    $('#blank').hide();
  });
});
