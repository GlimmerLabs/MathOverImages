module.exports.anonymousHeader = (function (title, style) {
  return "<!DOCTYPE html><html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"><title>" + title + "</title><style>@import url(\"http://glimmer.grinnell.edu:8080/css/"+ style + ");</style></head><body><header><div id = 'headerLogo'><a href='#'><img src='glimmer.grinnell.edu:8080/images/logos/header.svg' /></a></div><nav><ul><li><a href='#'>create</a></li><li><a href='#'>challenges</a></li><li><a href='#'>gallery</a></li><li><a href='#'>about</a></li><li><a href='#'>login/signup</a></li></ul></nav></header>";
});


module.exports.stdFooter = (function(){
return "<footer><p>©2014 Glimmer Labs</p><nav><ul><li><a href='#'>create</a></li><li><a href='#'>challenges</a></li><li><a href='#'>gallery</a></li><li><a href='#'>about</a></li><li><a href='#'>login</a></li><li><a href='#'>signup</a></li><li><a href='#'>license</a></li><li><a href='#'>privacy policy</a></li></ul></nav></footer></body></html>";
});
