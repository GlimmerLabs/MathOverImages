/**
* The save screen is what appears when a user want to save or download an images they create.
*/
var screenLayer = new Kinetic.Layer();
stage.add(screenLayer);

var cover = new Kinetic.Rect({
	x: 0,
	y: 0,
	width: width,
	height: height,
	fill: 'black',
	opacity: .6,
	visible: true
});
screenLayer.add(cover);



screenLayer.draw();