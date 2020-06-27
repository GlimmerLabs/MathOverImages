// LINE LAYER EVENTS
/*
- on click
- on mouseover
- on mouseout
*/
layers.line.on('click', function(evt) {
  if(state.deleteToolOn) {
    removeLine(evt.target);
    insertToArray(actionToObject('delete', evt.target));
    layers.line.draw();
    layers.work.draw();
  }
});

layers.line.on('mouseover', function(evt) {
  if (state.deleteToolOn) {
    var shape = evt.target;
    shape.setAttrs({
      strokeWidth: 3,
      shadowColor: deleteColor,
      shadowEnabled: true
    });
    layers.line.draw();
  }
}); 

layers.line.on('mouseout', function(evt) {
  if (state.deleteToolOn) {
    var shape = evt.target;
    shape.setAttrs({
      strokeWidth: lineStrokeWidth,
      shadowEnabled: false
    });
    layers.line.draw();
  }
});
