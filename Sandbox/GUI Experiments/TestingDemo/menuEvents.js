//MENU ANIMATIONS
/*
On click of value menu button:
1. Neither values or functions are expanded.
  - move functionsButton right.
  - expand values
2. Values are not expanded, functions are expanded.
  - collapse functions to the right and move functionsButon
  - expand values
3. Values are expanded, functions are not.
  - collapse values
  - move functionsButton left. 
  */
  valuesButton.on('click', function(){
    if (!valueExpanded) {
      if (!functionExpanded) {
        moveFunctionsButtonRight();
        moveFunctionNodesRight();
        expandValueNodes();

        valueExpanded = true;
    } // if functions are also not expanded
    else {
      moveFunctionsButtonRight();
      moveFunctionNodesRight();
      expandValueNodes();

      valueExpanded = true;
      functionExpanded = false;
      } // else functions were already expanded
  } // if values are not expanded
  else {
    moveValueNodesIn();
    moveFunctionNodesIn();  
    moveFunctionsButtonLeft();

    valueExpanded = false;
  } // else values were already expanded
});
/*
On click of function menu button:
1. Neither functions or values are expanded.
  - expand functions
2. Functions are not expanded, values are expanded.
  - collapse values
  - move functionsButton left
  - expand functions
3. Functions are expanded, values are not.
  - collapse functions 
  */
  functionsButton.on('click', function(){
    if (!functionExpanded) {
      if (!valueExpanded) {
        expandFunctionNodes();

        functionExpanded = true;
    } // functions and values not expanded
    else {
      moveValueNodesIn();
      moveFunctionsButtonLeft();
      expandFunctionNodes();

      functionExpanded = true;
      valueExpanded = false;
    } // functions not expanded, values expanded
  }
  else {
    moveFunctionNodesIn();

    functionExpanded = false;
    } // functions are expanded
  });

/*
If you click on a menu button when the workTool is not activated, the workTool will become activated. 
*/
menuButtonLayer.on('click', function(){
  if (!workToolOn) {
    enableWorkTool();
  }
});

//MENU LAYER EVENTS
/*
- on mousedown
*/
/*
  On mousedown of a menu object (value or function prototype), you create a copy of that object and begin to draw it. Turns on workTool, if not already on. 
  */
  menuLayer.on('mousedown', function(evt) {
    if (!makingLine) {
      if (!workToolOn) {
        enableWorkTool();
      }
      var group = evt.target.getParent();
      if (isFunction(group)) {
        var newGroup = makeFunctionGroup(group.attrs.name, group.attrs.x, group.attrs.y);
      } else {
        var newGroup = makeValueGroup(group.attrs.name, group.attrs.x, group.attrs.y);
  } // if function / else value
  newGroup.setAttr('visible', true);
  dragLayer.add(newGroup);
  newGroup.startDrag();
  dragLayer.draw();
}
});