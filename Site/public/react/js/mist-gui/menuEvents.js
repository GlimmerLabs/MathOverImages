//MENU ANIMATIONS
/*
On click of value menu button:
1. Neither values or functions are expanded.
  - move menu.functionsButton right.
  - expand values
2. Values are not expanded, functions are expanded.
  - collapse functions to the right and move functionsButon
  - expand values
3. Values are expanded, functions are not.
  - collapse values
  - move menu.functionsButton left. 
  */

import {
  expandFunctionNodes,
  expandValueNodes,
  moveFunctionNodesIn,
  moveFunctionNodesRight,
  moveFunctionsButtonLeft,
  moveFunctionsButtonRight,
  moveValueNodesIn,
  shiftFunctionNodesLeft,
  shiftFunctionNodesRight,
  shiftValueNodesLeft,
  shiftValueNodesRight
} from './menuTweens.js';

import makeMenu from './makeMenu.js'
import {isFunction, isValue} from './predicates.js';

export default function initMenu(
  functions,
  layers,
  makeFunctionGroup,
  makeValueGroup,
  makeLabel,
  openSaveWsPopUp,
  removeLine,
  showLoadWorkspaceDialog,
  stage,
  state,
  enableWorkTool,
  removeShadow,
  setDragShadow,
  values,
) {
  const menu = makeMenu(functions, layers, makeFunctionGroup, makeValueGroup, values);
  // TODO: hack to let functions in predicate work
  window.menuFunctions = menu.menuFunctions;
  window.menuValues = menu.menuValues;

  layers.border.add(menu.borderLine);
  layers.border.add(menu.toggleTag);
  layers.border.draw();

  layers.menuButton.add(menu.valuesButton);
  layers.menuButton.add(menu.functionsButton);
  layers.menuButton.draw();

  menu.menuFunctions.forEach(func => layers.menu.add(func));
  layers.menu.draw();

  /* add arrows to menuArrowLayer */
  layers.menuArrow.add(menu.valuesArrows['left'], menu.valuesArrows['right']);
  layers.menuArrow.add(menu.functionsArrows['left'], menu.functionsArrows['right']);
  layers.menuArrow.draw();

  layers.menuControl.add(menu.bottomCover);
  layers.menuControl.add(menu.resetButton);
  layers.menuControl.add(menu.openButton);
  layers.menuControl.add(menu.saveButton);
  layers.menuControl.draw();

  menu.valuesButton.on('click', function(){
    if (!state.menu.valueExpanded) {
      if (!state.menu.functionExpanded) {
        moveFunctionsButtonRight(menu.functionsButton);
        moveFunctionNodesRight(menu.menuFunctions);
        expandValueNodes(menu.menuValues);
        state.menu.valueExpanded = true;
        menu.showScrollArrows('values');
        menu.updateArrows('values');
      } // if functions are also not expanded
      else {
        moveFunctionsButtonRight(menu.functionsButton);
        moveFunctionNodesRight(menu.menuFunctions);
        expandValueNodes(menu.menuValues);
        state.menu.valueExpanded = true;
        menu.showScrollArrows('values');
        menu.updateArrows('values');
        state.menu.functionExpanded = false;
        menu.hideScrollArrows('functions');
      } // else functions were already expanded
    } // if values are not expanded
    else {
      moveValueNodesIn(menu.menuValues);
      moveFunctionNodesIn(menu.menuFunctions);  
      moveFunctionsButtonLeft(menu.functionsButton);
      state.menu.valueExpanded = false;
      menu.hideScrollArrows('values');
    } // else values were already expanded
  });
  /*
  On click of function menu button:
  1. Neither functions or values are expanded.
    - expand functions
  2. Functions are not expanded, values are expanded.
    - collapse values
    - move menu.functionsButton left
    - expand functions
  3. Functions are expanded, values are not.
    - collapse functions 
    */
  menu.functionsButton.on('click', function(){
    if (!state.menu.functionExpanded) {
      if (!state.menu.valueExpanded) {
        expandFunctionNodes(menu.menuFunctions);
        state.menu.functionExpanded = true;
        menu.showScrollArrows('functions');
        menu.updateArrows('functions');
      } // functions and values not expanded
      else {
        moveValueNodesIn(menu.menuValues);
        moveFunctionsButtonLeft(menu.functionsButton);
        expandFunctionNodes(menu.menuFunctions);
        state.menu.functionExpanded = true;
        menu.showScrollArrows('functions');
        menu.updateArrows('functions');
        state.menu.valueExpanded = false;
        menu.hideScrollArrows('values');
      } // functions not expanded, values expanded
    }
    else {
      moveFunctionNodesIn(menu.menuFunctions);
      state.menu.functionExpanded = false;
      menu.hideScrollArrows('functions');
    } // functions are expanded
  });

  /*
  If you click on a menu button when the workTool is not activated, the workTool will become activated. 
  */
  layers.menuButton.on('click', function(){
    if (!state.workToolOn) {
      enableWorkTool();
      if(state.makingLine) {
        removeLine(state.currLine);
        state.makingLine = false;
        layers.line.draw();
      }
    }
  });

  // MENU ARROW LAYER EVENTS
  /**
   * - on mouseover
   * - on mouseout
   * - on mousedown
   * - on mouseup
   */
  layers.menuArrow.on('mouseover', function(evt) {
    var group = evt.target.getParent();
    if (group.attrs.functional) {
      var box = group.children[0];
      var arrow = group.children[1];
      box.setAttr('opacity', .7);
      arrow.setAttr('opacity', .9);
      layers.menuArrow.draw();
    }
  });

  layers.menuArrow.on('mouseout', function(evt) {
    var group = evt.target.getParent();
    if (group.attrs.functional) {
      var box = group.children[0];
      var arrow = group.children[1];
      box.setAttr('opacity', .3);
      arrow.setAttr('opacity', .5);
      layers.menuArrow.draw();
    }
  });

  layers.menuArrow.on('mousedown', function(evt) {
    var group = evt.target.getParent();
    if (group.attrs.functional) {
      var box = group.children[0];
      var arrow = group.children[1];
      box.setAttr('opacity', 1);
      arrow.setAttr('opacity', 1);
      layers.menuArrow.draw();
    }
  });
  var scrolling;
  layers.menuArrow.on('mouseup', function(evt) {
    var group = evt.target.getParent();
    if (group.attrs.functional) {
      var box = group.children[0];
      var arrow = group.children[1];
      var direction = group.attrs.direction;
      box.setAttr('opacity', .7);
      arrow.setAttr('opacity', .9);
      layers.menuArrow.draw();
      if(!scrolling) {
        if (group.attrs.type =='functions') {
          if (direction == 'left') {
            shiftFunctionNodesRight(menu.menuFunctions);
            scrolling = true;
            setTimeout(function() {scrolling = false}, 1000)
          } // if right arrow 
          else if (direction == 'right') {
            shiftFunctionNodesLeft(menu.menuFunctions);
            scrolling = true;
            setTimeout(function() {scrolling = false}, 1000);
          } // else left arrow
          menu.updateArrows('functions');
        } // if functions arrow
        else {
          if (direction == 'left') {
            shiftValueNodesRight(menu.menuValues);
            scrolling = true;
            setTimeout(function() {scrolling = false}, 1000);
          } // if right arrow
          else if (group.attrs.direction == 'right') {
            shiftValueNodesLeft(menu.menuValues);
            scrolling = true;
            setTimeout(function() {scrolling = false}, 1000);
          } // else left arrow
          menu.updateArrows('values');
        } // else values arrow
      } // if not scrolling
    } // if functional
  });
  //MENU LAYER EVENTS
  /*
  - on mousedown
  */
  /*
    On mousedown of a menu object (value or function prototype), you create a copy of that object and begin to draw it. Turns on workTool, if not already on. 
    */
  layers.menu.on('mousedown', function(evt) {
    if (!state.makingLine) {
      if (!state.workToolOn) {
        enableWorkTool();
      }
      var group = evt.target.getParent();
      if (isFunction(group)) {
        var newGroup = makeFunctionGroup(group.attrs.name, group.attrs.x, group.attrs.y);
      } 
      else {
        var newGroup = makeValueGroup(group.attrs.name, group.attrs.x, group.attrs.y);
      } // if function / else value
      newGroup.setAttr('visible', true);
      layers.drag.add(newGroup);
      setDragShadow(newGroup);
      removeShadow(state.currShape);
      newGroup.startDrag();
      layers.drag.draw();
      state.dragShape = newGroup;
      state.currShape = newGroup;
    }
    else {
      removeLine(state.currLine);
      state.makingLine = false;
      layers.line.draw();
    }
  });

  layers.menu.on('mouseover', function(evt) {
    var group = evt.target.getParent();
    if (state.menu.tagsOn) {
      if (isFunction(group) || isValue(group)) {
        setTimeout(function(){
          if (state.openTag) {
            state.openTag.destroy();
          }
          var temp = layers.menu.getIntersection(stage.getPointerPosition());
          if (temp && group == temp.getParent()) {
            state.openTag = makeLabel(group);
            layers.label.add(state.openTag)
            layers.label.draw(); 
          }
        }, 500);
      } 
    }
  });

  layers.menu.on('mouseout', function(evt) {
    var group = evt.target.getParent();
    if (state.openTag) {  
      state.openTag.destroy();
      layers.label.draw();
    }
  });

  menu.toggleTag.on('mouseover', function() {
    menu.toggleTag.children[0].setAttr('fill', 'black');
    layers.border.draw();
  });

  menu.toggleTag.on('mouseout', function() {
    menu.toggleTag.children[0].setAttr('fill', '#787878');
    layers.border.draw();
  });

  menu.toggleTag.on('mouseup', function(){
    if (state.menu.tagsOn) {
      state.menu.tagsOn = false;
      menu.toggleTag.children[0].setAttr('text', 'Turn Labels On');
    }
    else {
      state.menu.tagsOn = true;
      menu.toggleTag.children[0].setAttr('text', 'Turn Labels Off');
    }
    layers.border.draw();
  });

  // CONTROL MENU EVENTS 
  layers.menuControl.on('mouseover', function(evt) {
    if (evt.target.name() != 'cover') {
      var parent = evt.target.getParent();
      var shape = parent.children[0];
      shape.setAttr('fill', menuStyle.controlSelect);
      layers.menuControl.draw();
    }
  });

  layers.menuControl.on('mouseout', function(evt) {
    if (evt.target.name() != 'cover') {
      var parent = evt.target.getParent();
      var shape = parent.children[0];
      shape.setAttrs({
        fill: menuStyle.controlColor,
        shadowEnabled: false
      });
      layers.menuControl.draw();
    }
  });

  layers.menuControl.on('mousedown', function(evt) {
    if (evt.target.name() != 'cover') {
      var parent = evt.target.getParent();
      var shape = parent.children[0];
      shape.setAttr('shadowEnabled', true);
      layers.menuControl.draw();
    }
  });

  layers.menuControl.on('mouseup', function(evt) {
    if (evt.target.name()!= 'cover') {
      var parent = evt.target.getParent();
      var shape = parent.children[0];
      shape.setAttr('shadowEnabled', false);
      layers.menuControl.draw();
    }
  });

  menu.resetButton.on('mouseup', function(){
    resetWorkspace();
    // currentWorkSpace = null; // TODO: it doesn't look like this is referenced anywhere else
  });

  menu.saveButton.on('mouseup', function(){
    enableWorkTool();
    openSaveWsPopUp();
  });

  menu.openButton.on('mouseup', function(){
    enableWorkTool();
    showLoadWorkspaceDialog();
  });
};
