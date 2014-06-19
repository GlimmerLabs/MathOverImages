// LINE LAYER EVENTS
/*
- on click
- on mouseover
- on mouseout
*/
lineLayer.on('click', function(evt) {
  if(deleteToolOn) {
    var shape = evt.target;
    var outlet = shape.attrs.outlet;
    var parent = outlet.parent;
    shape.attrs.source.attrs.lineOut.splice(shape.attrs.sourceIndex, 1);
    outlet.attrs.lineIn = null;
    parent.attrs.numInputs--;
    shape.remove();
    insertToArray(actionToObject('delete', shape));
    if (parent == currShape) {
      if (assertRenderable(parent)) {
        funBarText.setAttr('text', currShape.attrs.renderFunction);
      }
      else {
        currShape.children[0].setAttr('shadowEnabled', false);
        currShape = undefined;
        funBarText.setAttr('text', ''); 
      }
      funBarLayer.draw();
    } 
    else {
      assertRenderable(parent);
    }    
    updateForward(outlet.parent);
    workLayer.draw();
    lineLayer.draw();
  }
});

lineLayer.on('mouseover', function(evt) {
  if (deleteToolOn) {
    var shape = evt.target;
    shape.setAttrs({
      scale: 3,
      shadowColor: deleteColor,
      shadowEnabled: true
    });
    lineLayer.draw();
  }
}); 

lineLayer.on('mouseout', function(evt) {
  if (deleteToolOn) {
    var shape = evt.target;
    shape.setAttrs({
      scale: 1,
      shadowEnabled: false
    });
    lineLayer.draw();
  }
});