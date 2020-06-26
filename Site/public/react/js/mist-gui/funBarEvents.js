funBarSaveImGroup.on('mouseup', function(){
  if (currShape && predicate.isRenderable(currShape)) {
    enableWorkTool();
    openSavePopUp();
    funBarSaveImGroup.children[0].setAttr('shadowEnabled', false);
    layers.funBar.draw();
  }
});

funBarSaveImGroup.on('mousedown', function(){
  if (currShape && predicate.isRenderable(currShape)) {
    funBarSaveImGroup.children[0].setAttr('shadowEnabled', true);
    layers.funBar.draw();
  }
});

funBarSaveImGroup.on('mouseover', function(){
  if (currShape && predicate.isRenderable(currShape)) {
    funBarSaveImGroup.children[0].setAttr('fill', valueMenuColorLight);
    layers.funBar.draw();
  }
});

funBarSaveImGroup.on('mouseout', function(){
  if (currShape && predicate.isRenderable(currShape)) {
    funBarSaveImGroup.children[0].setAttrs({
      fill: valueMenuColor,
      shadowEnabled: false
    });
    layers.funBar.draw();
  }
});
