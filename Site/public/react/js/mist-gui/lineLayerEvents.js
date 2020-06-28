// LINE LAYER EVENTS
/*
- on click
- on mouseover
- on mouseout
*/
export default function(
  lineLayer,
  workLayer,
  state,
  removeLine,
  insertToArray,
  actionToObject,
) {
  lineLayer.on('click', function(evt) {
    if (state.deleteToolOn) {
      removeLine(evt.target);
      insertToArray(actionToObject('delete', evt.target));
      lineLayer.draw();
      workLayer.draw();
    }
  });

  lineLayer.on('mouseover', function(evt) {
    if (state.deleteToolOn) {
      var shape = evt.target;
      shape.setAttrs({
        strokeWidth: 3,
        shadowColor: toolboxStyle.deleteColor,
        shadowEnabled: true
      });
      lineLayer.draw();
    }
  }); 

  lineLayer.on('mouseout', function(evt) {
    if (state.deleteToolOn) {
      var shape = evt.target;
      shape.setAttrs({
        strokeWidth: lineStrokeWidth,
        shadowEnabled: false
      });
      lineLayer.draw();
    }
  });
}
