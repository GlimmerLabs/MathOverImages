$(document).ready(function(){
  // Search functions
  var searchResults = document.getElementById("searchResults");
  var searchBar = document.getElementById("searchBar");
  searchBar.onkeyup = function(e) {
    if(this.value.length >= 3) {
      omnisearch(this.value, createNewMenu)
    }
    else {
      clearCurrentMenu();
    }
  }
  // Header Functions
  $(".hidden").hide();
  $(".hidden").animate({opacity:0},0);

  $("#slider").click(function() {
    $( ".main" ).animate({ opacity:0}, function(){
      $(".main").hide();
      $(".hidden").show();
      $(".hidden").animate({opacity: 1});
      $(".hidden input[type='text']").focus();
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
});

/* Search Bar Functions */
var omnisearch = (function(string, callback){
  var data = {
    action: "omnisearch",
    search: string
  };
  $.post("/api", data, function(response){
    callback(JSON.parse(response));
  });
});
function clearCurrentMenu() {
  searchResults.innerHTML = "";
}
function createNewMenu(result) {
  clearCurrentMenu();
  var users = result.users,
  images = result.images,
  comments = result.comments,
  albums = result.albums;
  appendMenuTitle("Users ("+users.length+")");
  addMenuLine();
  addMenuChildren(users, "username", function(val) {return "/user/" + val.username});
  appendMenuTitle("Images ("+images.length+")");
  addMenuLine();
  addMenuChildren(images, "title", function(val) {return "/image/" + val.imageid});
  appendMenuTitle("Comments ("+comments.length+")");
  addMenuLine();
  addMenuChildren(comments, "comment", function(val) {return "/image/" + val.onImage + "#comment" + val.commentId});
  appendMenuTitle("Albums ("+albums.length+")");
  addMenuLine();
  addMenuChildren(albums, "name", function(val) {return "/user/" + val.username +"/albums/" + val.albumid});
  addMenuSubmit();
}
function appendMenuTitle(title) {
  var titleElement = document.createElement("li");
  titleElement.className = 'title';
  titleElement.textContent= title;
  searchResults.appendChild(titleElement);
}
function addMenuChildren(children, valueToDisplay, generateURL) {
  for(var i=0; i < children.length && i<3; i++) {
    appendMenuText(children[i][valueToDisplay], generateURL(children[i]))
  }
}
function addMenuLine() {
  var line = document.createElement("li");
  line.className = 'line';
  searchResults.appendChild(line);
}
function addMenuSubmit() {
  var submit = document.createElement("input");
  submit.type = "submit";
  submit.value = "See More >>";
  submit.className = "more";
  var li = document.createElement("li");
  li.appendChild(submit);
  searchResults.appendChild(li);
}
function appendMenuText(text, url) {
  var link = document.createElement("a");
  link.href = url;
  var textElement = document.createElement("li");
  textElement.textContent = (text.length > 13) ? text.slice(0, 14) + "..." : text;
  link.appendChild(textElement)
  searchResults.appendChild(link);
}
/* End Search Bar Functions */
// End Header Functions
