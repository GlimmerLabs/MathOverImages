funBarSaveImGroup.on('click', function(){
	if (currShape && isRenderable(currShape)) {
		enableWorkTool();
		openSavePopUp();
	}
});