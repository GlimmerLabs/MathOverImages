/**
 * EditableText.js
 *   A library to support editable text in Kinetic.js.
 */

// +-------+---------------------------------------------------------
// | Notes |
// +-------+

/*
   1. To use this library,
      a. Create your stage.
      b. Add the line `readEditing(stage)` to prepare the stage
         for editing
      c. For any text field that you want editable, call
         `field.setEditable(true)`.  
      d. For any text field that you want editable, set up an
         appropriate `draw` method.  A good default is the enclosing
         layer.  For example,
         `text.drawMethod = function(){text.parent.draw()};`

 */

// +----------------------------+------------------------------------
// | Extensions to Kinetic.Text |
// +----------------------------+


Kinetic.Text.prototype.isEditable = false;
Kinetic.Text.prototype.isActive = false;
Kinetic.Text.prototype.setEditable = function(state){this.isEditable = state;}
Kinetic.Text.prototype.defaultText = null;
Kinetic.Text.prototype.drawMethod = function(){};
Kinetic.Text.prototype.measureText = function(family, size, text){
	this.parent.canvas.context._context.font = size + "px" + " "  + family;
	return this.parent.canvas.context._context.measureText(text);
}
Kinetic.Text.prototype.addCursor = function(){
	var x = this.x();
	var fontSize = this.fontSize();
	var align = this.align();
	var fontFamily = this.fontFamily();
	var text = this.text()
	var textLength = text.length;
	var cursor = new Kinetic.Line({
        stroke: 'black',
        strokeWidth: Math.max(fontSize / 10, 1)
      });
	cursor.activeText = this;
	cursor.position = textLength;
	cursor.shouldChange = true;
	cursor.timeout = null;
	cursor.validatePosition = function(){
		var textLength = activeText.text().length;
		cursor.position = Math.min(Math.max(cursor.position, 0), textLength);
	}
	cursor.moveLinePosition = function(x){
		var height = activeText.height();
		var y = activeText.y();
		this.points([x, y, x, y + height]);
		activeText.drawMethod();
	}
	cursor.updatePosition = function(){
		var family = activeText.fontFamily();
		var size = activeText.fontSize();
		var x = activeText.x();
		var textBeforeCursor = activeText.text().slice(0, this.position);
		var width = activeText.measureText(family, size, textBeforeCursor).width;
		cursor.moveLinePosition(x + width);
	}
	cursor.moveToClosestPosition = function(where){
		clearTimeout(activeText.cursor.timeout);
		activeText.cursor.shouldChange = false;
		activeText.cursor.opacity(1);
		activeText.cursor.timeout = setTimeout(function(){
			if(activeText != null){
				activeText.cursor.shouldChange = true;
			}
		}, 100);
		var text = activeText.text();
		var family = activeText.fontFamily();
		var size = activeText.fontSize();
		var closestDistance = Infinity;
		var closestIndex = -1;
		for(var char = text.length; char >= 0; char--){
			var chunk = text.slice(0, char);
			var distance = activeText.measureText(family, size, chunk).width;
			distance -= where;
			distance = Math.abs(distance);
			if(distance < closestDistance){
				closestIndex = char;
				closestDistance = distance;
			}
		}
		this.position = closestIndex;
		this.updatePosition();
	}
	cursor.moveLinePosition(this.measureText(fontFamily, fontSize, text).width + this.x());
	this.parent.add(cursor);
	var active = this;
	this.cursor = cursor;
	cursor.opacity(1);
	this.drawMethod();
	cursor.interval = setInterval(function()
	{
		if(cursor.shouldChange){
			cursor.opacity((cursor.opacity() == 1) ? 0 : 1);
			active.drawMethod();
		}
	}, 750);
}
activeText = null;
currentEvent = null;
function readyEditing(stage)
{
	stage.on("contentClick",
		function(event) {
			if(event.evt != currentEvent){
				currentEvent = null;
				if (activeText != null){
					clearInterval(activeText.cursor.interval);
					activeText.cursor.remove();
					activeText.cursor = null;
					activeText.isActive = false;
					if(activeText.text() == ""){
						activeText.text(activeText.defaultText);
					}
					activeText.drawMethod();
					activeText = null;
				}
			}
		});
	stage.on("click", 
		function(event)
		{
			// Check if target object has text method(if it does than it is a text object)
			if (event.target.text != null) {
				if (event.target.isEditable){
						if(event.target != activeText){
							if (activeText != null){
								clearInterval(activeText.cursor.interval);
								activeText.cursor.remove();
								activeText.cursor = null;
								activeText.isActive = false;
								if(activeText.text() == ""){
									activeText.text(activeText.defaultText);
								}
								activeText.drawMethod();
								activeText = null;
							}
							activeText = event.target;
							if (activeText.text() == activeText.defaultText){
								activeText.text("");
							}
							activeText.addCursor();
							activeText.isActive = true;
						}
						else{
							var cursor = activeText.cursor;
							var mouseX = stage.getPointerPosition().x;
							var textX = activeText.x();
							cursor.moveToClosestPosition(mouseX - textX);
						}
						currentEvent = event.evt;
					}
			}
		});
	document.body.onkeydown = function(e) {
		if(activeText != null){
			clearTimeout(activeText.cursor.timeout);
			activeText.cursor.shouldChange = false;
			activeText.cursor.opacity(1);
			activeText.cursor.timeout = setTimeout(function(){
				if(activeText != null){
					activeText.cursor.shouldChange = true;
				}
			}, 100);
			var currentText = activeText.getText();
			var textPreCursor = currentText.slice(0, activeText.cursor.position);
			var textPostCursor = currentText.slice(activeText.cursor.position, currentText.length);
			if(e.which >= 48 && e.which <= 57){ // keycode 48 is the key "0" and 57 is the key "9"
				var key = "0123456789"[e.which-48]; // get which number key was pressed
				activeText.setText(textPreCursor + key + textPostCursor);
				activeText.cursor.position++;
			}
			if(e.which >= 96 && e.which <= 105){ // keycode 96 is the numpad key "0" and 105 is the numpad key "9"
				var key = "0123456789"[e.which-96]; // get which number key was pressed
				activeText.setText(textPreCursor + key + textPostCursor);
				activeText.cursor.position++;
			}
			if(e.which == 190 || e.which == 110){ // 190 is the "." key 110 is the numpad version
				activeText.setText(textPreCursor + "." + textPostCursor);
				activeText.cursor.position++;
			}
			if(e.which == 8){ // 8 is the backspace key; 48 is the delete key
				activeText.setText(textPreCursor.slice(0, textPreCursor.length - 1) + textPostCursor);
				activeText.cursor.position--;
			}
			if(e.which == 37){ // 37 is the left arrow key
				activeText.cursor.position--;
			}
			if(e.which == 39){ // 39 is the right arrow key
				activeText.cursor.position++;
			}
			activeText.cursor.validatePosition();
			activeText.cursor.updatePosition();
			activeText.drawMethod();
		}
	}
}