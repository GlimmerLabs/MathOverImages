function createAjaxGetRequest(callback, imageid){
  var url = "/api?action=toggleLike&imageid="+imageid;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState != 4) {
      return;
    }
    if (request.status >= 400) {
       callback(undefined, request.responseText);
    }
    else {
     callback(request.responseText, undefined);
    }
  }
  request.open("GET", url, true);
  request.send();
}
function addFigcaptionListeners() {
  var figcaptions = document.getElementsByTagName("figcaption");
  for(var i = 0; i < figcaptions.length; i++) {
    if(figcaptions[i].innerText.indexOf("★") != -1) {
      figcaptions[i].onclick = function(evt){
        var imageid = this.parentNode.getAttribute("data-imageid");
        imageid = imageid.replace("/image/");
        var clickedFigcaption = this;
        createAjaxGetRequest(function(response, error){
          if(!error){
            if(response == "Liked") {
              clickedFigcaption.className = "left starred";
            }
            if(response == "Unliked") {
              clickedFigcaption.className = "left unstarred";
            }
          }
        }, imageid);
      }
    }
  }
}
window.onload = addFigcaptionListeners;
