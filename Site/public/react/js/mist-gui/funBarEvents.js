funBarSaveImGroup.on('mouseup', function(){
  if (state.currShape && predicate.isRenderable(state.currShape)) {
    utility.enableWorkTool();
    openSavePopUp();
    funBarSaveImGroup.children[0].setAttr('shadowEnabled', false);
    layers.funBar.draw();
  }
});

funBarSaveImGroup.on('mousedown', function(){
  if (state.currShape && predicate.isRenderable(state.currShape)) {
    funBarSaveImGroup.children[0].setAttr('shadowEnabled', true);
    layers.funBar.draw();
  }
});

funBarSaveImGroup.on('mouseover', function(){
  if (state.currShape && predicate.isRenderable(state.currShape)) {
    funBarSaveImGroup.children[0].setAttr('fill', valueStyle.menuColorLight);
    layers.funBar.draw();
  }
});

funBarSaveImGroup.on('mouseout', function(){
  if (state.currShape && predicate.isRenderable(state.currShape)) {
    funBarSaveImGroup.children[0].setAttrs({
      fill: valueStyle.menuColor,
      shadowEnabled: false
    });
    layers.funBar.draw();
  }
});
