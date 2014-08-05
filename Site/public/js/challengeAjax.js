function getImages() {
  var level = $("#level").val();
  var color = $("#color").val();
  var animation = $("#animation").val();
  $.post("/api", {action: "listchallenges", level: level, color: color, animation: animation}, function(data) {
    document.getElementById("images").innerHTML = "";
    var imageUl = document.createElement("ul");
    imageUl.className = "rig columns-4";
    document.getElementById("images").appendChild(imageUl);
    for(var i=0;i<data.length;i++) {
      var li = document.createElement("li");
      var figure = document.createElement("figure");
      var challengeName = document.createElement("p");
        challengeName.textContent = data[i].title;
        challengeName.className = "challengeName";
      var link = document.createElement("a");
        link.href = "/challenges/view/" + data[i].name;
      var canvas = document.createElement("canvas");
        canvas.width = 300;
        canvas.height = 300;
        canvas.id = "canvas"+i;
      var code = document.createElement("input");
        code.value = data[i].code;
        code.type = "hidden";
        code.id = "code"+i;
      imageUl.appendChild(li);
        li.appendChild(figure);
          figure.appendChild(challengeName);
          figure.appendChild(link);
            link.appendChild(canvas);
          figure.appendChild(code);
      setupCanvas(canvas);
    }
  });
}
$(document).ready(function() {
  $("#level").change(getImages);
  $("#color").change(getImages);
  $("#animation").change(getImages);
})
