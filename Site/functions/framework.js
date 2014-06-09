module.exports.anonymousHeader = (function (title, style) {
var string = "<html><head><title>"+ title + "</title><style>@import url('http://glimmer.grinnell.edu:8080/css/" + style + "');</style></head><body<h1>MIST</h1><h2> by glimmer</h2></body></html>";

return string;
});
