/**
 * onkeydown events that will be active when the workspace is open
 * - remove default on backspace
 * - ctrl-z for undo
 * - ctrl-y for redo
 * - c for line-tool
 * - w for work-tool
 * - d for delete-tool
 */
 var map = [];
 window.onload = function() {
 	document.body.onkeydown = function(e) {
 		if (!activeText) {
 			var keycode = e.which || e.keyCode;
 			map[keycode] = true;
			if (map[8]) { // 8 is the backspace key
				e.preventDefault(); // Prevents backspace from moving back a page
			}
			else if (map[17] && map[90]) { // 17 is the control key; 90 is the z key
				if (currIndex > 0) {
					undoAction(actionArray[currIndex - 1]);
					currIndex--;
					shadeUndoRedo();
					toolboxLayer.draw();
				}
			}
			else if (map[17] && map[89]) { // 17 is the control key; 89 is the y key
				if (totalIndex > currIndex) {
					console.log("got to redo");
					redoAction(actionArray[currIndex]);
					currIndex++;
					shadeUndoRedo();
					toolboxLayer.draw();
				}
			}
			else if (map[67]) { // 67 is the c key
				if (!lineToolOn) {
					lineToolGroup.children[0].setAttr('shadowEnabled', true);
					lineToolOn = true;
					disableTool(workToolGroup);
					disableTool(deleteToolGroup);
					toolboxLayer.draw();
				}
			}
			else if (map[68]) { // 68 is the d key
				if (makingLine) {
					currLine.destroy();
					makingLine = false; 
					lineLayer.draw();
				}
				if (!deleteToolOn) {
					deleteToolGroup.children[0].setAttr('shadowEnabled', true);
					deleteToolOn = true;
					disableTool(workToolGroup);
					disableTool(lineToolGroup);
					toolboxLayer.draw();
				}
			}
			else if (map[87]) { // 87 is the w key
				if (makingLine) {
					currLine.destroy();
					makingLine = false;
					lineLayer.draw();
				}
				if (!workToolOn) {
					enableWorkTool();
				}
			}
		}
	}

	document.body.onkeyup = function(e) {
		var keycode = e.which || e.keyCode;
		map[keycode] = false;
	}
}