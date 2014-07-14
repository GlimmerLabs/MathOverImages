funBarSaveImGroup.on('mouseup', function(){
  if (currShape && isRenderable(currShape)) {
    enableWorkTool();
    openSavePopUp();
    funBarSaveImGroup.children[0].setAttr('shadowEnabled', false);
    funBarLayer.draw();
  }
});

funBarSaveImGroup.on('mousedown', function(){
  if (currShape && isRenderable(currShape)) {
    funBarSaveImGroup.children[0].setAttr('shadowEnabled', true);
    funBarLayer.draw();
  }
});

funBarSaveImGroup.on('mouseover', function(){
  if (currShape && isRenderable(currShape)) {
    funBarSaveImGroup.children[0].setAttr('fill', valueMenuColorLight);
    funBarLayer.draw();
  }
});

funBarSaveImGroup.on('mouseout', function(){
  if (currShape && isRenderable(currShape)) {
    funBarSaveImGroup.children[0].setAttrs({
      fill: valueMenuColor,
      shadowEnabled: false
    });
    funBarLayer.draw();
  }
});



