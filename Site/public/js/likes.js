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
    if(figcaptions[i].innerHTML.indexOf("★") != -1) {
      figcaptions[i].onclick = function(evt){
        var imageid = this.parentNode.getAttribute("data-imageid");
        var clickedFigcaption = this;
        createAjaxGetRequest(function(response, error){
          if(!error){
            if(response == "Liked") {
              clickedFigcaption.className = "left starred";
              clickedFigcaption.innerHTML = "★" + (parseInt(clickedFigcaption.innerHTML.slice(1)) + 1);
            }
            if(response == "Unliked") {
              clickedFigcaption.className = "left unstarred";
              clickedFigcaption.innerHTML= "★" + (parseInt(clickedFigcaption.innerHTML.slice(1)) - 1);
            }
          }
          else {
            if (error === "User is not logged in.")
              alert("You must be logged in to rate images.");
          }
        }, imageid);
      }
    }
  }
}
window.onload = addFigcaptionListeners;
